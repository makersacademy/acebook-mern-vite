// frontend/src/components/Comment/CreateNewComment.jsx

import React, { useEffect, useState } from 'react';
import { getUser } from "../../services/user"
import { submitComment } from "../services/comments";
import Comment from './Comment';

const CreateNewComment = () => {
    const [text, setText] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const id = window.localStorage.getItem("id")
    const [comments, setComments] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const timestamp = new Date().toISOString(); // Generate timestamp
        const comment = { author: user.full_name, timestamp, text }; 
        setText(''); // Reset the text field after submitting
    };

    useEffect(() => {
        getUser(token, id)
            .then((data) => {
                setUser(data.user)
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
            })
            .catch((error) => {
                console.error(error)
            })
        submitComment(token, id)
            .then((data) => {
                setComments(data.comments);
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
            })
            .catch((err) => {
                console.err(err);
            });

    }, [token, id, handleSubmit])

    return (
        <>
            <p>Username: {user.full_name}</p>
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit">Submit Comment</button>
            </form>
            {[...comments].map((comment) => (
                    <Comment comment={comment} key={comment._id} token={token} />
            ))}
        </>
    );
};

export default CreateNewComment;

