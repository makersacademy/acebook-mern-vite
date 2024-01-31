// frontend/src/services/posts.js

// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};


export const likePost = async (postId, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify( {postId} ), // Send the post ID to the backend
  };

  const response = await fetch(`${BACKEND_URL}/likes`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to like the post");
  }

  const data = await response.json();
  return data;
};

export const getLikesByPostId = async (postId, token) => {
  // code here
};