// pages/YourCartPage.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../../context/AddCartContext";

export default function YourCartPage() {
    const { cart, updateQty, removeItem } = useContext(CartContext);
    // const [isLoader, setIsLoader] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <img className="w-20 " src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" />
                <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
                <Link
                    to="/"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
                <Link className="text-blue-500 hover:underline" to={'/'}>Continue Shopping</Link>
            </div>
            <div className="space-y-6">
                {cart.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 items-center border-b pb-4">
                        <img
                            src={item.images?.[0] || "/no-image.png"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-1 text-gray-700">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-sm">Size: {item.size} | Color: {item.color}</p>
                            <p className="text-sm">Price: ${item.price}</p>
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={() => updateQty(item._id, item.size, "dec")}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >-</button>
                                <span>{item.qty}</span>
                                <button
                                    onClick={() => updateQty(item._id, item.size, "inc")}
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >+</button>
                                <button
                                    onClick={() => removeItem(item._id, item.size)}
                                    className="ml-4 text-red-600 hover:text-red-800"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <Link
                    to="/checkout"
                    className="block mt-4 w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
}
