import './Post.css';
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
    const checkLikes = (props) => {
        setLikes(props.post.likes.length);
    };

return (

<div key={props.post._id} className="post-article">

    <article>
      {props.postedBy && 
      <div className="user-info" >
        <img src={props.postedBy.image} alt="user image"></img>
        <h4>{props.postedBy.username}</h4>
      </div>
        }
        <div className="date-time">
          {new Date(props.post.createdAt).toLocaleString('en-UK')}
        </div>
      {props.post.message}<br></br>
      <h5>likes: {props.post.likes.length}</h5>
	  <LikeButton
            postID={props.post._id}
            like={like}
            handleLikeUnlike={handleLikeUnlike}
            clicked={props.clicked}
			toggleStateChange={props.toggleStateChange}
        />
    </article>

        
  </div>
  )
};

export default Post;
