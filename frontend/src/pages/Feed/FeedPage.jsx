import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, createPost } from "../../services/posts";
// Importing Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faHeart } from '@fortawesome/free-solid-svg-icons';
import "./FeedPage.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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
    const userId = localStorage.getItem('user_id');

    if (!token) {
      navigate('/login');
      return;
    }
    
    const postData = {
      message,
      date: new Date(),
      numOfLikes: 0,
      user_id: userId
    };

    try {
      const newPost = await createPost(token, postData);
      setPosts([newPost, ...posts]);
      setMessage("");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="feed-container">
      <div className="create-message-container">
        <h2 className="feed-title">Create Post</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="📝 Share your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
      <div className="posts-container">
        <h2 className="feed-title">Feed</h2>
        <div className="feed" role="feed">
          {sortedPosts.map((post) => (
            <div className="post" key={post._id}>
              <h3>{post.message}</h3>
              <div className="post-info">
                <span>{new Date(post.date).toLocaleString()}</span>
                <div className="likes">
                  <FontAwesomeIcon icon={faHeart} className="heart" />
                  <span>{post.numOfLikes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
