import Like from "./Like";

const Post = (props) => {

  return (
    <article key={props.post._id}>
      {props.post.message}    Likes: {props.post.likes}
      <Like post={props.post} value={props.value} update={props.update}/>
    </article>
  );
};

export default Post;
