import { useContext, useEffect, useRef, useState } from "react";
import {
    FaUserCircle,
    FaShoppingCart,
    FaBoxOpen,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUser,
    FaCog
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/AddCartContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";


function HeaderComp() {
    const menuRef = useRef(null);
    const token = Cookies.get("token");
    const { user, setUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const nav = useNavigate()
    console.log("userIMg==>", user)
    const [menuOpen, setMenuOpen] = useState(false);
    const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

    const handleLogout = () => {
        Cookies.remove("token");
        toast.success("User Logout Successfully", {
            position: "top-center",
        });
        nav('/')
        setUser(null);
        setMenuOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // agar user login hai aur role admin hai, to header na dikhayein
    if (user && user.role === "admin") {
        return null;
    }


    const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

    return (
        
        <nav className="bg-gray-50 dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 h-[70px] flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="">
                    <img
                        src="https://womenzee.com/cdn/shop/files/Black_White_Monogram_R_Logo_1_100x@2x.png?v=1749845351"
                        className="h-[60px] w-auto  object-contain"
                        alt="Logo"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-5">
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
                        // Avatar and Dropdown only for logged-in user
                        <>
                            <Link
                                to="/myorders"
                                className="flex items-center gap-1 text-sm border px-3 py-1 rounded hover:opacity-50 transition"
                            >
                                <FaBoxOpen />
                                <span>My Orders</span>
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        className="w-8 h-8 hover:cursor-pointer rounded-full object-cover"
                                        src={user.avatar || defaultAvatar}
                                        alt="User Avatar"
                                    />
                                </button>

                                {menuOpen && (
                                    <div ref={menuRef} className="flex flex-col justify-center  absolute right-0 mt-2 w-[200px] dark:bg-gray-800 rounded shadow-md p-7 bg-white z-50">
                                        <div className="flex justify-center">
                                            <img
                                                className="w-12 h-12 hover:cursor-pointer rounded-full object-cover"
                                                src={user.avatar || defaultAvatar}
                                                alt="User Avatar"
                                            />
                                        </div>
                                        <div className="w-full flex flex-col justify-center items-center px-3 py-1">
                                            <div className="font-medium">
                                                {user.name}
                                            </div>
                                            <div className="">
                                                {user.email}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(() => {
                                                nav('/profilesetting')
                                                setMenuOpen(false);
                                            })}
                                            className="flex items-center hover:opacity-50 justify-center px-5 py-1  border-gray-400 border">
                                            {/* <FaCog /> */}
                                            Edit Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center hover:opacity-50 justify-center px-5 gap-2 w-full ">
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-700 dark:text-white"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {
                menuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-gray-900 shadow-md border-t dark:border-gray-700">
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
                                    className="flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <FaBoxOpen />
                                    My Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-black dark:text-black w-full ">
                                    <FaCog />
                                    Profile Setting
                                </button>
                                <div className="flex flex-col gap-1 text-sm text-gray-800 dark:text-white">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 ">
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                                <div className=" flex items-center gap-1">
                                    <FaUser /> <span>{user.email}</span>
                                </div>

                            </>
                        )}
                    </div>
                )
            }
        </nav >


    );
}

export default HeaderComp;

// import { useContext, useState } from "react";
// import {
//     FaUserCircle,
//     FaShoppingCart,
//     FaBoxOpen,
//     FaSignOutAlt,
//     FaBars,
//     FaTimes,
//     FaUser,
//     FaCog
// } from "react-icons/fa";

// import { AuthContext } from "../../context/AuthContext";
// import { CartContext } from "../../context/AddCartContext";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { Link, useNavigate } from "react-router-dom";


// function HeaderComp() {
//     const token = Cookies.get("token");
//     const { user, setUser } = useContext(AuthContext);
//     const { cart } = useContext(CartContext);
//     const nav = useNavigate()
//     console.log("userIMg==>", user)
//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleLogout = () => {
//         Cookies.remove("token");
//         toast.success("User Logout Successfully", {
//             position: "top-center",
//         });
//         nav('/')
//         setUser(null);
//         setMenuOpen(false);
//     };

