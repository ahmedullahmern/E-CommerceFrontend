import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import PageLoader from "../Loader/PageLoader";
import { PencilLine } from 'lucide-react';
import ProfileImgDelModal from "../Modale/deleteProfileImage";
import { AuthContext } from "../../context/AuthContext";


function ProfileSetting() {
    const menuRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [Ploading, PsetLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setUser } = useContext(AuthContext);

    const token = Cookies.get("token");
    const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

    const handelConfirmDelimg = async () => {
        try {
            const res = await axios.delete("http://localhost:5000/auth/profileimgdelete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data.data)
            toast.success("Profile Img Del Successfully");
            setShowDeleteModal(false);
            setPreview(defaultAvatar);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            toast.success(error);
            console.log(error)
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ✅ 1. Fetch current user info
    useEffect(() => {
        const fetchProfile = async () => {
            PsetLoading(true)
            try {
                const res = await axios.get("http://localhost:5000/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { name, email, avatar } = res.data.data || {}; // ✅ fix yahan hai
                // const { name, email } = res.data.data || {}; // ✅ fix yahan hai

                setName(name || "");
                setEmail(email || "");
                // setPreview(avatar);
                setPreview(avatar || defaultAvatar);
                // setPreview(avatar || `data:image/png;base64,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`);
                PsetLoading(false)
            } catch (err) {
                toast.error(err?.response?.data?.message || "Failed to load profile");
                console.error(err);
                PsetLoading(false)
            }
        };

        fetchProfile();
    }, [token]);

    // ✅ 2. Handle avatar change
    const handleAvatarChange = (e) => {
        setLoadingImg(true)
        try {
            const file = e.target.files[0];
            if (file) {
                setAvatar(file);
                setPreview(URL.createObjectURL(file));
                setLoadingImg(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            setLoadingImg(false)
            console.log(error)
        }
    };

    // ✅ 3. Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            if (avatar) formData.append("avatar", avatar);

            const res = await axios.put("http://localhost:5000/auth/profile/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            setUser(res.data.data)
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
            console.error(err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    if (Ploading) return <PageLoader center={true} />
    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md m-20">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Update Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Avatar Upload with Preview */}
                <div className="flex flex-col items-center gap-4">
                    {loadingImg ? (
                        <div className="w-16 h-16 rounded-full border flex items-center justify-center">
                            <span className="text-xs text-gray-500">Uploading...</span>
                        </div>
                    ) : (
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    )}
                    <div className="relative">
                        <div
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="absolute bottom-2 left-2 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow cursor-pointer hover:scale-105 transition"
                        >
                            <PencilLine size={18} />
                        </div>

                        {menuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute top-full hover:cursor-pointer  mt-2 left-1/2 transform -translate-x-1/2 w-[200px] dark:bg-gray-800 bg-white rounded shadow-md p-4 z-50"
                            >
                                <label className="flex items-center justify-center hover:opacity-70 p-1">
                                    Upload Profile Photo
                                    <input
                                        name="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label >
                                {preview !== defaultAvatar && (
                                    <div
                                        className="flex hover:cursor-pointer items-center justify-center hover:opacity-70 p-1"
                                        onClick={() => {
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete Profile Photo
                                    </div>
                                )}

                            </div>
                        )}
                    </div>


                    {/* <label className="cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Change Profile Photo
                        <input
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </label> */}
                </div>


                {/* Full Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-black hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition dark:bg-black dark:hover:bg-black"
                >
                    {loading ? <ButtonLoader /> : "Save Changes"}
                </button>
            </form>
            <ProfileImgDelModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handelConfirmDelimg}
            />
        </div>
    );
}

export default ProfileSetting;
