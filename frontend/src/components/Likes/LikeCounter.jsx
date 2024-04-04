
import React from 'react';
import { likeDislikePosts } from "../../services/posts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const LikeDislike = (props) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    

    const handleClickLike = async (event) => {
        const action = true
        event.preventDefault();
        try {
            console.log(props.likes)
            const updatedLikes = props.likes + 1
            props.setLikes(updatedLikes)
            await likeDislikePosts(token, props.postId,action)
            
            
            
            
        } catch (err) {
            console.error("TRACK THIS DOWN",err);
            navigate("/posts");
        }
    }
        const handleClickDislike = async (event) => {
            const action = false
            event.preventDefault();
            try {
                console.log(props.likes)
            const updatedLikes = props.likes - 1
            props.setLikes(updatedLikes)
                await likeDislikePosts(token, props.postId,action)
                
                
            } catch (err) {
                console.error(err);
                navigate("/posts");
            }

            

}



return (
    <>
    
    <button onClick={handleClickLike}>Like</button>
    <button onClick={handleClickDislike}>Dislike</button>
    </>
)
}

export default LikeDislike
