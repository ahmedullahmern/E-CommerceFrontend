// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     PieChart,
//     Monitor,
//     User,
//     Users,
//     FileText,
//     Menu as MenuIcon,
//     X as CloseIcon,
// } from 'lucide-react'; // lucide-react icons use kiye hain

// const AdminDashboard = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const menuItems = [
//         { label: 'Dashboard', icon: <PieChart size={18} />, path: '/admin/dashboard' },
//         { label: 'Add Product', icon: <Monitor size={18} />, path: '/admin/add-product' },
//         { label: 'Users', icon: <User size={18} />, path: '/admin/users' },
//         { label: 'Teams', icon: <Users size={18} />, path: '/admin/teams' },
//         { label: 'Files', icon: <FileText size={18} />, path: '/admin/files' },
//     ];

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <div className={`bg-gray-800 text-white p-4 w-64 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
//                 <div className="text-xl font-bold mb-6">Admin Panel</div>
//                 <nav className="space-y-4">
//                     {menuItems.map((item, index) => (
//                         <Link
//                             key={index}
//                             to={item.path}
//                             className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
//                         >
//                             {item.icon}
//                             <span>{item.label}</span>
//                         </Link>
//                     ))}
//                 </nav>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//                 {/* Header */}
//                 <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
//                     <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
//                     </button>
//                     <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//                 </div>

//                 {/* Breadcrumb + Content */}
//                 <div className="p-6">
//                     {/* Breadcrumb */}
//                     <div className="text-sm text-gray-600 mb-4">Home / Admin / Dashboard</div>

//                     {/* Main Box */}
//                     <div className="bg-white p-6 rounded shadow">
//                         <h2 className="text-2xl font-bold mb-4">Welcome Admin</h2>
//                         <p>This is your dashboard content.</p>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <footer className="text-center text-gray-500 py-4">
//                     © {new Date().getFullYear()} Your Company - All Rights Reserved
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


// import React, { useState } from 'react';
// import {
//     Users, UserPlus, BarChart3, FileText, Settings
// } from 'lucide-react';

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState('dashboard');

//     const dashboardStats = {
//         totalVisitors: 245,
//         newBeneficiaries: 89,
//         returningBeneficiaries: 156,
//         departmentStats: [
//             { name: 'Medical', count: 85, color: 'bg-blue-500' },
//             { name: 'Financial Aid', count: 120, color: 'bg-green-500' },
//             { name: 'Education', count: 40, color: 'bg-purple-500' },
//         ],
//     };

//     const Sidebar = () => (
//         <div className="w-64 h-full bg-white shadow-md fixed">
//             <div className="p-6 border-b">
//                 <h1 className="text-xl font-bold">Saylani Admin</h1>
//                 <p className="text-sm text-gray-500">Beneficiary Management</p>
//             </div>
//             <nav className="mt-4">
//                 {[
//                     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//                     { id: 'users', label: 'User Management', icon: Users },
//                     { id: 'reports', label: 'Reports', icon: FileText },
//                     { id: 'settings', label: 'Settings', icon: Settings },
//                 ].map((item) => {
//                     const Icon = item.icon;
//                     return (
//                         <button
//                             key={item.id}
//                             onClick={() => setActiveTab(item.id)}
//                             className={`w-full text-left px-6 py-3 flex items-center hover:bg-gray-100 ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
//                                 }`}
//                         >
//                             <Icon className="mr-3 h-5 w-5" />
//                             {item.label}
//                         </button>
//                     );
//                 })}
//             </nav>
//         </div>
//     );

//     const Dashboard = () => (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard title="Total Visitors" value={dashboardStats.totalVisitors} color="from-blue-500 to-blue-600" />
//                 <StatCard title="New Beneficiaries" value={dashboardStats.newBeneficiaries} color="from-green-500 to-green-600" />
//                 <StatCard title="Returning Beneficiaries" value={dashboardStats.returningBeneficiaries} color="from-purple-500 to-purple-600" />
//             </div>

//             <div className="bg-white shadow rounded-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4">Department-wise Activity</h3>
//                 <div className="space-y-3">
//                     {dashboardStats.departmentStats.map((dept) => (
//                         <div key={dept.name} className="flex justify-between items-center">
//                             <span>{dept.name}</span>
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-32 bg-gray-200 rounded-full h-2">
//                                     <div
//                                         className={`h-2 rounded-full ${dept.color}`}
//                                         style={{ width: `${(dept.count / dashboardStats.totalVisitors) * 100}%` }}
//                                     ></div>
//                                 </div>
//                                 <span>{dept.count}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );

//     const StatCard = ({ title, value, color }) => (
//         <div className={`bg-gradient-to-r ${color} text-white rounded-lg p-6`}>
//             <h3 className="text-sm text-blue-100">{title}</h3>
//             <p className="text-3xl font-bold">{value}</p>
//         </div>
//     );

//     const UserManagement = () => (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">User Management</h2>
//             {/* You can map users here using sample data */}
//             <p className="text-gray-600">Yahan user list ya add user form aayega.</p>
//         </div>
//     );

//     const Reports = () => (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Reports</h2>
//             <p className="text-gray-600">Admin reports fetch & download logic yahan implement hogi.</p>
//         </div>
//     );

//     const Settings = () => (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Settings</h2>
//             <p className="text-gray-600">Admin can manage default dashboard view, auto refresh, etc.</p>
//         </div>
//     );

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 'dashboard': return <Dashboard />;
//             case 'users': return <UserManagement />;
//             case 'reports': return <Reports />;
//             case 'settings': return <Settings />;
//             default: return <Dashboard />;
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar />
//             <div className="ml-64 p-6 w-full">
//                 {renderTabContent()}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

const Dashboard = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>Yahan dashboard ka content ayega.</p>
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


// import { useState, useEffect } from 'react';
// import { BarChart3, EyeOff, FileText, Settings as SettingsIcon, ShoppingCart } from 'lucide-react';
// import axios from 'axios';
// import { AppRoutes } from '../../constant/constant';

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState('dashboard');
//     const [products, setProducts] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [IsLoading, setIsLoading] = useState(true);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     // Simulated products
//     useEffect(() => {
//         axios.get("http://localhost:5000/api/product/allproducts")
//             .then(res => {
//                 const fetchedProduct = res.data.data;
//                 setProducts(fetchedProduct);
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 console.error(err);
//                 setIsLoading(false);
//             });
//     }, []);

//     const handleDelete = (id) => {
//         setProducts(products.filter(p => p._id !== id));
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const newProduct = {
//             _id: editingProduct?._id || Date.now().toString(),
//             name: form.name.value,
//             price: parseInt(form.price.value),
//             stock: parseInt(form.stock.value),
//         };

//         if (editingProduct) {
//             setProducts(products.map(p => p._id === editingProduct._id ? newProduct : p));
//         } else {
//             setProducts([...products, newProduct]);
//         }

//         setShowForm(false);
//         setEditingProduct(null);
//         form.reset();
//     };

//     const Sidebar = () => (
//         <div className="w-64 h-full bg-white shadow-md fixed">
//             <div className="p-6 border-b">
//                 <h1 className="text-xl font-bold">Saylani Admin</h1>
//                 <p className="text-sm text-gray-500">Beneficiary Management</p>
//             </div>
//             <nav className="mt-4">
//                 {[
//                     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//                     { id: 'products', label: 'Product Management', icon: ShoppingCart },
//                     { id: 'reports', label: 'Reports', icon: FileText },
//                     { id: 'settings', label: 'Settings', icon: SettingsIcon },
//                 ].map((item) => {
//                     const Icon = item.icon;
//                     return (
//                         <button
//                             key={item.id}
//                             onClick={() => {
//                                 setActiveTab(item.id);
//                                 setShowForm(false);
//                                 setEditingProduct(null);
//                             }}
//                             className={`w-full text-left px-6 py-3 flex items-center hover:bg-gray-100 ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
//                                 }`}
//                         >
//                             <Icon className="mr-3 h-5 w-5" />
//                             {item.label}
//                         </button>
//                     );
//                 })}
//             </nav>
//         </div>
//     );




//     const ProductManagement = () => (
//         <div>
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Products</h2>
//                 <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                     onClick={() => setSelectedProduct(product)}

//                 >
//                     Add Product
//                 </button>
//             </div>

//             {showForm && (
//                 <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow mb-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <input name="name" defaultValue={editingProduct?.name || ''} required placeholder="Product Name" className="border p-2 rounded" />
//                         <input name="price" defaultValue={editingProduct?.price || ''} required type="number" placeholder="Price" className="border p-2 rounded" />
//                         <input name="stock" defaultValue={editingProduct?.stock || ''} required type="number" placeholder="Stock" className="border p-2 rounded" />
//                     </div>
//                     <div className="mt-4 flex justify-end">
//                         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//                             {editingProduct ? 'Update' : 'Add'}
//                         </button>
//                     </div>
//                 </form>
//             )}

//             <div className="bg-white shadow rounded-lg p-4">
//                 <table className="w-full text-left border">
//                     <thead>
//                         <tr className="border-b">
//                             <th className="p-2">Image</th>
//                             <th className="p-2">Name</th>
//                             <th className="p-2">Price</th>
//                             <th className="p-2">Stock</th>
//                             <th className="p-2">Detail</th>
//                             <th className="p-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product._id} className="border-b">
//                                 <img className='w-20 h-20' src={product.images[0]} alt={product.name} />
//                                 <td className="p-2">{product.name}</td>
//                                 <td className="p-2">Rs. {product.price}</td>
//                                 <td className="p-2">{product.stock}</td>
//                                 <EyeOff className="w-5 h-5 mb-7 cursor-pointer text-gray-600" />
//                                 <td className="p-2 space-x-2">
//                                     <button
//                                         onClick={() => {
//                                             setEditingProduct(product);
//                                             setShowForm(true);
//                                         }}
//                                         className="text-blue-600"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(product._id)}
//                                         className="text-red-600"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {products.length === 0 && (
//                             <tr>
//                                 <td colSpan="4" className="text-center text-gray-500 py-4">No products found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 'dashboard': return <Dashboard />;
//             case 'products': return <ProductManagement />;
//             case 'reports': return <Reports />;
//             case 'settings': return <Settings />;
//             default: return <Dashboard />;
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar />
//             <div className="ml-64 p-6 w-full">{renderTabContent()}</div>
//         </div>
//     );
// };

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import { BarChart3, FileText, Settings as SettingsIcon, ShoppingCart } from 'lucide-react';
import ProductManagement from './productmanagment';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const Sidebar = () => (
        <div className="w-64 h-full bg-white shadow-md fixed">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold">Women Zee</h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
            <nav className="mt-4">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'products', label: 'Product Management', icon: ShoppingCart },
                    { id: 'reports', label: 'Reports', icon: FileText },
                    { id: 'settings', label: 'Settings', icon: SettingsIcon },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                // setShowForm (false);
                                // setEditingProduct(null);
                            }}
                            className={`w-full text-left px-6 py-3 flex items-center hover:bg-gray-100 ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                }`}
                        >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );






    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard />;
            case 'products': return <ProductManagement />;
            case 'reports': return <Reports />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-6 w-full">{renderTabContent()}</div>
        </div>
    );
};

export default AdminDashboard;