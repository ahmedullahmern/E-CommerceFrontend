import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constant/constant";
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/AuthContext";
import ButtonLoader from "../../Loader/ButtonLoader";

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate()
    const buttonLoader = ButtonLoader()
    const handleSignup = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const obj = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        if (!obj.email || !obj.password || !obj.name) {
            setIsLoading(false)
            toast.warning('All fields are required.');
            return;
        }
        axios.post(AppRoutes.signup, obj)
            .then((res) => {
                setIsLoading(false)
                console.log("res in login==>", res?.data?.data?.user)
                toast.success("Your Account Created Successfully")
                nav("/login")
            }).catch((err) => {
                setIsLoading(false)
                console.log("err in the login=>", err)
                console.log("err in the login=>", err.response.data.msg)
                const errorMessage = err.response ? err.response.data.msg : err.message;
                toast.error(errorMessage)
            })
    }

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    SIGN UP
                </h2>
                <form onSubmit={handleSignup} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input

                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

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
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full hover:cursor-pointer bg-black text-white py-3 px-4 rounded-md hover:bg-black focus:ring-2 focus:ring-black"
                    >
                        {isLoading ? buttonLoader : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;