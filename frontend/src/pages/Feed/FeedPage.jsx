import './FeedPage.css'
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getAllPosts, getPostsByUser } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import LikePostButton from "../../components/Post/LikePost";
import FilterByUser from "../../components/Post/FilterByUser";

export const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [filterValue, setFilterValue] = useState("All");

    const navigate = useNavigate();
    console.log("PARENT RENDERED")
    const setNewFilterValue = (newFilterValue) => {
        setFilterValue(newFilterValue)
    }
    console.log("Value from feedpage (not in use-effect)")
    console.log(filterValue)

    useEffect(() => {
        if (token) {
            if (filterValue === "All") {
                console.log("Value Feedpage")
                console.log(filterValue)
                getAllPosts(token)
                .then((data) => {
                    setPosts(data.posts);
                    //console.log(data)
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
            } else {
                console.log("Not All")
                console.log(filterValue)
                getPostsByUser(filterValue, token)
                .then((data) => {
                    setPosts(data.posts);
                    //console.log(data)
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
            }
            
        } else {
            navigate("/login");
        }
    }, [filterValue]);

    if (!token) {
        return;
    }

    return (
        <>
            <h2>Posts</h2>
            <div className="newPost">
                <CreatePost />
            </div>
            <hr></hr>
            <div className="feed" role="feed">
                <FilterByUser posts={posts} setNewFilterValue = {setNewFilterValue}/>
                {posts.map((post) => (
                    <div key={post._id} id="post">
                        <Post post={post} key={post._id} showUserAndPic={true}/>
                        <LikePostButton post={post}/>
                        <Link to={`/posts/find/${post._id}`}>Post Page</Link>
                        <hr></hr>
                    </div>
                ))}
            </div>

        </>
    );
};
