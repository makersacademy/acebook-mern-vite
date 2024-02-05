// frontend/src/components/Comment/CreateNewComment.jsx

import React, { useEffect, useState } from 'react';
import { getUser } from "../../services/users"
import { submitComment } from "../../services/comments";
import Comment from './Comment';
import { getAllCommentsForAPost } from "../../services/comments"

const CreateNewComment = (props) => {
    const [text, setText] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const id = window.localStorage.getItem("id")

    const handleSubmit = (e) => {
        e.preventDefault();
        // const timestamp = new Date().toISOString(); // Generate timestamp
        // author: user.full_name, 
        const comment = {userId: id, commentText: text, postId: props.post_id }; 
        setText(''); // Reset the text field after submitting
        submitComment(comment, token)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error(error);
            });
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
    }, [token, id])

    return (
        <>
            <p>Username: {user.full_name}</p>
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit">Submit Comment!</button>
            </form>
        </>
    );
};

export default CreateNewComment;

