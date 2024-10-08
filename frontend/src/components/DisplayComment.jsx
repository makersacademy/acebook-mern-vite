
function DisplayComment(props) {

    return (
        <>
        <p>{props.comment_text}</p>
        <p>User: {props.user}</p>
        <p>Time: {props.created_at}</p>
        </>
    )

}

export default DisplayComment;