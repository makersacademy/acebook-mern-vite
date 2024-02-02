
const Post = (props) => {
  //console.log(props.post.message)

  return <>
  <article className="post" key={props.post._id}>{props.post.message}
  <br></br>
  </article>
  </>

};

export default Post;
