import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";

const Post = () => {
    const { register, handleSubmit } = useForm();
    const [post, setPost] = useState();
    const [errors, setErrors] = useState('');
    const [redirect, setRedirect] = useState();
    const { id } = useParams();
    const { loggedIn, token, user } = useAuthContext();
    const navigate = useNavigate();

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
                console.log(postData['post'].comments)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const convertTimestamp = (timestamp) => {
        let alteredTimestamp = new Date(timestamp).toDateString();
        return (alteredTimestamp);
    }

    const deleteOnClick = async (post) => {
        console.log(post)
        try {
            // Delete request to server
            const req = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                    'id': id
                },
            });
            const postData = await req.json();
            console.log(postData)
            if (req.status == 200) {
                setRedirect(<Navigate to='/' />)
            }
        } catch (err) {
            console.log(err);
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
            {post !== undefined ?
                <div key={post._id} className="blog-post-container">
                    <h1 className="title">{post.title}</h1>
                    <div className="header">
                        <div className="username">By {post.user.username}</div>
                        <div className="timestamp">{convertTimestamp(post.timestamp)}</div>
                        <button className="delete" onClick={() => deleteOnClick(post)}>Delete</button>
                    </div>
                    <div className="body">
                        <div className="content">{post.content}</div>
                    </div>

                </div>
                :
                <div>Not Found</div>}
        </>
    )
}

export default Post;