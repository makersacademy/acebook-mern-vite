import "./comment.css";

const Comment = (props) => {
  return (
    <div>
      <div className="commentAndAuthorContainer">
        <article className="commentContent" key={props.key}>
          {props.message}
        </article>
        <p className="commentAuthor">By: {props.username}</p>
      </div>
      <hr />
    </div>
  );
};

export default Comment;
