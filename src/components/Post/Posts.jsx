import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../styles/Post.css'

const Posts = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState();

    const fetchPosts = async () => {
        try {
            // GET request to server 
            const req = await fetch(`http://localhost:3000/posts/user/${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'user._id': user._id,
                }
            });
            const signInData = await req.json();
            setAllPosts(signInData['allBlogPosts'])

        } catch (err) {
            console.log(err)
        }
    }

    const convertTimestamp = (timestamp) => {
        let alteredTimestamp = new Date(timestamp).toDateString();
        return (alteredTimestamp);
    }

    const navPost = (postID) => {
        navigate(`/posts/${postID}`)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            <div className="blog-posts-div">
                <h1>Your Posts</h1>
                {(allPosts) ? allPosts.map((post) => {
                    return (
                        <div key={post._id} className="blog-post-div" onClick={() => navPost(post._id)}>
                            <div className="header">
                                <div className="username">{post.user.username}</div>
                                <div className="timestamp">{convertTimestamp(post.timestamp)}</div>
                            </div>
                            <div className="body">
                                <div className="title">{post.title}</div>
                                <div className="content">{post.content}</div>
                            </div>
                        </div>
                    )
                }) : ''
                }
            </div>
        </>
    )
}

export default Posts;