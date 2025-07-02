const Footer = () => {
    return (
        <footer className="bg-[#001F54] text-white px-6 py-10">
            <div className="text-center max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Subscribe to our emails</h2>
                <p className="mb-6 text-gray-300">
                    Be the first to know about new collections and exclusive offers.
                </p>
                <form className="flex justify-center mb-8">
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-white px-4 py-2 w-64 rounded-l-full focus:outline-none text-black"
                    />
                    <button
                        type="submit"
                        className="bg-white text-[#001F54] px-4 py-2 rounded-r-full font-semibold"
                    >
                        →
                    </button>
                </form>

                <div className="mb-4">
                    <p className="font-semibold">Get in touch</p>
                    <p className="text-sm mt-1">
                        <span className="font-bold">Email:</span> vipsetupstore@gmail.com
                    </p>
                    <p className="text-sm">
                        <span className="font-bold">WhatsApp Support:</span> 0300-1326840
                    </p>
                </div>

                <div className="text-2xl mt-4">
                    <a href="#" className="text-white hover:text-gray-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                <p>
                    © 2025, Vip setup Powered by Shopify ·{" "}
                    <a href="#" className="underline hover:text-white">Privacy policy</a> ·{" "}
                    <a href="#" className="underline hover:text-white">Shipping policy</a> ·{" "}
                    <a href="#" className="underline hover:text-white">Refund policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
