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

export const postComment = async (token, commentText, postId, userId) => {
  console.log("front end", commentText)
  const payload = {
		commentText: commentText,
    userId: userId
	};

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, requestOptions)

  if (response.status !== 200) {
    throw new Error("Unable to post comment");
  }

  const data = await response.json();
  return data;
}

