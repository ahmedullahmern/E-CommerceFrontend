import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ButtonLoader from '../Loader/ButtonLoader';
import { toast } from 'react-toastify';

const AddProductModal = ({ isOpen, onClose, setProducts }) => {
    const [isLoading, setIsLoading] = useState(false)
    const buttonLoader = ButtonLoader()
    const [imageUploading, setImageUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sizes: '',
        colors: '',
        images: [],
        stock: '',
        category: 'nightsuit',
        material: ''
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageUploading(true);
        const data = new FormData();
        data.append("image", file); // key should match multer config

        try {
            const res = await fetch("https://e-commerce-backend-livid-one.vercel.app/api/product/upload", {
                method: "POST",
                body: data
            });
            const result = await res.json();

            if (result?.url) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, result.url]
                }));
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Image upload failed");
            }
            setImageUploading(false);
        } catch (err) {
            setImageUploading(false);
            toast.error("Upload error");
            console.error("Image Upload Error:", err);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        console.log("token he bhia kiya==>", Cookies.get("token"))

        // Prepare payload for backend
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            sizes: formData.sizes.split(',').map(s => s.trim()),
            colors: formData.colors.split(',').map(c => c.trim()),
            images: formData.images
            // images: formData.images.split(',').map(i => i.trim())
        };

        try {
            const res = await axios.post('https://e-commerce-backend-livid-one.vercel.app/api/product/addproduct', payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            setIsLoading(false)
            toast.success("Product Add Success")
            setProducts(prev => [...prev, res.data.data]);
            onClose(); // close modal
        } catch (err) {
            setIsLoading(false)
            toast.error(err)
            console.error("Add product error: ", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[100%] max-w-md max-h-[90vh] overflow-y-auto ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <button className="cursor-pointer text-lg" onClick={onClose}>✕</button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-medium">Product Name</label>
                        <input
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-full border p-2 rounded"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            className="w-full border p-2 rounded"
                            placeholder="Product description"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input
                                name="price"
                                type="number"
                                onChange={handleChange}
                                value={formData.price}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. 1499"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Sizes</label>
                            <input
                                name="sizes"
                                onChange={handleChange}
                                value={formData.sizes}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. S,M,L"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Stock</label>
                            <input
                                name="stock"
                                type="number"
                                onChange={handleChange}
                                value={formData.stock}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. 50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Colors</label>
                            <input
                                name="colors"
                                onChange={handleChange}
                                value={formData.colors}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. Red, Blue"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium">Upload Images (2 Required)</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="border p-2 rounded w-full"
                        />

                        {imageUploading ? (
                            <div className="mt-2 text-sm text-gray-500">Uploading image...</div>
                        ) : formData.images.length > 0 && (
                            <div className="flex gap-2 mt-2">
                                {formData.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Preview ${idx}`}
                                        className="h-16 w-16 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <input
                                name="category"
                                onChange={handleChange}
                                value={formData.category}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. Nightsuit"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Material</label>
                            <input
                                name="material"
                                onChange={handleChange}
                                value={formData.material}
                                className="border p-2 rounded w-full"
                                placeholder="e.g. Cotton"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white w-full py-2 rounded"
                    >
                        {isLoading ? buttonLoader : "Add Product"}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default AddProductModal;