//     // agar user login hai aur role admin hai, to header na dikhayein
//     if (user && user.role === "admin") {
//         return null;
//     }


//     const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

//     return (
//         // <nav className="bg-white dark:bg-gray-900 shadow border-b">
//         //     <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
//         //         {/* Logo */}
//         //         <Link to="/" className="flex items-center space-x-2">
//         //             <img
//         //                 src="https://womenzee.com/cdn/shop/files/Black_White_Monogram_R_Logo_1_100x@2x.png?v=1749845351"
//         //                 className="h-[60px] w-[100%] object-contain" // zyada height aur better fitting
//         //                 alt="Logo"
//         //             />
//         //             {/* <img
//         //                 src="https://womenzee.com/cdn/shop/files/Black_White_Monogram_R_Logo_1_100x@2x.png?v=1749845351"
//         //                 className="h-[40px] w-[100px] object-cover rounded-full"
//         //                 alt="Logo"
//         //             /> */}
//         //             {/* <span className="text-lg font-bold text-gray-800 dark:text-white">
//         //                 MyShop
//         //             </span> */}
//         //         </Link>

//         //         {/* Hamburger Icon (Mobile Only) */}
//         //         <div className="md:hidden">
//         //             <button
//         //                 onClick={() => setMenuOpen(!menuOpen)}
//         //                 className="text-2xl text-gray-700 dark:text-white"
//         //             >
//         //                 {menuOpen ? <FaTimes /> : <FaBars />}
//         //             </button>
//         //         </div>

//         //         {/* Desktop Menu */}
//         //         <div className="hidden md:flex items-center gap-4">
//         //             <Link to="/cart" className="relative">
//         //                 <FaShoppingCart className="text-2xl text-gray-800 dark:text-white" />
//         //                 {cartQty > 0 && (
//         //                     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//         //                         {cartQty}
//         //                     </span>
//         //                 )}
//         //             </Link>

//         //             {!user ? (
//         //                 <Link
//         //                     to="/login"
//         //                     className="flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline text-sm"
//         //                 >
//         //                     <FaUserCircle className="text-xl" />
//         //                     <span>Login</span>
//         //                 </Link>
//         //             ) : (
//         //                 <>
//         //                     <Link
//         //                         to="/myorders"
//         //                         className="flex items-center gap-1 text-sm border border-green-600 px-3 py-1 rounded text-green-600 hover:bg-green-600 hover:text-white transition"
//         //                     >
//         //                         <FaBoxOpen />
//         //                         <span>My Orders</span>
//         //                     </Link>
//         //                     <button
//         //                         onClick={handleLogout}
//         //                         className="flex items-center gap-1 text-sm border border-red-600 px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white transition"
//         //                     >
//         //                         <FaSignOutAlt />
//         //                         <span>Logout</span>
//         //                     </button>
//         //                 </>
//         //             )}
//         //         </div>
//         //     </div>

//         //     {/* Mobile Dropdown Menu */}
//         //     {menuOpen && (
//         //         <div className="md:hidden px-4 pb-4 space-y-3">
//         //             <Link
//         //                 to="/cart"
//         //                 className="flex items-center gap-2 text-gray-700 dark:text-white"
//         //                 onClick={() => setMenuOpen(false)}
//         //             >
//         //                 <FaShoppingCart />
//         //                 Cart ({cartQty})
//         //             </Link>

//         //             {!user ? (
//         //                 <Link
//         //                     to="/login"
//         //                     className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
//         //                     onClick={() => setMenuOpen(false)}
//         //                 >
//         //                     <FaUserCircle />
//         //                     Login
//         //                 </Link>
//         //             ) : (
//         //                 <>
//         //                     <Link
//         //                         to="/myorders"
//         //                         className="flex items-center gap-2 text-green-700"
//         //                         onClick={() => setMenuOpen(false)}
//         //                     >
//         //                         <FaBoxOpen />
//         //                         My Orders
//         //                     </Link>
//         //                     <button
//         //                         onClick={handleLogout}
//         //                         className="flex items-center gap-2 text-red-600"
//         //                     >
//         //                         <FaSignOutAlt />
//         //                         Logout
//         //                     </button>
//         //                 </>
//         //             )}
//         //         </div>
//         //     )}
//         // </nav>

