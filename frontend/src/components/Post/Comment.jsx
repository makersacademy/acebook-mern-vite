

const Comments = (props) => {
    return (
        <>
    <br/>
    <article key={props.comment._id}>{props.comment.message}</article>
    <h6><div>{props.date}</div></h6>
    </>
    );
};

export default Comments;
