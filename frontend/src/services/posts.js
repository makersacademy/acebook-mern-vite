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

export const createNewPost = async (token, postData) => {
  const formDataJson = {};
  for (const [key, value] of postData.entries()) {
    formDataJson[key] = value;
  }
  // formDataJson object is needed to convert the FormData received from the
  // createNewPost child component in the CreatePost parent component
  // into a JSON object so it can be inputted into the database

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataJson),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to create post");
  }
};
