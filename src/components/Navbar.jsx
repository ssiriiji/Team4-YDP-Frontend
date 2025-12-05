import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-10 h-10"
                            />
                        </Link>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700 font-medium">Hello, {user.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-2 bg-[#577753] text-white font-medium rounded-full hover:bg-green-800 transition duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 bg-white text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-50 transition duration-200"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar