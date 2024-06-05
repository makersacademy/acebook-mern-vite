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

export const createPost = async (token, postData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create post");
  }

  const data = await response.json();
  return data;
};

export const likePost = async (token, postId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/like`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to like post");
  }

  const data = await response.json();
  return data;
};

export const unlikePost = async (token, postId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/unlike`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to unlike post");
  }

  const data = await response.json();
  return data;
};
