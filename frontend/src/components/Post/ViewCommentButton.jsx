export const ViewCommentButton = (props) => {

    const handleClick = (event) => {
        event.preventDefault();
        props.setCommentSection(!props.viewComment)
    }

    return (
        <div>
            <button type="button" onClick={handleClick}>View comments</button>
        </div>
    )
}