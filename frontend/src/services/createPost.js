// import User from "../../../api/models/user";

// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createPost = async (message, token, postby) => {
  postby = localStorage.getItem("postby");
  const payload = {
    message: message,
    author: postby,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  console.log("this is data", data);
  // console.log("createPost.js/author: ", data.post.author);
  localStorage.setItem("postby", data.post.author);
  return data;
};
