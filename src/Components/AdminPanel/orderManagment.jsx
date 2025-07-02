import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "../Loader/PageLoader";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ProductDetailModal from "../Modale/ProductDetailModal";

const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-gray-600 rounded-full"></div>
    </div>
);

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);
    const [updating, setUpdating] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/all", {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        })
            .then(res => {
                setOrders(res.data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Fetch orders failed");
                setLoading(false);
            });
    }, []);

    const handleChange = async (orderId, field, value) => {
        setUpdating(prev => ({
            ...prev,
            [orderId]: { ...prev[orderId], [field]: true }
        }));
        try {
            const url = field === "status"
                ? "http://localhost:5000/api/admin/status/"
                : "http://localhost:5000/api/admin/update-payment/";
            const body = field === "status" ? { status: value } : { paymentStatus: value };
            await axios.put(url + orderId, body, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            });
            setOrders(prev => prev.map(o =>
                o._id === orderId ? { ...o, [field === "status" ? "status" : "paymentStatus"]: value } : o
            ));
            toast.success(`${field === "status" ? "Status" : "Payment"} updated!`);
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
        setUpdating(prev => ({
            ...prev,
            [orderId]: { ...prev[orderId], [field]: false }
        }));
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    if (loading) return <PageLoader center />;

    const total = orders.length;
    const pending = orders.filter(o => o.status === "pending").length;
    const processing = orders.filter(o => o.status === "processing").length;
    const delivered = orders.filter(o => o.status === "delivered").length;
    const cancelled = orders.filter(o => o.status === "cancelled").length;

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[{ label: "Total", value: total, bg: "bg-blue-100", text: "text-blue-800" },
                { label: "Pending", value: pending, bg: "bg-yellow-100", text: "text-yellow-800" },
                { label: "Processing", value: processing, bg: "bg-gray-100", text: "text-gray-800" },
                { label: "Delivered", value: delivered, bg: "bg-green-100", text: "text-green-800" },
                { label: "Cancelled", value: cancelled, bg: "bg-red-100", text: "text-red-800" },
                ].map((c, i) => (
                    <div key={i} className={`${c.bg} p-4 rounded shadow text-center`}>
                        <div className="text-xl font-semibold">{c.value}</div>
                        <div className={`${c.text}`}>{c.label}</div>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Order ID</th>
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Total</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Payment</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{o._id.slice(-6).toUpperCase()}</td>
                                <td className="px-4 py-2">{o.user?.name || "—"}</td>
                                <td className="px-4 py-2">Rs. {o.totalAmount}</td>

                                {/* Status dropdown with loader */}
                                <td className="px-4 py-2">
                                    {updating[o._id]?.status ? (
                                        <Spinner />
                                    ) : (
                                        <select
                                            value={o.status}
                                            onChange={e => handleChange(o._id, "status", e.target.value)}
                                            className="border p-1 rounded w-full"
                                        >
                                            {["pending", "processing", "shipped", "delivered", "cancelled"].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    )}
                                </td>

                                {/* Payment dropdown with loader */}
                                <td className="px-4 py-2">
                                    {updating[o._id]?.payment ? (
                                        <Spinner />
                                    ) : (
                                        <select
                                            value={o.paymentStatus}
                                            onChange={e => handleChange(o._id, "payment", e.target.value)}
                                            className="border p-1 rounded w-full"
                                        >
                                            {["pending", "paid"].map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    )}
                                </td>

                                <td className="px-4 py-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-blue-600 underline text-sm"
                                        onClick={() => openModal(o)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Product Details */}
                {orders.map(o => (
                    expandedRow === o._id && (
                        <div key={o._id + "_details"} className="bg-gray-50 px-6 py-4 border-t text-sm">
                            <h4 className="font-semibold mb-2 text-gray-700">Products:</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-2 py-1">Name</th>
                                            <th className="px-2 py-1">Size</th>
                                            <th className="px-2 py-1">Color</th>
                                            <th className="px-2 py-1">Qty</th>
                                            <th className="px-2 py-1">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(o.items || []).map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="px-2 py-1">{item.product?.name || "N/A"}</td>
                                                <td className="px-2 py-1">{item.size || "—"}</td>
                                                <td className="px-2 py-1">{item.color || "—"}</td>
                                                <td className="px-2 py-1">{item.quantity}</td>
                                                <td className="px-2 py-1">Rs. {item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                ))}

                {orders.length === 0 && (
                    <div className="p-6 text-center text-gray-500">No orders yet</div>
                )}
            </div>
            <ProductDetailModal isOpen={modalOpen} onClose={closeModal} order={selectedOrder} />
        </div>
    );
}
