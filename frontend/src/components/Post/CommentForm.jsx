import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CommentForm = ({ post_id }) => {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const token = window.localStorage.getItem("token");

    const handleSubmit = async (event) => {
        console.log(post_id);
        let datetime = new Date().toLocaleString("en-GB");
        let payload = {
        message: comment,
        datetime,
        post_id: post_id,
        };

        const response = await fetch(`${BACKEND_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        });

        if (response.ok) {
        const data = await response.json();
        console.log("Comment created:", data);
        navigate(`/posts/`);
        } else {
        console.error("Error creating comment:", response.statusText);
        }
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className="container">
        {/* <h4>Comments</h4> */}
        <div className="comments">
            <form onSubmit={handleSubmit}>
            <label htmlFor="comment">
                Comment:
                <input type="text" onChange={handleChange} data-testid="comment-input" />
            </label>
            <label>
                <input role="submit-button" type="submit" value="Submit Comment" />  
            </label>
            </form>
        </div>
        </div>
    );
};

export default CommentForm;