import "./post.css";
const Post = (props) => {
  return (
    <div className="container">
      <div className="post_container">
        <article key={props.post._id}>{props.post.message}</article>
        <p className="postAuthor">By: {props.username}</p>
      </div>
      <br />
    </div>
  );
};

export default Post;