//         // <nav className="bg-gray-50 dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
//         //     <div className="max-w-screen-xl mx-auto px-4 h-[70px] flex justify-between items-center">
//         //         {/* Logo */}
//         //         <Link to="/" className="flex items-center space-x-2">
//         //             <img
//         //                 src="https://womenzee.com/cdn/shop/files/Black_White_Monogram_R_Logo_1_100x@2x.png?v=1749845351"
//         //                 className="h-[50px] w-auto object-contain"
//         //                 alt="Logo"
//         //             />
//         //         </Link>

//         //         {/* Hamburger Icon (Mobile) */}
//         //         <div className="md:hidden">
//         //             <button
//         //                 onClick={() => setMenuOpen(!menuOpen)}
//         //                 className="text-2xl text-gray-700 dark:text-white"
//         //             >
//         //                 {menuOpen ? <FaTimes /> : <FaBars />}
//         //             </button>
//         //         </div>

//         //         {/* Desktop Menu */}
//         //         <div className="hidden md:flex items-center gap-5">
//         //             <Link to="/cart" className="relative">
//         //                 <FaShoppingCart className="text-2xl text-gray-800 dark:text-white" />
//         //                 {cartQty > 0 && (
//         //                     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//         //                         {cartQty}
//         //                     </span>
//         //                 )}
//         //             </Link>

//         //             {!user ? (
//         //                 <Link
//         //                     to="/login"
//         //                     className="flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline text-sm"
//         //                 >
//         //                     <FaUserCircle className="text-xl" />
//         //                     <span>Login</span>
//         //                 </Link>
//         //             ) : (
//         //                 <>
//         //                     <Link
//         //                         to="/myorders"
//         //                         className="flex items-center gap-1 text-sm border border-green-600 px-3 py-1 rounded text-green-600 hover:bg-green-600 hover:text-white transition"
//         //                     >
//         //                         <FaBoxOpen />
//         //                         <span>My Orders</span>
//         //                     </Link>
//         //                     <button
//         //                         onClick={handleLogout}
//         //                         className="flex items-center gap-1 text-sm border border-red-600 px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white transition"
//         //                     >
//         //                         <FaSignOutAlt />
//         //                         <span>Logout</span>
//         //                     </button>
//         //                 </>

//         //             )}
//         //         </div>
//         //     </div>

//         //     {/* Mobile Dropdown Menu */}
//         //     {menuOpen && (
//         //         <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-gray-900 shadow-md border-t dark:border-gray-700">
//         //             <Link
//         //                 to="/cart"
//         //                 className="flex items-center gap-2 text-gray-700 dark:text-white"
//         //                 onClick={() => setMenuOpen(false)}
//         //             >
//         //                 <FaShoppingCart />
//         //                 Cart ({cartQty})
//         //             </Link>

//         //             {!user ? (
//         //                 <Link
//         //                     to="/login"
//         //                     className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
//         //                     onClick={() => setMenuOpen(false)}
//         //                 >
//         //                     <FaUserCircle />
//         //                     Login
//         //                 </Link>
//         //             ) : (
//         //                 <>
//         //                     <Link
//         //                         to="/myorders"
//         //                         className="flex items-center gap-2 text-green-700 dark:text-green-400"
//         //                         onClick={() => setMenuOpen(false)}
//         //                     >
//         //                         <FaBoxOpen />
//         //                         My Orders
//         //                     </Link>
//         //                     <button
//         //                         onClick={handleLogout}
//         //                         className="flex items-center gap-2 text-red-600 dark:text-red-400"
//         //                     >
//         //                         <FaSignOutAlt />
//         //                         Logout
//         //                     </button>
//         //                 </>
//         //             )}
//         //         </div>
//         //     )}
//         // </nav>

//         <nav className="bg-gray-50 dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
//             <div className="max-w-screen-xl mx-auto px-4 h-[70px] flex justify-between items-center">

