import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            const token = Cookies.get('token')
            if (token) {
                getUser()
            }
        }
    }, [user])

    const getUser = () => {
        axios.get(AppRoutes.getMyInfo, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then((res) => {
            console.log("resInGetUser==>", res)
            setUser(res?.data?.data)
        }).catch((err) => {
            console.log("errInGetUser==>", err)
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}