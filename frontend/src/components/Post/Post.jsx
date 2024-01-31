const Post = (props) => {
  return (<><br/><article key={props.post._id}>{props.post.message}</article>
  <div>{props.date}</div></>)
};

export default Post;
