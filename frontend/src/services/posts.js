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

// CREATE POST ("POST")
export async function createPost(message) {
  // payload object is created, which contains the message data that will be sent to the backend. The key is message, and the value is the argument passed to the function.
  // organizes the data that needs to be sent to the backend. The backend typically expects data in a specific format, and payload ensures that.
  // const userId = localStorage.user_id;
  const user = JSON.parse(localStorage.getItem("user")) // gets user object from localStorage as object
  const payload = {
    message: message,
    user: user.username,
    userPic : user.imgURL // added current users imgURL to payload
  }
  
  const requestOptions = {
    method: "POST",
    // headers includes an Authorization header (using the token from localStorage) and Content-Type: "application/json"
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // The content type is essential because it tells the server that the request body contains JSON.
      "Content-Type": "application/json"
    },
    // JSON.stringify(payload) converts the JavaScript object to JSON, the format most APIs expect in a POST request body.
    body: JSON.stringify(payload)
  };

  // Sends a POST request to the /posts endpoint using the requestOptions. The server will create a new post with the data in payload.
  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create posts");
  }

  // Parses the server’s JSON response and returns the parsed data.
  const data = await response.json();
  return data;
}

// UPDATE POST
export async function updatePost(postId) {

  const payload = {
    post: { _id: postId },
    // post_id: postId,
    // author: userId
  }
  // console.log(`65 updatePost postId = ${postId}`)
  // console.log(`70 updatePost payload in JSON = ${JSON.stringify(payload)}`)

  const requestOptions = {
    method: "PATCH",
    // headers includes an Authorization header (using the token from localStorage) and Content-Type: "application/json"
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // The content type is essential because it tells the server that the request body contains JSON.
      "Content-Type": "application/json"
    },
    // JSON.stringify(payload) converts the JavaScript object to JSON, the format most APIs expect in a POST request body.
    body: JSON.stringify(payload)
  };
  // Sends an UPDATE request to the /posts endpoint using the requestOptions.
  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, requestOptions);

  // console.log(`86 updatePost response status = ${response.status}`)

  if (response.status !== 200) {
    throw new Error("Unable to change like status of post");
  }
  // Parses the server’s JSON response and returns the parsed data.
  const data = await response.json();
  
  // console.log(`92 updatePost data = ${data.post}`)
  return data;
}