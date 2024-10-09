import { useState } from "react";
import { deletePost } from "../services/posts";
import { getPosts } from "../services/posts";

function DeletePostButton(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const loggedIn = token !== null;
    if (loggedIn) {
      setIsDeleting(true);
      try {
        await deletePost(token, props.postId);

        // Fetch the updated list of posts and update them
        const postData = await getPosts(token);
        props.setPosts(postData.posts);

        setIsDeleting(false);
      } catch (err) {
        console.log("Error deleting post:", err);
        setIsDeleting(false);
      }
    }
  };

  // Only render the delete button if the logged-in user is the creator of the post
  const isCreator = props.userId === props.postCreatorId;

  if (!isCreator) {
    return null;
  }

  return (
    <div className="DeleteContainer">
      <form onSubmit={handleDelete}>
        <button className="DeleteButton" disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Post"}
        </button>
      </form>
    </div>
  );
}

export default DeletePostButton;

