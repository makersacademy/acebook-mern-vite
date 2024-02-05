// frontend/src/components/Comment/CommentsList.jsx

import React, { useEffect, useState } from 'react';
import { submitComment } from "../../services/comments";
import Comment from './Comment';
import { getAllCommentsForAPost } from "../../services/comments"

const CommentsList = (props) => {
    const token = window.localStorage.getItem("token")
    const id = window.localStorage.getItem("id")
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllCommentsForAPost(token, props.postId)
        .then((data) => {
            setComments(data.commentsWithUserDetails)
            console.log(data)
        }
        )
    }, [token, id, comments])

    return (
        <>
            {[...comments].map((comment, index) => (
                    <Comment text={comment.text} key={index} author={comment.full_name} />
            ))}
        </>
    );
};

export default CommentsList;

