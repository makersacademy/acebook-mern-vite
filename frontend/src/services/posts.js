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

export const createPosts = async (token, message) => {
  const payload = {
    message: message,
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }
    const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
   
    if (response.status === 201) {
      let data = await response.json();
      return data.token;
    } else {
      throw new Error(
        `Received status ${response.status} when creating a post. Expected 201`
      );
    }

  };

