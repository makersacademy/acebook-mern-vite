// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPosts(token) {
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
}

export async function createPost(token, postContent) {
  const payload = {
    message: postContent
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

  if (response.status === 201) {
    console.log('Success?')
    return;
  } else{
    throw new Error(
      `Received status ${response.status} when attempting to create post. Expected 201`
    )
  }
}