import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const [redirectHome, setRedirectHome] = useState()
    const { setLoggedIn, setUser, setToken } = useAuthContext();

    const signInOnSubmit = async (data, e) => {
        const formData = JSON.stringify(data);
        try {
            // POST request to server 
            const req = await fetch('http://localhost:3000/sign-in', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            });
            const signInData = await req.json();
            console.log(signInData)

            // If login error
            if (req.status !== 200) {
                setErrors(signInData.info.message);
            } else {
                setLoggedIn(true);
                setUser(signInData.body);
                setToken(signInData.token);
                setRedirectHome(<Navigate to='/' />)
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {redirectHome}
            <Navbar />
            <form method="post" onSubmit={handleSubmit(signInOnSubmit)}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" {...register("username")}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" {...register("password")}></input>

                <button type="submit">Log In</button>
            </form>
            <div>{errors}</div>
        </>
    )
}

export default SignIn;