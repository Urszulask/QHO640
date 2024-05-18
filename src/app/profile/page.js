'use client'
import React, {useEffect, useState} from "react";
import { UserAuth } from "../auth/AuthContext";

const page = () => {
    const {user} =UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () =>{
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return(
        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <p>Welcome, {user.displayName}</p>
            ) : (
                <p>Without login you can't access this page</p>
            )}
        </div>
    )
}

export default page;