// ReviewModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import ButtonLoader from '../Loader/ButtonLoader';

export default function ReviewModal({ productId, onClose, onSuccess }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const token = Cookies.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(
                `https://e-commerce-backend-livid-one.vercel.app/api/product/product/${productId}/review`,
                { rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // toast.success("reviews add successfully")
            onSuccess(data);
            setLoading(false)
            onClose();
        } catch (err) {
            setLoading(false)
            toast.error(err.response?.data?.msg || "Review failed");
        }
    };

    return (
        <div className="fixed inset-0  bg-black/30  bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <button onClick={onClose} className="text-gray-500 float-right">✕</button>
                <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(+e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        >
                            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Comment:</label>
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-black">
                        {loading ? <ButtonLoader /> : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
}
