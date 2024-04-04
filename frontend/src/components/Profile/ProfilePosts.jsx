import { useState, useEffect } from 'react';
import { getUserPosts } from "../../services/posts";
import { Post } from "../Post/Post"


export const ProfilePosts = () => {
    const [profilePosts, setProfilePosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserPosts(token)
                .then((data) => {
                    setProfilePosts(data.posts);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error); 
                });
        }
    }, []);

    return (
        <div className="container">
            <div className="feed" role="feed">
                <p> This is where the info is supposed to be
                {profilePosts.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
                </p>
            </div>
        </div>
    );
};


