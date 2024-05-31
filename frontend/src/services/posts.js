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
  // data.posts.sort((a,b)=>a.date-b.date);  Should use something similar to this later
  data.posts.reverse();
  return data;
};

export const getComments = async (token, parent_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${parent_id}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
  }

  const data = await response.json();
  // data.posts.sort((a,b)=>a.date-b.date);  Should use something similar to this later
  data.posts.reverse();
  return data;
};

export const makePost = async (token, content, date, parent) => {
  const payload = {
    parent: parent,
    message: content,
    date: date,
    like_array: []
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return;
  } else {
    throw new Error("Unable to create posts");
  }
};

export const changeLike = async (token, post_id, user_id, liked) => {
  const payload = {
    id: post_id,
    user: user_id,
    liked: liked
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 200) {
    return;
  } else {
    throw new Error("Unable to like post");
  }
};