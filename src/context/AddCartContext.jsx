// CartContext.js
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existing = cart.find(
            (item) => item._id === product._id && item.size === product.size
        );

        let updatedCart;

        if (existing) {
            updatedCart = cart.map((item) =>
                item._id === product._id && item.size === product.size
                    ? { ...item, qty: item.qty + product.qty }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product }];
        }

        setCart(updatedCart);
        setIsDrawerOpen(true);
        toast.success("Added to cart!");
    };


    const updateQty = (id, size, type) => {
        const updatedCart = cart.map(item =>
            item._id === id && item.size === size
                ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
                : item
        );
        setCart(updatedCart);
    };

    const removeItem = (id, size) => {
        setCart(cart.filter(item => item._id !== id || item.size !== size));
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, isDrawerOpen, setIsDrawerOpen }}>
            {children}
        </CartContext.Provider>
    );
}
