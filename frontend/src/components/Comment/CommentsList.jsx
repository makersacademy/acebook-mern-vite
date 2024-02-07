// frontend/src/components/Comment/CommentsList.jsx

import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { getAllCommentsForAPost } from "../../services/comments"
import CreateNewComment from './CreateNewComment';

const CommentsList = (props) => {
    const token = window.localStorage.getItem("token")
    const id = window.localStorage.getItem("id")
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(false)

    useEffect(() => {
        getAllCommentsForAPost(token, props.postId)
        .then((data) => {
            setComments(data.comments)
            setNewComment(false)
        }
        )
    }, [token, id, newComment])

    return (
        <>
            {[...comments].map((comment) => (
                    <Comment key={comment._id} comment_data={comment} setNewComment={setNewComment} token={token}/>
            ))}
            <CreateNewComment 
            post_id={props.postId} setNewComment={setNewComment}/>
        </>
    );
};

export default CommentsList;

