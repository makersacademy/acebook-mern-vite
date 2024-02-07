import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { deleteComment } from "../../services/comments";

const DeleteCommentButton = (props) => {
    const navigate = useNavigate();
    const commentId = props.comment._id;
    const postId = props.comment.post_id
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const confirmDelete = () => {
        return confirm("Are you sure you want to delete?");
    };

    const handleDelete = () => {
        let result = confirmDelete();
        if (result) {
            deleteComment(commentId, token)
                .then((data) => {
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                    console.log("Item Deleted");
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log("Item Deleted");
            navigate(0);
        } else {
            console.log("Item Kept");
        }
        return
    };

    // When clicking delete:
    // Deletes from the database
    // Redirects back to the post page
    // Produces a message (are you sure)

    return (
        <>
            <button onClick={handleDelete} className="deleteComment" name="delete">
                Delete
            </button>
        </>
    );
};

export default DeleteCommentButton;
