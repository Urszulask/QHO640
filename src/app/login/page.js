'use client'
import React, { useState, useEffect } from "react";
import { UserAuth } from "../auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const page = () => {

  const { user, googleSignIn, signIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  /* const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState(""); */

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error)
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
  
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
  
    try {
      await signIn(email, password);
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  /* useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setFirstName(userData.firstName);
            setUsername(userData.username);
          } else {
            console.log("User document not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData(); // Call fetchUserData when user changes
  }, [user]); */


  console.log(user)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">Login</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="flex items-center justify-center space-x-4">
            <p className="text-gray-800 font-semibold">Welcome, {user.displayName || user.email}</p>
            <p
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <button onClick={handleSignIn} className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">
                Sign in with Google
              </button>
              <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                Sign in with Apple
              </button>
            </div>
            <p className="text-center text-gray-600 mb-4">or</p>
            <form onSubmit={handleEmailSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;