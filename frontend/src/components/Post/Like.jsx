import { useState, useEffect } from "react";
import { changeLike } from "../../services/posts";

const Like = (props) => {
  const [liked, setLiked] = useState(false);
  const [like_val, setLikes] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        changeLike(token, props.post._id, like_val)
        .catch((err) => {
        console.error(err);
        });
    }
  }, [liked]);

  const likePost = () => {
    if (!liked) {
      setLikes(1);
      setLiked(true);
    } else {
      setLikes(-1);
      setLiked(false);
    }
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
