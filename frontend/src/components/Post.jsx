import DeletePostId from "./DeletePostButton";
import {deletePostId} from "../services/posts"


function Post(props) {
  const cleanDate = new Date(props.timestamp)
    .toLocaleString("en-gb")
    .slice(0, -3)
    .replaceAll(",", "");
    console.log(props.post._id)
  return (
    <div>
      <h2>{props.user}</h2>
      <h3>{cleanDate}</h3>
      <article key={props._id}>{props.message}</article>
      <DeletePostId 
      post_id = {props.post._id}
      DeletePostId = {deletePostId}
      UpdatePost = {props.updatePost}
      />
    </div>
  );
}

export default Post;
