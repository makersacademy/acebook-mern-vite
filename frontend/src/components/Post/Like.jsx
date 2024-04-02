import { useState } from "react";

export const ToggleLike = ({ isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div onClick={handleClick} 
    className={liked ? 'liked' : 'not liked'}
    testid="like-button">
    {liked ? <i className="typcn typcn-heart-full-outline"/> : <i className="typcn typcn-heart-outline"/>}
    </div>
  );
};

