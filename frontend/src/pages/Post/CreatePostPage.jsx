import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts"; 
export const CreatePostPage = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
      if(message == "") {
         alert("message field required")
      }
      else if (message.length < 20)
      {
        alert("message is too short")
      }
      else {
        event.preventDefault();
        createPosts(token, message)
        localStorage.setItem("token", token);
        navigate('/posts')
      }}
        
      const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
       return (
        <>
          <h2>Create a Post</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="message">Create a Post:</label>
            <input
              id="message"
              type="text"
              value={message}
              onChange={handleMessageChange}
            />
            <input role="submit-button" id="submit" type="submit" value="Submit" />
          </form>
        </>
      );}