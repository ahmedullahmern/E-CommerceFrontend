import { FaCheckCircle, FaTruck, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";
import PageLoader from "../Loader/PageLoader";
import ButtonLoader from "../Loader/ButtonLoader";
import ReviewModal from "../Modale/reviewsModal";

export default function OrderCard({ order }) {
    const token = Cookies.get("token");
    const [status, setStatus] = useState(order.status);
    const [isLoader, setIsLoader] = useState(false)

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleCancel = async () => {
        try {
            setIsLoader(true)
            const { data } = await axios.put(
                `https://e-commerce-backend-livid-one.vercel.app/api/order/cancel/${order._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsLoader(false)
            setStatus("cancelled");
            toast.success("Order cancelled successfully");
        } catch (err) {
            setIsLoader(false)
            toast.error(err.response?.data?.msg || "Failed to cancel order");
        }
    };

    const handleReviewSuccess = () => {
        toast.success("Review submitted successfully");
        setShowReviewModal(false);
    };


    return (
        <div className="border rounded-lg shadow p-4 space-y-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {status}
                </span>
            </div>

            <div className="space-y-3">
                {order.items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 border-t pt-3 mt-2"
                    >
                        <img
                            src={item.product?.images?.[0] || "/no-image.png"}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <p className="font-medium text-gray-700 dark:text-white">{item.product?.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Price: ${item.product?.price}
                            </p>
                        </div>
                        {order.status === "delivered" && (
                            <button
                                onClick={() => {
                                    setSelectedProductId(item.product?._id);
                                    setShowReviewModal(true);
                                }}
                                className="ml-auto mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200"
                            >
                                ✍️ Write a Review
                            </button>
                        )}

                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-2">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Address: {order.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                    </p>
                </div>
                <div className="text-lg font-semibold text-black dark:text-white">
                    Total: ${order.totalAmount}
                </div>
            </div>

            {status === "pending" && (
                <div className="">
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-red-500 hover:pointer hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                    >
                        <FaTimesCircle />
                        {isLoader ? <ButtonLoader /> : "Cancel Order"}
                    </button>
                </div>
            )}

            {status === "cancelled" && (
                <div className="pt-4 text-sm text-red-600">
                    You have cancelled this order.
                </div>
            )}

            {showReviewModal && selectedProductId && (
                <ReviewModal
                    productId={selectedProductId}
                    onClose={() => setShowReviewModal(false)}
                    onSuccess={handleReviewSuccess}
                />
            )}
        </div>
    );
}
