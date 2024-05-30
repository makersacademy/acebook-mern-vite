const Post = (props) => {

  return <div key={props.post._id}>
    <h2>{props.post.username} - {props.post.createdAt}</h2>
    <article>{props.post.message}</article>
    </div>
};

export default Post;
