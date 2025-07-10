import { useContext, useState } from "react";
import {
    FaUserCircle,
    FaShoppingCart,
    FaBoxOpen,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/AddCartContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function HeaderComp() {
    const token = Cookies.get("token");
        const { user, setUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const nav = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove("token");
        toast.success("User Logout Successfully", {
            position: "top-center",
        });
        nav('/')
        setUser(null);
        setMenuOpen(false);
    };

    // agar user login hai aur role admin hai, to header na dikhayein
    if (user && user.role === "admin") {
        return null;
    }


    const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow border-b">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VqtwXGkZ4Xr5oz7mDJO1HcU0TLiIVXn3fnaTpk_emZDepXFb7-NDkg4Igj-1SLLiqC0&usqp=CAU"
                        className="h-[40px] w-[100px] object-cover rounded-full"
                        alt="Logo"
                    />
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                        MyShop
                    </span>
                </Link>

                {/* Hamburger Icon (Mobile Only) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-700 dark:text-white"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="text-2xl text-gray-800 dark:text-white" />
                        {cartQty > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartQty}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <Link
                            to="/login"
                            className="flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline text-sm"
                        >
                            <FaUserCircle className="text-xl" />
                            <span>Login</span>
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/myorders"
                                className="flex items-center gap-1 text-sm border border-green-600 px-3 py-1 rounded text-green-600 hover:bg-green-600 hover:text-white transition"
                            >
                                <FaBoxOpen />
                                <span>My Orders</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-sm border border-red-600 px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white transition"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link
                        to="/cart"
                        className="flex items-center gap-2 text-gray-700 dark:text-white"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaShoppingCart />
                        Cart ({cartQty})
                    </Link>

                    {!user ? (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaUserCircle />
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/myorders"
                                className="flex items-center gap-2 text-green-700"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaBoxOpen />
                                My Orders
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-600"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default HeaderComp;

