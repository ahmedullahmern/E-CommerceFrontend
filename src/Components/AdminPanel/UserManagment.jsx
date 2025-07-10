// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import PageLoader from '../Loader/PageLoader';

// export default function AdminUsersPage() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchUsers = () => {
//         setLoading(true);
//         axios.get("http://localhost:5000/api/admin/users", {
//             headers: { Authorization: `Bearer ${Cookies.get("token")}` }
//         })
//             .then(res => {
//                 setUsers(res.data.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error(err);
//                 toast.error("Users fetch failed");
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this user?")) return;
//         try {
//             await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
//                 headers: { Authorization: `Bearer ${Cookies.get("token")}` }
//             });
//             toast.success("User deleted!");
//             fetchUsers();
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     };

//     if (loading) return <PageLoader />;

//     return (
//         <div className="p-4 bg-white rounded shadow max-w-5xl mx-auto">
//             <h2 className="text-xl font-bold mb-4">All Users</h2>
//             <table className="w-full text-sm border">
//                 <thead className="bg-gray-100 text-left">
//                     <tr>
//                         <th className="p-2">Name</th>
//                         <th className="p-2">Email</th>
//                         <th className="p-2">Role</th>
//                         <th className="p-2">Joined</th>
//                         <th className="p-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(u => (
//                         <tr key={u._id} className="border-t hover:bg-gray-50">
//                             <td className="p-2">{u.name}</td>
//                             <td className="p-2">{u.email}</td>
//                             <td className="p-2">{u.role || "user"}</td>
//                             <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
//                             <td className="p-2">
//                                 <button
//                                     className="text-red-600 text-sm underline"
//                                     onClick={() => handleDelete(u._id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {users.length === 0 && <p className="text-center text-gray-500 mt-4">No users yet.</p>}
//         </div>
//     );
// }


import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import PageLoader from '../Loader/PageLoader';
import ConfirmUserDeleteModal from '../Modale/userDeleteModal';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    const fetchUsers = () => {
        setLoading(true);
        axios.get("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        })
            .then(res => {
                setUsers(res.data.data); // Make sure backend sends stats in data
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Users fetch failed");
                setLoading(false);
            });
    };

    const handleBanToggle = async (userId, currentStatus) => {
        const confirmMsg = currentStatus ? "Unban this user?" : "Ban this user?";
        if (!window.confirm(confirmMsg)) return;

        try {
            await axios.patch(`http://localhost:5000/api/admin/user/${userId}/ban`, {
                isBanned: !currentStatus
            }, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            });

            toast.success(currentStatus ? "User unbanned!" : "User banned!");
            fetchUsers();
        } catch (error) {
            toast.error("Action failed");
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            });
            toast.success("User deleted!");
            fetchUsers();
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <PageLoader center={true} />;

    return (
        <div className="p-4 bg-white rounded shadow max-w-7xl mx-auto overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Joined</th>
                        <th className="p-2 text-center">Orders</th>
                        <th className="p-2 text-right">Total Spent</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} className="border-t hover:bg-gray-50">
                            <td className="p-2">{u.name}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2 capitalize">{u.role || "user"}</td>
                            <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 text-center">{u.totalOrders || 0}</td>
                            <td className="p-2 text-right">Rs. {u.totalSpent?.toLocaleString() || 0}</td>

                            <td className="p-2">
                                <button
                                    className="text-red-600 text-sm underline"
                                    onClick={() => {
                                        setSelectedUserId(u._id);
                                        setShowModal(true);
                                    }}

                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No users yet.</p>
            )}

            <ConfirmUserDeleteModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={async () => {
                    try {
                        await axios.delete(`http://localhost:5000/api/admin/user/${selectedUserId}`, {
                            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
                        });
                        toast.success("User deleted!");
                        fetchUsers();
                        setShowModal(false); // ✅ modal band
                    } catch (err) {
                        toast.error("Delete failed");
                        setShowModal(false); // ❌ failed pe bhi band
                    }
                }}
            />

        </div>


    );
}