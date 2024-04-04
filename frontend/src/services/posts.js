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
  // payload contains the data we want to send from frontend to backend. In this case the users post
  const payload = {
    message: message,
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // lets backend know data is in JSON format
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }
    const response = await fetch(`${BACKEND_URL}/posts`, requestOptions); // Users post request sent to /api/routes/posts.js and triggers router.post function
   
    if (response.status === 201) {
      let data = await response.json();
      return data.token;
    } else {
      throw new Error(
        `Received status ${response.status} when creating a post. Expected 201`
      );
    }

  };


  // gets the posts specific to one user in order to load this info onto their profile page.

export const getUserPosts = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/posts/getUserPosts`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch your posts");
    }
  
    const data = await response.json();
    return data;
  };

