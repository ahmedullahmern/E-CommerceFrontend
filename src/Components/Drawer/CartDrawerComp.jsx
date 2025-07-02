// CartDrawer.jsx
import { useContext } from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { CartContext } from '../../context/AddCartContext';
import { Link } from 'react-router-dom';

const CartDrawerComp = () => {
    const { cart, updateQty, removeItem, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);

    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <FaTimes onClick={() => setIsDrawerOpen(false)} className="cursor-pointer" />
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[75vh]">
                {cart.length === 0 ? <p>Your cart is empty</p> : cart.map(item => (
                    <div key={item._id} className="border p-2 rounded-md flex gap-3">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p>{item.price} Rs</p>
                            <h4 className="font-medium">{`Selected Size: ${item.size}`}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <button
                                    onClick={() => updateQty(item._id, item.size, "dec")}
                                    disabled={item.qty === 1}
                                    className={`p-1 rounded ${item.qty === 1 ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"}`}
                                >
                                    <FaMinus />
                                </button>

                                <span>{item.qty}</span>

                                <button
                                    onClick={() => updateQty(item._id, item.size, "inc")}
                                    className='hover:cursor-pointer'
                                >
                                    <FaPlus />
                                </button>

                                <button onClick={() => removeItem(item._id, item.size)} className="ml-auto text-red-600 hover:cursor-pointer">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <p className="font-semibold">Total: {total} Rs</p>
                <Link to={"/checkout"}>
                    <button onClick={() => setIsDrawerOpen(false)} className="w-full mt-2 bg-green-600 text-white py-2 rounded">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default CartDrawerComp;
