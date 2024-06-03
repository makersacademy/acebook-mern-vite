import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts, createPost } from "../../services/posts";
import Post from "../../components/Post/Post";
// import Comment from "../../components/Comment/Comment";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const [comment, setComment] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    const postData = {
      message,
      date: new Date(),
    };
  
    try {
      const newPost = await createPost(token, postData);
      setPosts([newPost, ...posts]);
      setMessage("");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  // const handleComment = (postId) => {
  //   // Handle comment logic, e.g., open a modal or navigate to a comment form
  //   console.log(`Comment on post ${postId}`);
  // };

return (
  <>
    <h2>Posts</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Post</button>
      </form> 
    <div className="feed" role="feed">
      {posts.map((post) => (
    <div key={post._id}>
            <Post post={post} />
            </div>
      ))}
    </div>
  </>
)};











{/*             
            {/* Add Comment Button */}
            {/*<button onClick={() => handleComment(post._id)}>Comment</button>*/}
            {/* <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          />
          </div>
      ))}
      </div> */}
    

{/* <div>
      <h2>Posts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}; */}
