// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getPosts = async (token) => {
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

const getComments = async (postId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BACKEND_URL}/posts/${postId}/comment`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

const getProfilePosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BACKEND_URL}/posts/profile`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }
  const data = await response.json();
  return data;
};


const createPosts = async (token, messageField, imageField=false) => {
  let payload = ''
  if (imageField) {
    payload = {
      message: messageField,
      image: imageField
    }
  }
  else {
    payload = {
      message: messageField,
    }
  }

  console.log(payload)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 201) {
    throw new Error("You're not a politician, please stop with the empty words.");
  }
  const data = await response.json();
  return data;
}

const createComment = async (token, postId, messageField) => {
  const payload = {
      message: messageField,
    }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${BACKEND_URL}/posts/${postId}/comment`, requestOptions);

  if (response.status !== 201) {
    throw new Error("You're not a politician, please stop with the empty words.");
  }
  const data = await response.json();
  return data;
}

const likeDislikePosts = async (token, postId, action) => {
  const payload = {
    _id: postId,  
    action: action
  }
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  

  let response = await fetch(`${BACKEND_URL}/posts/like`, requestOptions);

  if (response.status !== 201) {
    throw new Error("You're not a politician, please stop with the empty words.PATCH");
  }

  const data = await response.json();
  return data;
}

export { getPosts, createPosts, getProfilePosts, getComments, createComment, likeDislikePosts  };
