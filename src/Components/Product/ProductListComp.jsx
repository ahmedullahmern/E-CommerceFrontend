import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import PageLoader from '../Loader/PageLoader';
import { Link, useNavigate } from 'react-router-dom';
import ReviewCarousel from '../Reviews/rewievs';

const ProductListComp = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const nav = useNavigate()
    useEffect(() => {
        setIsLoader(true);
        axios.get(AppRoutes.allproducts)
            .then((res) => {
                setProducts(res.data.data);
                console.log("hi==>", res.data);
                setIsLoader(false);
            })
            .catch((err) => {
                setIsLoader(false);
                console.log(err);
            });
    }, []);

    const handleQuickView = (product) => {
        console.log("Quick View Clicked", product);

    };

    if (isLoader) {
        return <PageLoader center={true} />;
    }

    return (
        <div className='bg-gray-100'>
            {/* Hero Banner */}
            <div className="relative h-[90vh] w-full">
                <img
                    src="https://images.unsplash.com/photo-1666358070731-f5bd1ef7d17b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFQlMjBzaGlydCUyMHN0b2NrJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D"
                    alt="Banner"
                    className="object-cover w-full h-full brightness-75"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Upgrade Your Style</h1>
                    <p className="text-lg md:text-2xl max-w-xl">
                        Discover premium T-Shirts at affordable prices – comfort and class in every thread.
                    </p>
                </div>
            </div>



            {/* Section Heading */}
            <h2 className="text-3xl font-bold text-center my-10 text-gray-800">
                Featured Products
            </h2>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
                {products.slice(0, 4).map(product => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
                    >
                        {/* Image */}
                        <Link to={`/productDetail/${product._id}`}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </Link>

                        {/* Content */}
                        <div className="p-5">
                            <h5 className="text-lg font-semibold text-gray-800 mb-1">
                                {product.name}
                            </h5>

                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xl font-bold text-black">Rs. {product.price}</span>
                                <Link to={`/productDetail/${product._id}`}>
                                    <button
                                        className="bg-blue-600 text-white text-xs px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Quick View
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center mt-10'>
                <Link to={"/allProduct"}>
                    <button className='border border-black rounded-4xl text-black px-4 py-2 hover:bg-black hover:text-white hover:scale-105'>
                        View All
                    </button>
                </Link>
            </div>
            <ReviewCarousel />
        </div>

    );
};

export default ProductListComp;
