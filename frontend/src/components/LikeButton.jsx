import { useState } from "react";
import { useEffect } from "react";
// import { updatePost } from "../services/posts";

const LikeButton = (props) => {

    const likedByArray = props.post.likes.liked_by || [];
    console.log(`props.post.likes.liked_by = ${props.post.likes.liked_by }`)
    // const likedByArray = props.post.liked_by;
    // set variable to like status depending on whether user id is in liked_by in post model 
    // const liked = props.post.liked_by.includes(props.user._id);

    // const liked = likedByArray.includes(props.user._id); 
    // const liked = likedByArray.includes(JSON.parse(localStorage.getItem('user'))._id);
    // const userId = JSON.parse(localStorage.getItem('user'))._id;
    const userId = localStorage.getItem("user_id")
    // const userId = props.user._id
    // console.log(`id = ${userId}`)
    const likeStatus = likedByArray.includes(userId);
    console.log(`likeStatus = ${likeStatus}`)
    
    const [isLiked, setIsLiked] = useState(likeStatus)
    console.log(`isLiked = ${isLiked}`)

    // useEffect(() => {
    //     setIsLiked(props.post.liked_by.includes(userId));
    // }, [props.post.likes.liked_by, userId]);

    // useEffect(() => {
    //     setIsLiked(likedByArray.includes(userId));
    // }, [likedByArray, userId]);

    useEffect(() => {
        setIsLiked(likeStatus); // Ensure state reflects the latest like status
    }, [likeStatus, userId]);
    
    async function handleToggleLike() {
        // localStorage.setItem("user_id", props.)
        await props.toggleLike(props.post._id, userId); // Only pass post ID
        setIsLiked(!isLiked); 
    }
    
    return (
        <button onClick={handleToggleLike}>
            {isLiked? "Unlike": "Like"} {/* display like or unlike depending on like status */}
        </button>
    )
};

export default LikeButton;