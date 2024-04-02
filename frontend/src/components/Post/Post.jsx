

const Post = (props) => {
  const date = new Date(props.post.createdDate);

  const formattedDate = date.toLocaleString('en-UK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true 
  });
  return(<div>
    <article key={props.post._id}>{props.post.message}</article>
    <p>posted: {formattedDate}</p>
    <p>likes: {props.post.likes}</p>
    </div> )}

export default Post;
