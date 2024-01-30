// CreateNewPost.jsx

import React, { useState } from "react";
import { createPost } from "../../services/createPost";

const CreateNewPost = ({ token }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            message: message,
        };

        try {
            const result = await createPost(token, postData);
            console.log(result);
            // Optionally, you can update the state or perform any other actions after creating the post.
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h2>Create a new post</h2>
            <div className="feed" role="feed">
                <form onSubmit={handleSubmit}>
                    <label>
                        What's on your mind?
                        <input
                            name="message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit post</button>
                </form>
            </div>
        </>
    );
};

export default CreateNewPost;
