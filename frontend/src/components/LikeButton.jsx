import { useState } from "react";
// import { updatePost } from "../services/posts";

const LikeButton = (props) => {

    const likedByArray = props.post.likes.liked_by || [];

    const userId = localStorage.getItem("user_id")

    const likeStatus = likedByArray.includes(userId);
    
    const [isLiked, setIsLiked] = useState(likeStatus) //is this initialising to true

    async function handleToggleLike() {
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