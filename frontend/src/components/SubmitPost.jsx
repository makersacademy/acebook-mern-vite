// import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/posts';

export const SubmitPost = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const token = props.token;
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createPost(token, message);
            navigate("/posts");
        } catch (err) {
            console.error(err);
            navigate("/posts");
        }
        console.log(message);
        
    };

    return(
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Content</label>
                <br />
                <textarea name="message"
                onChange={(event) => setMessage(event.target.value)}></textarea>
                <br />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default SubmitPost;