import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";

const PostCreate = () => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const [redirectHome, setRedirectHome] = useState()
    const { loggedIn, user, token } = useAuthContext();

    const createPostOnSubmit = async (data, e) => {
        const formData = JSON.stringify(data);
        try {
            // POST request to server
            const req = await fetch('http://localhost:3000/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                    'user._id': user._id,
                },
                body: formData,
            });
            const postData = await req.json();
            console.log(postData);

            if (req.status !== 200) {
                setErrors(postData.errors[0].msg)
            } else {
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
            <form method="post" onSubmit={((e) => e.preventDefault(), handleSubmit(createPostOnSubmit))}>
                <label htmlFor="title" >Title: </label>
                <input type="text" id="title" name="title" {...register("title")}></input>

                <label htmlFor="content" >Content: </label>
                <input type="text" id="content" name="content" {...register("content")}></input>

                <button type="submit">Publish Post</button>
            </form>
            <div>{errors}</div>
        </>
    )
}

export default PostCreate;