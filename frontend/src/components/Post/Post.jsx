const Post = (props) => {
  return (
  <div className="container">
    <div className="row">
      <col-2>
  <article key={props.post._id}>{props.post.message}</article>
  </col-2>
  </div>
  </div>
  );
};

export default Post;
