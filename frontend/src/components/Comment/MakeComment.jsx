import MakePost from "../Post/MakePost";
import { useState, useEffect } from "react";

const CommentButton = (props) => {
    const [addComment, setAddComment] = useState(false);

    const showCommentBox = () => {
        setAddComment(!addComment);
    };

    return (
        <div id="comment-button">
            {!addComment && <button onClick={showCommentBox}>Add Comment</button>}
            {addComment && [ <button onClick={showCommentBox}>Return</button>,
            <MakePost parent={props.parent} value={props.value} update={props.update} />]}
        </div>
    );
};

export default CommentButton;