//                 {/* Logo */}
//                 <Link to="/" className="">
//                     <img
//                         src="https://womenzee.com/cdn/shop/files/Black_White_Monogram_R_Logo_1_100x@2x.png?v=1749845351"
//                         className="h-[60px] w-auto  object-contain"
//                         alt="Logo"
//                     />
//                 </Link>

//                 {/* Desktop Menu */}
//                 <div className="hidden md:flex items-center gap-5">
//                     <Link to="/cart" className="relative">
//                         <FaShoppingCart className="text-2xl text-gray-800 dark:text-white" />
//                         {cartQty > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                                 {cartQty}
//                             </span>
//                         )}
//                     </Link>

//                     {!user ? (
//                         <Link
//                             to="/login"
//                             className="flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline text-sm"
//                         >
//                             <FaUserCircle className="text-xl" />
//                             <span>Login</span>
//                         </Link>
//                     ) : (
//                         // Avatar and Dropdown only for logged-in user
//                         <>
//                             <Link
//                                 to="/myorders"
//                                 className="flex items-center gap-1 text-sm border border-green-600 px-3 py-1 rounded text-green-600 hover:bg-green-600 hover:text-white transition"
//                             >
//                                 <FaBoxOpen />
//                                 <span>My Orders</span>
//                             </Link>
//                             <div className="relative">
//                                 <button
//                                     onClick={() => setMenuOpen(!menuOpen)}
//                                     className="flex items-center gap-2"
//                                 >
//                                     <img
//                                         className="w-8 h-8 hover:cursor-pointer rounded-full object-cover"
//                                         src={user.avatar || "data:image/png;base64,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"}
//                                         alt="User Avatar"
//                                     />
//                                 </button>

//                                 {menuOpen && (
//                                     <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-md py-2 z-50">
//                                         <div className="flex items-center gap-2 px-4 w-full py-2 text-sm text-gray-700 dark:text-white border-b dark:border-gray-600">
//                                             <FaUser />
//                                             {user.email}
//                                         </div>
//                                         <button
//                                             onClick={() => { nav('/profilesetting') }}
//                                             className="flex items-center hover:opacity-50 justify-center px-5 gap-2 text-black dark:text-black w-full ">
//                                             <FaCog />
//                                             Profile Setting
//                                         </button>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="flex items-center hover:opacity-50 justify-center px-5 gap-2 text-red-600 dark:text-red-400 w-full ">
//                                             <FaSignOutAlt />
//                                             Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 {/* Mobile Hamburger */}
//                 <div className="md:hidden">
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         className="text-2xl text-gray-700 dark:text-white"
//                     >
//                         {menuOpen ? <FaTimes /> : <FaBars />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Dropdown Menu */}
//             {
//                 menuOpen && (
//                     <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-gray-900 shadow-md border-t dark:border-gray-700">
//                         <Link
//                             to="/cart"
//                             className="flex items-center gap-2 text-gray-700 dark:text-white"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             <FaShoppingCart />
//                             Cart ({cartQty})
//                         </Link>

//                         {!user ? (
//                             <Link
//                                 to="/login"
//                                 className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
//                                 onClick={() => setMenuOpen(false)}
//                             >
//                                 <FaUserCircle />
//                                 Login
//                             </Link>
//                         ) : (
//                             <>
//                                 <Link
//                                     to="/myorders"
//                                     className="flex items-center gap-2 text-green-700 dark:text-green-400"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <FaBoxOpen />
//                                     My Orders
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="flex items-center gap-2 text-black dark:text-black w-full ">
//                                     <FaCog />
//                                     Profile Setting
//                                 </button>
//                                 <div className="flex flex-col gap-1 text-sm text-gray-800 dark:text-white">
//                                     <button
//                                         onClick={handleLogout}
//                                         className="flex items-center gap-2 text-red-600 dark:text-red-400">
//                                         <FaSignOutAlt />
//                                         Logout
//                                     </button>
//                                 </div>
//                                 <div className=" flex items-center gap-1">
//                                     <FaUser /> <span>{user.email}</span>
//                                 </div>

//                             </>
//                         )}
//                     </div>
//                 )
//             }
//         </nav >


//     );
// }

// export default HeaderComp;

