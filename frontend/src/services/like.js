const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const likePost = async (postId) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }), // Send both postId and userId in the request body
  };

  const response = await fetch(`${BACKEND_URL}/posts/like`, requestOptions);

  if (!response.ok) {
    throw new Error("Failed to like/unlike post");
  }
};

export const likeComment = async (commentId) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }), // Send both postId and userId in the request body
  };

  const response = await fetch(`${BACKEND_URL}/comments/like`, requestOptions);

  if (!response.ok) {
    throw new Error("Failed to like/unlike post");
  }
};
