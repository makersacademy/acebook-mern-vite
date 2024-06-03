// Create comment object with this component...
const Comment = (props) => {
    return <article key={props.comment._id}>{props.comment.message}</article>;
    };
    
    export default Comment;

