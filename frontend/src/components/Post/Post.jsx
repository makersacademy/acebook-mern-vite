import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";

const Post = (props) => {
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(props.post.likes.length);

    const handleLikeUnlike = () => {
        setLike(!like);
        setLikes(props.post.likes.length);
        console.log("I'm being clicked too");
    };
    // const checkLikes = (props) => {
    //     setLikes(props.post.likes.length);
    // };

    return (
        <div>
            <article key={props.post._id}>{props.post.message}</article>
            <p>{likes}</p>
            <LikeButton
                postID={props.post._id}
                like={like}
                handleLikeUnlike={handleLikeUnlike}
                clicked={props.clicked}
            />
        </div>
    );
};

export default Post;
