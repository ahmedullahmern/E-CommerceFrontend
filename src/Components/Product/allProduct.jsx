import { useEffect, useState } from "react";
import axios from "axios";
import { AppRoutes } from "../../constant/constant";
import PageLoader from "../Loader/PageLoader";
import { Link } from "react-router-dom";

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        axios.get(AppRoutes.allproducts)
            .then(res => {
                setProducts(res.data.data);
                setFiltered(res.data.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let temp = [...products];
        if (search.trim()) {
            const normalizedSearch = search.toLowerCase().replace(/\s+/g, "");
            temp = temp.filter(p => {
                const normalizedName = p.name.toLowerCase().replace(/\s+/g, "");
                return normalizedName.includes(normalizedSearch);
            });
        }

        if (minPrice) temp = temp.filter(p => p.price >= parseFloat(minPrice));
        if (maxPrice) temp = temp.filter(p => p.price <= parseFloat(maxPrice));
        setFiltered(temp);
    }, [search, minPrice, maxPrice, products]);

    if (loading) return <PageLoader center />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Filter Section */}
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-center">Explore Products</h2>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Min price"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => {
                            setSearch("");
                            setMinPrice("");
                            setMaxPrice("");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filtered.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                        No products found matching filters.
                    </div>
                )}
                {filtered.map(product => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
                    >
                        {/* Image with Link */}
                        <Link to={`/productDetail/${product._id}`}>
                            <img
                                src={product.images?.[0] || product.imageUrl}
                                alt={product.name}
                                className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </Link>

                        {/* Product Content */}
                        <div className="p-4">
                            <Link to={`/productDetail/${product._id}`}>
                                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition mb-1">
                                    {product.name}
                                </h3>
                            </Link>

                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                {product.description}
                            </p>

                            <p className="text-lg font-bold text-black">Rs. {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
