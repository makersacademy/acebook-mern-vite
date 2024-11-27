import { useState } from "react";
import { CreatePost } from "../services/posts";

const NewPostForm = ({token, setUpdatePost}) => {

  const [postMessage, setPostMessage] = useState("");

  const handleChange = (event) => {
    setPostMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const CreatedPost = await CreatePost(token, postMessage)
    setUpdatePost(CreatedPost)
    setPostMessage("");
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Write your post:
          <input
            type="text"
            value={postMessage}
            onChange={handleChange}
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  )

}

export default NewPostForm;