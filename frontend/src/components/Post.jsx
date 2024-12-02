import { PhotoDisplay } from "./PhotoDisplay";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Post(props) {
  // // Extract and parse the date from props.post
  // const date = props.post.date ? new Date(props.post.date) : null;

  // // Function to handle deleting the post
  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/posts/${props.post._id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       alert(`Post with ID ${props.post._id} has been deleted.`);
  //       if (props.onDelete) {
  //         props.onDelete(props.post._id); // Notify parent component if a callback is provided
  //       }
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Failed to delete post: ${errorData.err || "Unknown error"}`);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting the post:", error);
  //     alert("An error occurred while trying to delete the post.");
  //   }
  // };

  return (
    <article key={props.post._id}>
      {/* <h2>{props.post.title}</h2>
      <p>
        <small>Posted on: {date ? date.toLocaleString("en-GB") : "Unknown Date"}</small>
      </p> */}
      <img src={`${BACKEND_URL}/${props.post.filePath}`} width="50"></img>
      <p>{props.post.firstName} {props.post.lastName}</p>
      <p>{props.post.message}</p>
      {/* <button onClick={handleDelete}>Delete Post</button> */}

    </article>
  );
}

export default Post;
