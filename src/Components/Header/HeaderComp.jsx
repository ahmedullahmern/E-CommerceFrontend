import { useContext, useState } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

function HeaderComp() {
    const token = Cookies.get("token")
    const { user, setUser } = useContext(AuthContext)

    const handleLogout = () => {
        Cookies.remove("token")
        toast.success("User Logout Successfully")
        setUser(null)
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {/* Left side: Logo */}
                <a
                    href="/home"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        MyShop
                    </span>
                </a>

                {/* Right side: User Icon, Cart Icon, Logout */}
                <div className="flex items-center space-x-4">
                    <Link to={"/login"}> <FaUserCircle className="text-2xl text-gray-700 dark:text-white cursor-pointer" /></Link>                    <FaShoppingCart className="text-2xl text-gray-700 dark:text-white cursor-pointer" />

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default HeaderComp;
