// // components/ProductDetail.jsx
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { CartContext } from '../../context/AddCartContext';
// import PageLoader from '../Loader/PageLoader';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const { addToCart } = useContext(CartContext);

//     useEffect(() => {
//         console.log("id==>", id)
//         setIsLoading(true);
//         axios.get(`http://localhost:5000/api/product/product/${id}`)
//             .then(res => {
//                 setProduct(res.data.data);
//                 console.log("product he kiya bhai==>", res);
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 console.error(err);
//                 setIsLoading(false);
//             });
//     }, [id]);

//     if (isLoading) return <PageLoader center={true} />;

//     return (

//         <div className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
//             {
//                 !product ? (
//                     <h1 className="text-3xl font-bold mb-4">No Yet Product</h1>
//                 ) : (
//                     <div>
//                         <img src={product.images?.[0]} alt={product.name} className="w-full h-[400px] object-contain rounded-lg shadow-md" />
//                         <div className="flex flex-col justify-between">
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//                                 <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
//                                 <p className="text-2xl font-semibold text-blue-700 mb-6">₹{product.price}</p>
//                                 <div className="flex items-center space-x-2 mb-4">
//                                     <span className="bg-yellow-300 text-white px-2 py-1 rounded text-sm">⭐ 4.0</span>
//                                     <span className="text-sm text-gray-500">(200+ Reviews)</span>
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={() => addToCart(product)}
//                                 className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition"
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 )
//             }

//         </div>
//     );
// };

// export default ProductDetail;



// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { CartContext } from '../../context/AddCartContext';
// import PageLoader from '../Loader/PageLoader';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const { addToCart } = useContext(CartContext);

//     useEffect(() => {
//         console.log("id==>", id)
//         setIsLoading(true);
//         axios.get(`http://localhost:5000/api/product/product/${id}`)
//             .then(res => {
//                 setProduct(res.data.data);
//                 console.log("product he kiya bhai==>", res);
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 console.error(err);
//                 setIsLoading(false);
//             });
//     }, [id]);

//     if (isLoading) return <PageLoader center={true} />;
//     return (
//         <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
//             <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 grid md:grid-cols-2 gap-10">
//                 <div>
//                     <img
//                         src={product.images?.[0]}
//                         alt="Selected Shirt"
//                         className="w-full rounded-xl border"
//                     />
//                     {/* {product.images?.map((img, index) => (
//                         <img
//                             key={index}
//                             src={img}
//                             alt={`thumb-${index}`}
//                             onClick={() => setSelectedImage(img)}
//                             className={`w-20 h-20 rounded-xl border cursor-pointer ${selectedImage === img ? "ring-2 ring-blue-500" : ""
//                                 }`}
//                         />
//                     ))} */}

//                 </div>

//                 <div className="flex flex-col justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
//                         <p className="text-green-600 font-semibold mt-2">⭐⭐⭐⭐☆ 5 reviews</p>
//                         <p className="text-xl text-gray-700 mt-4">{product.price}</p>
//                         <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>

//                         <div className="mt-6">
//                             <h2 className="font-semibold mb-2">Select Your Size</h2>
//                             <div className="flex flex-wrap gap-2">
//                                 {["2 to 3 Years", "4 to 5 Years", "6 to 7 Years", "8 to 9 Years", "10 to 12 Years", "13 to 14 Years"].map((size) => (
//                                     <button
//                                         key={size}
//                                         onClick={() => setSelectedSize(size)}
//                                         className={`px-4 py-2 rounded-full border ${selectedSize === size ? "bg-blue-600 text-white" : "text-gray-700"
//                                             }`}
//                                     >
//                                         {size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <h2 className="font-semibold mb-2">Quantity</h2>
//                             <div className="flex items-center space-x-4">
//                                 <button
//                                     onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                                     className="px-3 py-1 border rounded-lg"
//                                 >
//                                     -
//                                 </button>
//                                 <span>{quantity}</span>
//                                 <button
//                                     onClick={() => setQuantity((prev) => prev + 1)}
//                                     className="px-3 py-1 border rounded-lg"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="mt-6 flex space-x-4">
//                             <button className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50">Add to cart</button>
//                             <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">Buy it now</button>
//                         </div>

//                         <p className="mt-6 text-gray-600">
//                             Subtle and stylish ecru T-shirt, made from <span className="font-semibold">premium combed cotton</span> for a gentle feel.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;




import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageLoader from '../Loader/PageLoader';
import { CartContext } from "../../context/AddCartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState("M")

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://e-commerce-backend-livid-one.vercel.app/api/product/product/${id}`)
            .then(res => {
                const fetchedProduct = res.data.data;
                setProduct(fetchedProduct);
                setSelectedImage(fetchedProduct.images?.[0] || null); // default image
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            size: selectedSize,
            qty: quantity,
        });
    };


    if (isLoading) return <PageLoader center={true} />;

    return (
        <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 grid md:grid-cols-2 gap-10">
                {/* Images Section */}
                <div>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected Product"
                            className="w-full rounded-xl border"
                        />
                    )}
                    <div className="flex space-x-4 mt-4">
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`thumb-${index}`}
                                onClick={() => setSelectedImage(img)}
                                className={`w-20 h-20 rounded-xl border cursor-pointer ${selectedImage === img ? "ring-2 ring-blue-500" : ""}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <p className="text-green-600 font-semibold mt-2">⭐ {product.rating || 0} rating</p>
                        <p className="text-xl text-gray-700 mt-4">Rs. {product.price}</p>
                        <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>

                        {/* Size Selection */}
                        <div className="mt-6">
                            <h2 className="font-semibold mb-2">Select Your Size</h2>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes?.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-full border ${selectedSize === size ? "bg-blue-600 text-white" : "text-gray-700"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="mt-6">
                            <h2 className="font-semibold mb-2">Quantity</h2>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                    className="px-3 py-1 border rounded-lg"
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="px-3 py-1 border rounded-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Add to cart
                            </button>
                            <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                                Buy it now
                            </button>
                        </div>

                        <p className="mt-6 text-gray-600">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
