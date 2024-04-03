// import React, { useState, useEffect } from "react";
// import { getComments } from "../../services/comments";
// import { likeComment } from "../../services/like";

// const LikeButton = ({ commentId, userId, isLiked, updateComment }) => {
//   const [liked, setLiked] = useState(isLiked);

//   const handleLike = async () => {
//     try {
//       await likeComment(commentId, userId);
//       setLiked(!liked);
//       updateComment(commentId, !liked); // Update the comment after like/unlike
//     } catch (error) {
//       console.error("Error liking comment:", error);
//     }
//   };

//   return (
//     <button className="like-post" onClick={handleLike}>
//       {liked ? "Unlike" : "Like"}
//     </button>
//   );
// };

// const Comment = ({ commentId, userId}) => {
//   const [commentData, setCommentData] = useState([]);

//   const [liked, setLiked] = useState(comment.liked);

//   const updateComment = (commentId, liked) => {
//     // Update the state of the post
//     setLiked(liked);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       getComments(userId, token)  
//         .then((data) => {
//           console.log("Received comment data:", data);
//           setCommentData(data.comments);
//         })
//         .catch((error) => console.error("Error fetching comments:", error));
//     }
//   }, [postId]);

//   return (
//     <div>
//       <h1>Comments</h1>
//       {commentData.map((comment) => (
//         <div className="comment" key={comment._id}>
//           <p className="comment-fullName">{comment.user.fullName}</p>
//           <img
//             className="comment-profilePicture"
//             src={comment.user.profilePicture}
//           />
//           <p className="comment-text">{comment.comment_text}</p>
//           <p className="like-count">{(comment.likedBy).length}</p>
        
//        <LikeButton
//           commentId={comment._id}
//           userId={userId}
//           isLiked={liked}
//           updateComment={updateComment}
//         />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comment;
import React, { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { likeComment } from "../../services/like";

const LikeButton = ({ commentId, userId, isLiked, updateComment }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likeComment(commentId, userId);
      setLiked(!liked);
      updateComment(commentId, !liked); // Update the comment after like/unlike
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <button className="like-post" onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

const Comment = ({ postId, userId }) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getComments(postId, token)  // Fetch comments for the specific post
        .then((data) => {
          console.log("Received comment data:", data);
          setCommentData(data.comments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [postId]);

  const updateComment = (commentId, liked) => {
    // Update the state of the comment
    setCommentData(prevComments =>
      prevComments.map(comment =>
        comment._id === commentId ? { ...comment, liked } : comment
      )
    );
  };

  return (
    <div>
      <h1>Comments</h1>
      {commentData.map((comment) => (
        <div className="comment" key={comment._id}>
          <p className="comment-fullName">{comment.user.fullName}</p>
          <img
            className="comment-profilePicture"
            src={comment.user.profilePicture}
          />
          <p className="comment-text">{comment.comment_text}</p>
          <p className="like-count">{comment.likedBy.length}</p>
          <LikeButton
            commentId={comment._id}
            userId={userId}
            isLiked={comment.liked}
            updateComment={updateComment}
          />
        </div>
      ))}
    </div>
  );
};

export default Comment;

