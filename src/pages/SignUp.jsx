import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const [redirectHome, setRedirectHome] = useState()
    const { setLoggedIn, setUser, setToken } = useAuthContext();

    const signUpOnSubmit = async (data, e) => {
        const formData = JSON.stringify(data);
        console.log(formData)
        try {
            const req = await fetch('http://localhost:3000/sign-up', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            });
            const signUpData = await req.json();
            console.log(signUpData)

            //If sign up error
            if (req.status != 200) {
                setErrors(signUpData.errors[0].msg);
            } else{
                setRedirectHome(<Navigate to='/' />)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {redirectHome}
            <Navbar />
            <form method="post" onSubmit={handleSubmit(signUpOnSubmit)}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" {...register("username")}></input>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" {...register("email")}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" {...register("password")}></input>

                <label htmlFor="password_confirmation">Password Confirmation:</label>
                <input type="password" id="password_confirmation" name="password_confirmation" {...register("password_confirmation")}></input>

                <button type="submit">Sign Up</button>
            </form>
            <div>{errors}</div>
        </>
    )
}

export default SignUp;