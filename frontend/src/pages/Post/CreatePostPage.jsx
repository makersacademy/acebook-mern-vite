import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts"; 
export const CreatePostPage = () => {
    const [message, setMessage] = useState("");
    // const [user, setUser] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        createPosts(token, message)
        localStorage.setItem("token", token);
        navigate('/posts')
        
      };
        
      const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
       return (
        <>
          <h2>Create a Post</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Create a Post:</label>
            <input
              defaultValue={"hello"}
              id="message"
              type="text"
              value={message}
              onChange={handleMessageChange}
            />
            {/* <label htmlFor="User">User:</label>
            <input
              id="User"
              type="text"
              value={user}
              onChange={handleUserChange}
            /> */}
            <input role="submit-button" id="submit" type="submit" value="Submit" />
          </form>
        </>
      );}
    
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       createPosts(token, message)
  //         .then((data) => {
  //           console.log("redirecting...:");
  //         localStorage.setItem("token", data.token);
  //         })
  //         .then(navigate("/posts"))
            
          
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  // if (!token) {
  //   navigate("/login");
  //   return;
  // }

