import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import LikePostButton from "../../components/Post/LikePost";

export const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getPosts(token)
                .then((data) => {
                    setPosts(data.posts);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, []);

    if (!token) {
        return;
    }

    return (
        <>
            <h2>Posts</h2>
            <hr></hr>
            <div className="feed" role="feed">
                {posts.map((post) => (
                    <div key={post._id}>
                        <Post post={post} key={post._id} />
                        <LikePostButton post={post}/>
                        <Link to={`/posts/find/${post._id}`}>Post Page</Link>
                        <hr></hr>
                    </div>
                ))}
            </div>
            <div className="newPost">
                <CreatePost />
            </div>
        </>
    );
};
