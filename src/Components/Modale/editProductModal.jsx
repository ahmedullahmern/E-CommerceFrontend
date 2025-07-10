import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonLoader from '../Loader/ButtonLoader';

const EditProductModal = ({ isOpen, onClose, product, setProducts }) => {
    const [isLoading, setIsLoading] = useState(false);
    const buttonLoader = ButtonLoader();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sizes: '',
        colors: '',
        stock: '',
        category: '',
        material: '',
        images: []
    });

    // Populate form data when product changes
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                sizes: product.sizes.join(', '),
                colors: product.colors.join(', '),
                stock: product.stock,
                category: product.category,
                material: product.material,
                images: product.images
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            sizes: formData.sizes.split(',').map(s => s.trim()),
            colors: formData.colors.split(',').map(c => c.trim()),
            images: formData.images,
        };

        try {
            const res = await axios.put(`https://e-commerce-backend-livid-one.vercel.app/api/admin/productUpdated/${product._id}`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            // Update list
            setProducts(prev => prev.map(p => (p._id === product._id ? res.data.data : p)));
            setIsLoading(false);
            toast.success("Product Updated");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product");
            setIsLoading(false);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Product</h2>
                    <button onClick={onClose} className="text-lg">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Product Name" />

                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Description" />

                    <div className="grid grid-cols-2 gap-4">
                        <input name="price" type="number" value={formData.price} onChange={handleChange} className="border p-2 rounded" placeholder="Price" />
                        <input name="sizes" value={formData.sizes} onChange={handleChange} className="border p-2 rounded" placeholder="Sizes (e.g. S,M,L)" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="border p-2 rounded" placeholder="Stock" />
                        <input name="colors" value={formData.colors} onChange={handleChange} className="border p-2 rounded" placeholder="Colors (e.g. Red, Blue)" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded" placeholder="Category" />
                        <input name="material" value={formData.material} onChange={handleChange} className="border p-2 rounded" placeholder="Material" />
                    </div>

                    {/* Image preview only, no re-upload in edit for now */}
                    {formData.images.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {formData.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`Preview ${idx}`} className="h-16 w-16 object-cover rounded border" />
                            ))}
                        </div>
                    )}

                    <button type="submit" className="bg-black text-white w-full py-2 rounded">
                        {isLoading ? buttonLoader : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
