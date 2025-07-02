import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { EyeOff } from 'lucide-react';

import AddProductModal from '../Modale/AddProductModal';
import EditProductModal from '../Modale/editProductModal';
import ConfirmDeleteModal from '../Modale/deleteProduct';
import PageLoader from '../Loader/PageLoader';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setIsLoading(true);
        axios.get("http://localhost:5000/api/product/allproducts")
            .then(res => {
                setProducts(res.data.data || []);
                setIsLoading(false);
            })
            .catch(err => {
                toast.error("Failed to fetch products");
                setIsLoading(false);
            });
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/productDeleted/${productToDelete}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            setProducts(prev => prev.filter(p => p._id !== productToDelete));
            toast.success("Product deleted");
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product.");
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="w-full">
            {/* Modals */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
            <AddProductModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                setProducts={setProducts}
            />
            <EditProductModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                product={editingProduct}
                setProducts={setProducts}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Product
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                {isLoading ? (
                    <PageLoader center />
                ) : (
                    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                        <table className="min-w-full text-left text-sm border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Image</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Detail</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} className="border-b">
                                        <td className="p-2">
                                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                        </td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">Rs. {product.price}</td>
                                        <td className="p-2">{product.stock}</td>
                                        <td className="p-2">
                                            <EyeOff className="w-5 h-5 text-gray-600" />
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setShowEditModal(true);
                                                }}
                                                className="text-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setProductToDelete(product._id);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
