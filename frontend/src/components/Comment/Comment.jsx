import { getComments } from "../../services/posts";
import MakePost from "../Post/MakePost";
import Post from "../Post/Post";
import { useState, useEffect } from "react";

const CommentButton = (props) => {
    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        getComments(token, props.parent)
        .then((data) => {
          setComments(data.posts);
          localStorage.setItem("token", data.token);
        })
    }, []);

    const showCommentBox = () => {
        setAddComment(!addComment);
    };


    console.log(props);

    return (
        <div>
            {!addComment && <button onClick={showCommentBox}>Add Comment</button>}
            {addComment && [ <button onClick={showCommentBox}>Return</button>,
            <MakePost parent={props.parent} value={props.value} update={props.update} />]}
            {comments.map((post) => (
                <Post post={post} key={post._id} value={props.value} update={props.update} />
            ))}
        </div>
    );
};

export default CommentButton;
