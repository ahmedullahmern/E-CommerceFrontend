
import { EyeOff, } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductModal from '../Modale/AddProductModal';
import PageLoader from '../Loader/PageLoader';
import ConfirmDeleteModal from '../Modale/deleteProduct';
import EditProductModal from '../Modale/editProductModal';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

const ProductManagement = () => {

    const [products, setProducts] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/productDeleted/${productToDelete}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            setProducts(prev => prev.filter(p => p._id !== productToDelete));
            setShowDeleteModal(true);
            toast.success("Product Deleted ")
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product.");
            setShowDeleteModal(false);
        }
    };


    useEffect(() => {
        setIsLoading(true)
        axios.get("http://localhost:5000/api/product/allproducts")
            .then(res => {
                const fetchedProduct = res.data.data;
                setProducts(fetchedProduct);
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                console.error(err);
            });
    }, []);

    return (
        <div>
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}

                >
                    Add Product
                </button>
            </div>
            <AddProductModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                setProducts={setProducts}
            />
            <EditProductModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                product={editingProduct}
                setProducts={setProducts}
            />
            <div className="bg-white shadow rounded-lg p-4">
                {
                    IsLoading ? <PageLoader center /> :
                        <table className="w-full text-left border">
                            <thead>
                                <tr className="border-b">
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
                                        <img className='w-20 h-20' src={product.images[0]} alt={product.name} />
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">Rs. {product.price}</td>
                                        <td className="p-2">{product.stock}</td>
                                        <EyeOff className="w-5 h-5 mb-7 cursor-pointer text-gray-600" />
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
                                                    console.log("productDelete==>", product._id);
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
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500 py-4">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
};

export default ProductManagement