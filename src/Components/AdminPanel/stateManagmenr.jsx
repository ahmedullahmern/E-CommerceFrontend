import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import PageLoader from '../Loader/PageLoader';

export default function StateManagment() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard-summary", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    })
      .then(res => {
        setStats(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Dashboard load failed");
        setLoading(false);
      });
  }, []);

  if (loading || !stats) return <div className="p-4"><PageLoader center={true} /></div>;

  const {
    totalOrders, totalRevenue, totalUsers,
    totalProducts, pendingOrders, recentOrders
  } = stats;

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Orders", value: totalOrders, bg: "bg-blue-100", text: "text-blue-800" },
          { label: "Revenue", value: `Rs. ${totalRevenue}`, bg: "bg-green-100", text: "text-green-800" },
          { label: "Products", value: totalProducts, bg: "bg-purple-100", text: "text-purple-800" },
          { label: "Customers", value: totalUsers, bg: "bg-yellow-100", text: "text-yellow-800" },
          { label: "Pending Orders", value: pendingOrders, bg: "bg-red-100", text: "text-red-800" },
        ].map((c, i) => (
          <div key={i} className={`${c.bg} p-4 rounded shadow text-center`}>
            <div className="text-xl font-bold">{c.value}</div>
            <div className={`text-sm ${c.text}`}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded shadow overflow-x-auto p-4">
        <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{o._id.slice(-6).toUpperCase()}</td>
                <td className="p-2">{o.user?.name || "—"}</td>
                <td className="p-2">Rs. {o.totalAmount}</td>
                <td className="p-2 capitalize">{o.status}</td>
                <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
