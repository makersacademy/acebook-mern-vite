import React from "react";
import Like from "./Like";

const Comment = (props) => {

    return (
        <article className="comment" key={props.comment._id}>
            <p className="comment-post">{props.comment.post}</p>
            <p className="comment-fullName">{props.comment.fullName}</p>
            <img className="comment-image" src={props.comment.image} alt={props.comment._id} />
            <p className="comment-message">{props.comment.message}</p>
            <p className="comment-date">{props.comment.date}</p>
            <img className="comment-profilePicture" src={props.comment.profilePicture} alt={props.comment._id} />

            <p>
                <Like/>
            </p>


        </article>
    );
    };

    export default Comment;