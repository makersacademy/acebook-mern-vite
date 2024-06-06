const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPostComments = async (token, postId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/comments/posts/${postId}/comments`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
  }

  const data = await response.json();
  return data;
};

export const createComment = async (token, commentData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  };

  const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create comment");
  }

  const data = await response.json();
  return data;
};

export const likeComment = async (token, commentId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/comments/${commentId}/like`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to like comment");
  }

  const data = await response.json();
  return data;
};

export const unlikeComment = async (token, commentId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/comments/${commentId}/unlike`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to unlike comments");
  }

  const data = await response.json();
  return data;
};

