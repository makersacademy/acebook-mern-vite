import { useState, useEffect } from "react";
import { changeLike } from "../../services/posts";

const Like = (props) => {
  const [liked, setLiked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [like_val, setLikes] = useState(0);
  const [firstLoad, setFL] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFL(false);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        changeLike(token, props.post._id, like_val)
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [flag]);

  const likePost = () => {
    if (!liked) {
      setLiked(true);
      setLikes(props.post.likes + 1);
      setFlag(true);
    } else {
      setLiked(false);
      setLikes(props.post.likes - 1);
      setFlag(false);
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
