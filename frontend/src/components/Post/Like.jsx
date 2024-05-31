import { useState, useEffect } from "react";
import { changeLike } from "../../services/posts";

const Like = (props) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(token);
  const [liked, setLiked] = useState(false);
  console.log(liked)

  const likePost = () => {
    let liked_state = !liked;  // necessary as this code runs faster than setLiked lol see "race condition"
    setLiked(!liked);
    changeLike(token, props.post._id, user_id, liked_state)
    .catch((err) => {console.error(err)});
    props.update(!props.value);
  };

  return (
    <div>
      {!liked && <button onClick={likePost}>Like</button>}
      {liked && <button onClick={likePost}>Unlike</button>}
    </div>
  );
};

export default Like;
