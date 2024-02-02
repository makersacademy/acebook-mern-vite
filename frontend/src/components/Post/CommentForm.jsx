import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CommentForm = ({ postId }) => {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const token = window.localStorage.getItem("token");

    const handleSubmit = async (event) => {
        event.preventDefault();

        let datetime = new Date().toLocaleString("en-GB");
        let payload = {
        message: comment,
        datetime,
        post_id: postId,
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
        navigate(`/posts/${postId}`);
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
                <input type="submit" value="Submit Comment" />
            </label>
            </form>
        </div>
        </div>
    );
};

export default CommentForm;