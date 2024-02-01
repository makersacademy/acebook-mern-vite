import Comments from "../Comments/comment";

const Post = (props) => {
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const username = props.post.createdBy.username;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;

  return (
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted by: {username}</p>
      <p>Posted on: {formattedDate}</p>
      <Comments
        postId={props.post._id}
        token={token}
        allowComments={allowComments}
      />
    </article>
  );
};

export default Post;
