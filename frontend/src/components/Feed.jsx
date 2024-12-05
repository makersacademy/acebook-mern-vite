import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getPosts } from "../services/posts";
import { PostList } from "./PostList";
import { NewPost } from "./NewPost";
import { UserList } from "./UserList";

function Feed({allowPosting, getMethod, username, photoLoad}) {
    const [posts, setPosts] = useState([]);
    const [reloadPosts, setReloadPosts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = token !== null;
        if (loggedIn) {
            getMethod(token, username)
                .then((data) => {
                    setPosts(data.posts);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, [navigate, reloadPosts, photoLoad]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    const handleReloadPosts = () => {
        setReloadPosts((prevState) => !prevState);
    };

    return (
        <>
        <body className="grid-container-1">
        <div className="grid-container-2">
            {allowPosting ? <NewPost handleReloadPosts={handleReloadPosts} /> : <></>}
            <PostList posts={posts} />
            </div>
            <div>
            <UserList />
            </div>
            </body>
        </>
    );
}

export default Feed;