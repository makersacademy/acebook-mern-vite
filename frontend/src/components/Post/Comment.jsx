

const Comments = (props) => {
    return (
        <>
    <br/>
    <article key={props.comment._id}>{props.comment.message}</article>
    {/* <div>{props.date}</div> */}
    </>
    );
};

export default Comments;
