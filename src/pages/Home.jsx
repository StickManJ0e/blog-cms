import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useAuthContext } from "../context/AuthContext";
import Posts from "../components/Post/Posts";

const Home = () => {
    const { loggedIn, user, token } = useAuthContext();

    return (
        <>
            <Navbar />
            {loggedIn ?
                <Posts /> :
                <div>Home</div>}
        </>
    )
}

export default Home;