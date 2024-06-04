import './comment.css'

const Comment = (props) => {
  return (
    <div className='container'>
      <div className="comment_container">
        <article key={props.key}>{props.message}</article>
        <p className="author">By: {props.username}</p>
      </div>
      <br />
    </div>
  );
};

export default Comment;