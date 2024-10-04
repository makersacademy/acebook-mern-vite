function Post(props) {
  return <article key={props.post._id}>{props.post.message}<br></br>
  Posted By: {props.post.user}</article>;
}

export default Post;
