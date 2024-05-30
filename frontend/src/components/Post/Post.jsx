const Post = (props) => {
  return <article key={props.post._id}>{props.post.message}</article>;
  // return <article key={props.post._id} dangerouslySetInnerHTML={{ __html: props.post.message }}></article>;

};

export default Post;
