'use client'
import React, { useEffect, useState } from "react";
import { UserAuth } from "../auth/AuthContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const page = () => {
    const { user, logOut, googleSignIn, createUser } = UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        const firstName = e.target.firstName.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            // Create a new user with email and password
            const userCredential = await createUser(email, password);
            const user = userCredential.user;
            console.log('user from signup:',user);
            // Store additional user data in Firestore
            const usersCollectionRef = collection(db, "users");
            await addDoc(usersCollectionRef, {
                userId: user.uid,
                firstName: firstName,
                username: username, // Storing username in Firestore
                email: email,
                createdAt: new Date(),
            });
    
            console.log("User signed up successfully");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div className="flex items-center justify-center space-x-4">
                        <p className="text-gray-800 font-semibold">You have already logged In</p>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h1>
                        <div className="flex justify-center mb-6">
                            <button onClick={handleSignIn} className="px-4 py-2 mr-4 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                                Connect with Google
                            </button>
                            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                                Connect with Apple
                            </button>
                        </div>
                        <p className="text-center text-gray-600 mb-6">or</p>
                        <form onSubmit={handleSignUp}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username" // Added name attribute
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName" // Added name attribute
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                    required="required"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:shadow-outline"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page;