import { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/AddCartContext';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

export default function CheckoutPage() {
    const { cart, removeItem, updateQty } = useContext(CartContext);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handlePlaceOrder = async () => {
        const token = Cookies.get("token")
        if (!address) return alert('Please enter your address');
        if (!token) {
            return toast.warning("Please login to continue")
        }
        if (cart.length === 0) return alert('Cart is empty');

        const items = cart.map((item) => ({
            product: item._id,
            quantity: item.qty,
            size: item.size,
            color: item.color || 'default'
        }));

        try {
            setLoading(true);
            const { data } = await axios.post('https://e-commerce-backend-livid-one.vercel.app/api/order/place', {
                items,
                totalAmount,
                address,
                paymentMethod
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            alert('Order Placed Successfully!');
        } catch (err) {
            alert('Error placing order' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 grid gap-8 md:grid-cols-2">

            {/* Checkout Form */}
            <div>
                <div className='flex justify-between'>
                    <h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>
                    <Link className='text-blue-500 hover:underline' to={"/login"}>Login</Link>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                        <p className="font-medium mb-1">Payment Method</p>
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="cod"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                            <input
                                type="radio"
                                id="online"
                                name="payment"
                                value="online"
                                checked={paymentMethod === 'online'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="online">Online Payment</label>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className={`w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
            {/* Cart Items */}
            <div>
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.qty}</p>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={() => updateQty(item._id, item.size, 'dec')}
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                    >-</button>
                                    <span>{item.qty}</span>
                                    <button
                                        onClick={() => updateQty(item._id, item.size, 'inc')}
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                    >+</button>
                                    <button
                                        onClick={() => removeItem(item._id, item.size)}
                                        className="px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded"
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-4 text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</div>
            </div>

        </div>
    );
}
