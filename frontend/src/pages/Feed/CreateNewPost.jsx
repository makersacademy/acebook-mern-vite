// CreateNewPost.jsx

import React, { useState } from "react";
import { createPost } from "../../services/createPost";
import "./CreateNewPost.css";

const CreateNewPost = ({ token }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            message: message,
        };

        try {
            const result = await createPost(token, postData);
            // console.log(result);
            // Optionally, you can update the state or perform any other actions after creating the post.
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="feed-container">
            <form className="feed-form" onSubmit={handleSubmit}>
                <label className="feed-label">
                    What's on your mind? 
                </label>
                <div className='input-and-button-container'>
                    <input
                        className="feed-input"
                        name="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="feed-button" type="submit">
                        Share
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewPost;
