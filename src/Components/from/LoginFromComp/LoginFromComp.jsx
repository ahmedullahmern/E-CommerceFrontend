import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constant/constant";
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/AuthContext";
import ButtonLoader from "../../Loader/ButtonLoader";

const LoginFrom = () => {
    const [isLoading, setIsLoading] = useState(false);
    const buttonLoader = ButtonLoader()
    const { setUser } = useContext(AuthContext)
    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        if (!obj.email || !obj.password) {
            setIsLoading(false)
            toast.warning('All fields are required.', { pauseOnHover: true, });
            return;
        }
        console.log("Signup Data: ", obj);
        axios.post(AppRoutes.login, obj)
            .then((res) => {
                setIsLoading(false)
                console.log("res in login==>", res?.data?.data?.user)
                Cookies.set('token', res?.data?.data?.token)
                console.log("token he bhai", Cookies.get("token"))
                setUser(res?.data?.data?.user)
                toast.success("Login Successfully", { pauseOnHover: true })
            }).catch((err) => {
                setIsLoading(false)
                console.log("err in the login=>", err)
                // console.log("err in the login=>", err.response.data.message)
                const errorMessage = err.response ? err.response.data.msg : err.message;
                toast.error(errorMessage)
            })
    }


    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>
                <form on onSubmit={handleLogin} className="space-y-6">

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input

                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input

                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Redirect */}
                    <div className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Signup
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full hover:cursor-pointer bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                        {isLoading ? buttonLoader : "Login"}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default LoginFrom;