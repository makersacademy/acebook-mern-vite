import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";
import profilePicture from "../../assets/profile-picture-square.jpg"

export const CreatePost = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
      window.location.reload() // redirecting user back to posts endpoint to view full posts feed
      setMessage("") // Sets the message back to a blank value when submitted
    }}
      // sets message to users' input
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
    // HTML form for creating a post
    return (
      <>

    

<div className="container">
      <div className="row justify-content-center">
        <div className="col-1 d-none d-md-block">
          <img
            className="pt-5 rounded-circle"
            src={profilePicture}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
            style={{
              maxWidth: "150px", // Set maximum width to fill its container
              maxHeight: "150px", // Set maximum height
              height: "auto" // Ensure aspect ratio is maintained
            }}
          />
        </div>
        <div className="col-1"></div>

        <div className="col-6 align-items-center border border-3">
          <form onSubmit={handleSubmit} className="p-2">
            <div className="row">
              <label htmlFor="message"></label>
              <textarea
                className="post-entry-box border"
                id="message"
                type="text"
                value={message}
                placeholder="Got something to say? Enter here!"
                onChange={handleMessageChange}
              />
            </div>
            <div className="row">
              <input className="btn custom-button mb-0 darkest-bg-color" role="submit-button" id="submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}