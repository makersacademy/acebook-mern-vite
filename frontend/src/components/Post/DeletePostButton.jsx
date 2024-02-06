import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../../services/posts";

const DeletePostButton = () => {
    const navigate = useNavigate();
    const handle = useParams();
    const postId = handle.id;
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const confirmDelete = () => {
        return confirm("Are you sure you want to delete?");
    };

    const handleDelete = () => {
        let result = confirmDelete();
        if (result) {
            deletePost(postId, token)
                .then((data) => {
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                    console.log("Item Deleted");
                    navigate("/posts");
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log("Item Deleted");
            navigate("/posts");
        } else {
            console.log("Item Kept");
        }
        return;
    };

    // When clicking delete:
    // Deletes from the database
    // Redirects back to the post page
    // Produces a message (are you sure)

    return (
        <>
            <button onClick={handleDelete} className="deletePost" name="delete">
                Delete
            </button>
        </>
    );
};

export default DeletePostButton;
