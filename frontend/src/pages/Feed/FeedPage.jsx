import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Download from "../../components/Download";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost";
import Navbar from "../../components/Navbar";
import CreateComment from "../../components/Comment/createComment";
import { getComments } from "../../services/comments";
import Comment from "../../components/Comment/comment";
import "./Feed.css";
import "./feedpage.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts.reverse());
          // console.log("feedpage, data.posts: ", data.posts[0].author.username);

          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      getComments(localStorage.getItem("token")).then((data) => {
        setComments(data.comments.reverse());
        localStorage.setItem("token", data.token);
      });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <div>
        <Navbar />
        <CreatePost />
      </div>
      <h2 className="posts-title">Posts</h2>
      <div className="posts-container" role="feed">
        {posts.map((post) => (
          <>
            <div className="postAndComment-container">
              <div className="postAndImage">
                <div className="postonly">
                  <Post
                    post={post}
                    key={post._id}
                    username={post.author ? post.author.username : "anonymous"}
                  />{" "}
                </div>
                <div className="blankSpace"></div>
                <div className="feed-image">
                  {" "}
                  <Download imageSize="100px" key={post._id} />
                </div>
              </div>

              <div className="commentsArea">
                <div className="commentsComponent">
                  {comments
                    .filter((comment) => {
                      return comment.postId == post._id;
                    })
                    .map((comment) => (
                      // console.log(comment._id);
                      // console.log(comment.userId.username);
                      // console.log(comment.message);
                      <Comment
                        message={comment.message}
                        key={comment._id}
                        username={comment.userId.username}
                      />
                    ))}
                </div>
                <div className="createCommentComponent">
                  <CreateComment post_id={post._id} />
                </div>
              </div>

              <br />
              <br />
            </div>
          </>
        ))}
      </div>
    </>
  );
};
