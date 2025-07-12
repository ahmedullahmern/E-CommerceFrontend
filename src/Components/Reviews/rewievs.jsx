// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ReviewCarousel = () => {
//     const [reviews, setReviews] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const reviewsPerSlide = 3;

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const { data } = await axios.get("http://localhost:5000/api/product/reviews/featured");
//                 console.log("Fetched reviews:", data);
//                 setReviews(data);
//             } catch (err) {
//                 console.error("Failed to fetch reviews", err);
//             }
//         };

//         fetchReviews();
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) =>
//                 (prevIndex + reviewsPerSlide) % reviews.length
//             );
//         }, 4000);
//         return () => clearInterval(interval);
//     }, [reviews]);

//     const visibleReviews = [];

//     for (let i = 0; i < Math.min(reviewsPerSlide, reviews.length); i++) {
//         const index = (currentIndex + i) % reviews.length;
//         visibleReviews.push(reviews[index]);
//     }


//     return (
//         <div className="bg-gray-100 py-8 text-center">
//             <h2 className="text-2xl font-bold mb-6 text-blue-900">Let customers speak for us</h2>
//             <div className="text-green-600 text-lg mb-2">⭐⭐⭐⭐⭐</div>
//             <div className="text-sm text-gray-600 mb-6">from {reviews.length} reviews ✅</div>

//             <div className="flex justify-center gap-4 transition-all duration-700 ease-in-out">
//                 {visibleReviews.map((review, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-white w-72 rounded-xl shadow-md p-4 hover:scale-105 transition duration-500"
//                     >
//                         <img
//                             src={review.productImage || "/no-image.png"}
//                             alt="product"
//                             className="w-full h-40 object-cover rounded mb-3"
//                         />
//                         <p className="font-semibold text-blue-800 mb-2">"{review.comment}"</p>
//                         <div className="text-sm text-gray-500 mb-1">- {review.userName}</div>
//                         <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ReviewCarousel;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PageLoader from "../Loader/PageLoader";

const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const reviewsPerSlide = 3;
    const slideRef = useRef(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("https://e-commerce-backend-livid-one.vercel.app/api/product/reviews/featured");
                setReviews(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error("Failed to fetch reviews", err);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Auto slide har 5 sec
        return () => clearInterval(interval);
    }, [reviews]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + reviews.length) % reviews.length
        );
    };

    // Slice logic
    const getVisibleReviews = () => {
        const visible = [];
        for (let i = 0; i < reviewsPerSlide; i++) {
            const index = (currentIndex + i) % reviews.length;
            visible.push(reviews[index]);
        }
        return visible;
    };

    const visibleReviews = getVisibleReviews();

    if (loading) return <PageLoader center={true} />;

    return (
        <div className="bg-gray-100 py-8 text-center relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 text-black">Let customers speak for us</h2>
            <div className="text-green-600 text-lg mb-1">⭐⭐⭐⭐⭐</div>
            <div className="text-sm text-gray-600 mb-6">from {reviews.length} reviews ✅</div>

            <div className="relative flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 z-10 bg-white shadow p-2 rounded-full hover:bg-blue-100"
                >
                    <FaArrowLeft />
                </button>

                {/* Slider */}
                <div className="overflow-hidden w-full max-w-5xl">
                    <div
                        ref={slideRef}
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex % reviews.length) * (100 / reviewsPerSlide)}%)`,
                            width: `${(reviews.length / reviewsPerSlide) * 100}%`,
                        }}
                    >
                        {reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-2"
                            >
                                <div className="bg-gray-100 rounded-lg shadow p-3 h-full flex flex-col hover:scale-105 transition duration-300">
                                    <img
                                        src={review.productImage || "/no-image.png"}
                                        alt="product"
                                        className="w-full h-32 object-cover rounded mb-2"
                                    />
                                    <p className="font-medium text-blue-800 text-sm mb-1 line-clamp-3">
                                        "{review.comment || ''}"
                                    </p>
                                    <div className="text-xs text-gray-500 mb-1">- {review.userName || 'Anonymous'}</div>
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(review.rating || 5)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-2 z-10 bg-white shadow p-2 rounded-full hover:bg-blue-100"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default ReviewCarousel;


