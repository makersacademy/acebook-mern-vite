import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";

export const CreatePost = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
      // When a user tries to submit a new post we are checking that they are not submitting a blank post or a message that is too short
      if(message == "") {
         alert("message field required")
      }
      else if (message.length < 20)
      {
        alert("message is too short")
      }
      else {
        event.preventDefault(); // Error handling. 
        createPosts(token, message) // passes to backend. Definition in frontend/src/services/posts.js
        localStorage.setItem("token", token); // handing the user a new token
        navigate('/posts') // redirecting user back to posts endpoint to view full posts feed
      }}
        // sets message to users' input
      const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
      // HTML form for creating a post
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