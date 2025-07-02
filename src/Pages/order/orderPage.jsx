import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import OrderCard from "../../Components/orderComp/orderComp";
import PageLoader from "../../Components/Loader/PageLoader";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const token = Cookies.get("token")

    useEffect(() => {
        setIsLoader(true)
        axios.get("http://localhost:5000/api/order/myorders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log("RESPONSE DATA =>", res.data);
                const ordersList = res.data.data || res.data || [];
                setOrders(ordersList);
                setIsLoader(false)
            })
            .catch((err) => {
                setError(err?.response?.data?.msg || "Something went wrong");
                console.log("Error in fetching orders:", err);
                setIsLoader(false)
            });
    }, []);
    if (isLoader) {
        return <PageLoader center={true} />;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => <OrderCard key={order._id} order={order} />)
            )}
        </div>
    );
}
