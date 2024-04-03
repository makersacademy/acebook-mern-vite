
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
  import { ToggleLike } from "./like";


export const Post = (props) => {
  return (
  <div className="container">
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
      <article aria-label="Post Header" key={props.post._id}>{props.post.user} posted at {props.post.createdDate}</article>
      </div>
      <div className="col-1" aria-label="Number of likes">
        <ToggleLike isLiked={false} />
        <article key={props.post._id}>{props.post.likes}</article>
      </div>
    </div>
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 ">
      <article aria-label="Post text" key={props.post._id}>{props.post.message}</article>
      </div>
    </div>
    <hr />
  </div>
  );
};
