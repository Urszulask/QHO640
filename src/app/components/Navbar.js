import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../auth/AuthContext";
const Navbar = () => {

    const { user, logOut,balance } = UserAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    };
    // Effect to check user authentication status when component mounts
    useEffect(() => {
        // Simulating user authentication status
        const userLoggedIn = !!user; // Check if user object exists
        setIsLoggedIn(userLoggedIn);
    }, [user]);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 5));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);
    return (
        <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
            <ul className="flex">
                <li className="p-2 cursor-pointer">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/about">About us</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                </li>
            </ul>

            <ul className="flex justify-center space-x-4">
                {/* Conditional rendering based on user authentication status */}
                {loading ? (
                    <p>Loading...</p>
                ) : isLoggedIn ? (
                    <>
                    <li className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                                <p>Balance:${balance}</p>
                            </li>
                    <li className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                            {user && user.displayName && (
                                <p className="text-gray-800 font-semibold">Welcome, {user.displayName}</p>
                            )}
                            <p
                                onClick={handleSignOut}
                                className="px-1 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 cursor-pointer block mx-auto text-center"
                            >
                                Sign Out
                            </p>
                        </li></>
                ) : (
                    <>
                        <li className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                            <Link href="/login">Login</Link>
                        </li>
                        <li className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
                            <Link href="/signup">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;