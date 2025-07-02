// components/ProductModal.js
export default function ProductDetailModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                <button
                    className="absolute top-2 right-3 text-gray-600 text-xl"
                    onClick={onClose}
                >×</button>

                <h2 className="text-xl font-semibold mb-4">Order #{order._id.slice(-6).toUpperCase()} Details</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 text-left">Product</th>
                                <th className="px-3 py-2 text-left">Size</th>
                                <th className="px-3 py-2 text-left">Color</th>
                                <th className="px-3 py-2 text-left">Qty</th>
                                <th className="px-3 py-2 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(order.items || []).map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-3 py-2">{item.product?.name || "—"}</td>
                                    <td className="px-3 py-2">{item.size || "—"}</td>
                                    <td className="px-3 py-2">{item.color || "—"}</td>
                                    <td className="px-3 py-2">{item.quantity}</td>
                                    <td className="px-3 py-2">Rs. {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-right">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
