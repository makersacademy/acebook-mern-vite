const Post = (props) => {
  return (
    <article key={props.post._id}>
      <p>Username: {props.post.username}</p>
      <p>Liked Counter: {props.post.likeCounter}</p>
      <p>Message: {props.post.message}</p>
    </article>
  );
};

export default Post;
