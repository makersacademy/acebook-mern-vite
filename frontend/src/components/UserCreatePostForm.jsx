// import { useState } from "react"
// import { createPost } from "../services/posts";


// const UserCreatePostForm = () => {
    
//     const [message, setMessage] = useState("");

//     const handleMessageChange = (event) => setMessage(event.target.value);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         createPost(message);
//         setMessage(""); // clears message field upon submit
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="message">Enter message:</label>
//             <input 
//                 type="text"
//                 name="message"
//                 value={message}
//                 onChange={handleMessageChange} 
//             />

//             <input 
//                 type="submit"
//                 value="Submit" 
//             />
//         </form>
//     )
// };

// export default UserCreatePostForm;