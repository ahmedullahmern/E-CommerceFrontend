import { useContext, useState } from 'react';
import { BarChart3, FileText, Settings as SettingsIcon, ShoppingCart, Menu, X, ListOrdered, UsersIcon } from 'lucide-react';
import ProductManagement from './productmanagment';
import OrderDashboard from './orderManagment';
import AdminUsersPage from './UserManagment';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext';
import StateManagment from './stateManagmenr';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile
    const [isCollapsed, setIsCollapsed] = useState(false); // for desktop sidebar
    const { user, setUser } = useContext(AuthContext);
    const nav = useNavigate()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'products', label: 'Products', icon: ShoppingCart },
        { id: 'orders', label: 'Orders', icon: ListOrdered },
        { id: 'users', label: 'Users', icon: UsersIcon },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ];


    const handleLogout = () => {
        Cookies.remove("token");
        toast.success("Admin Logged Out", { position: "top-center" });
        setUser(null);
        nav('/home')
    };

    const Sidebar = () => (
        <>
            {/* Mobile Sidebar Drawer */}
            <div className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h1 className="text-xl font-bold">MyShop</h1>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X />
                    </button>
                </div>
                <nav className="mt-4">
                    {menuItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => {
                                setActiveTab(id);
                                setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-6 py-3 flex items-center hover:bg-gray-100 ${activeTab === id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                        >
                            <Icon className="mr-3 h-5 w-5" />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Desktop Sidebar (Collapsible like YouTube) */}
            <div className={`hidden md:flex md:flex-col h-screen fixed top-0 left-0 bg-white border-r shadow-md transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <div className="p-4 flex items-center justify-between border-b">
                    {!isCollapsed && (
                        <div className='w-full flex justify-center items-center'>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VqtwXGkZ4Xr5oz7mDJO1HcU0TLiIVXn3fnaTpk_emZDepXFb7-NDkg4Igj-1SLLiqC0&usqp=CAU"
                                className="h-[31px] w-[80px] object-cover rounded-full"
                                alt="Logo"
                            />
                            {/* <p className="text-sm text-gray-500">myshop</p> */}
                        </div>
                    )}
                    <button onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <Menu /> : <X />}
                    </button>
                </div>
                <nav className="mt-4 space-y-1">
                    {menuItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`w-full px-4 py-3 flex items-center hover:bg-gray-100 ${activeTab === id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                        >
                            <Icon className="h-5 w-5" />
                            {!isCollapsed && <span className="ml-3">{label}</span>}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );

    const Topbar = () => (
        <div className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex items-center justify-between md:ml-0">
            <div className="flex items-center gap-3">
                <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                    <Menu />
                </button>
                <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
                <LogOut size={18} />
                <span>Logout</span>
            </button>
        </div>
    );

    const Reports = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reports Section</h2>
            <p>Yahan reports dikhen gi.</p>
        </div>
    );

    const Settings = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Yahan settings hongi.</p>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <StateManagment />;
            case 'products': return <ProductManagement />;
            case 'orders': return <OrderDashboard />;
            case 'users': return <AdminUsersPage />;
            case 'settings': return <Settings />;
            default: return activeTab;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                <Topbar />
                <main className="p-4 overflow-auto">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
