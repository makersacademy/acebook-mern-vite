// frontend/src/components/Comment/CommentsList.jsx

import React, { useEffect, useState } from 'react';
import { getUser } from "../../services/users"
import { submitComment } from "../../services/comments";
import Comment from './Comment';
import { getAllCommentsForAPost } from "../../services/comments"

const CommentsList = (props) => {
    // const [text, setText] = useState('');
    // const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const id = window.localStorage.getItem("id")
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllCommentsForAPost(token, props.postId)
        .then((data) => {
            setComments(data.comment)
            console.log(data)
        }
        )
    }, [token, id])

    return (
        <>
            {[...comments].map((comment) => (
                    <Comment comment={comment} key={comment._id} token={token} />
            ))}
        </>
    );
};

export default CommentsList;

