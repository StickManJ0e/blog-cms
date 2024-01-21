import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LogOut = () => {
    const { setLoggedIn, setUser, setToken } = useAuthContext();
    const [redirectHome, setRedirectHome] = useState()

    const onLogOut = async () => {
        try {
            // GET request to server 
            const req = await fetch('http://localhost:3000/log-out', {
                method: "GET",

            });
            const logOutData = await req.json();
            console.log(logOutData);
            setLoggedIn(false);
            setUser();
            setToken();
            setRedirectHome(<Navigate to='/' />)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        onLogOut();
    }, [])

    return (
        <>
            {redirectHome}
        </>
    )
}

export default LogOut;