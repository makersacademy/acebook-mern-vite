import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getPosts } from "../services/posts";
// import { login } from "../../services/authentication";
import { createPost } from "../services/createPost";
import "./CreatePost.css";

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
    console.log(newPost);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      createPost(newPost, token).then((data) => {
        console.log("newPost value: ", newPost);
        console.log("data value: ", data);
        location.reload();
        localStorage.setItem("token", data.token);
      });

      console.log("updating post...:");
      //   navigate("/post");
    } catch (err) {
      console.error(err);
      //   navigate("/signup");
    }
  };

  return (
    <div id="createPostContainer">
      <h2 id="newPostTitle">Write a post...</h2>
      <form id="newPostForm" onSubmit={handleSubmit}>
        <textarea
          id="newpost"
          type="text"
          value={newPost}
          onChange={handlePostChange}
        />
        <br />
        <input
          role="submit-button"
          id="submitPost"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
};

export default CreatePost;
