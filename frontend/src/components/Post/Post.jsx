import { Link } from "react-router-dom";

const Post = (props) => {
  return <>
  <article className="post" key={props.post._id}>{props.post.message}
  <br></br>
  </article>;
  <Link to={`/posts/find/${props.post._id}`}>Post Page</Link>
  
  </>

};

export default Post;
