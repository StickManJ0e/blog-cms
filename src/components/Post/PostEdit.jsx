import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";

const PostEdit = () => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const [redirect, setRedirect] = useState();
    const { loggedIn, user, token } = useAuthContext();
    const [post, setPost] = useState();
    const { id } = useParams();

    const fetchPost = async () => {
        try {
            const req = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const postData = await req.json();

            if (req.status !== 200) {
                setPost()
            } else {
                setPost(postData['post'])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const editPostOnSubmit = async (data, e) => {
        const formData = JSON.stringify(data);
        try {
            const req = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                    'user._id': user._id,
                },
                body: formData,
            });
            const postData = await req.json();
            console.log(postData);
            if (req.status == 200) {
                setRedirect(<Navigate to={`/posts/${id}`} />)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
        setRedirect()
    }, [])

    return (
        <>
            {redirect}
            <Navbar />
            {post ?

                <form method="post" onSubmit={((e) => e.preventDefault(), handleSubmit(editPostOnSubmit))}>
                    <label htmlFor="title" >Title: </label>
                    <input type="text" id="title" name="title" {...register("title")} defaultValue={post.title}></input>

                    <label htmlFor="content" >Content: </label>
                    <input type="text" id="content" name="content" {...register("content")} defaultValue={post.content}></input>

                    <button type="submit">Publish Post</button>
                    <div>{errors}</div>
                </form> :
                ''
            }
        </>
    )
}

export default PostEdit;