import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import PageLoader from "../Components/Loader/PageLoader";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ⬅️ Loading flag

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("🛠️ AppRoutes.getMyInfo:", AppRoutes.getMyInfo);
        
        if (token) {
            console.log("token==>", token);
            getUser();
        } else {
            setLoading(false); // ⬅️ No token, stop loading
        }
    }, []);

    const getUser = () => {
        console.log("👀 Request bhejne wala hu...");

        axios.get(AppRoutes.getMyInfo, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then((res) => {
            console.log("resInGetUser==>", res);
            setUser(res?.data?.data);
        }).catch((err) => {
            console.log("errInGetUser==>", err);
            setUser(null);
            setLoading(false);
        }).finally(() => {
            setLoading(false); // ⬅️ Always stop loading
        });
    };
    if (loading) {
        return <PageLoader center={true} />
    }
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}