import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";

const Post = (props) => {
    const [like, setLike] = useState(false);

    const handleLikeUnlike = () => {
        setLike(!like);
    };

    return (
        <div>
            <article key={props.post._id}>{props.post.message}</article>
            <p>{props.post.likes.length}</p>
            <LikeButton like={like} setLike={handleLikeUnlike} />
        </div>
    );
};

export default Post;
