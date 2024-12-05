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

export async function getPostsForUser(token, username) {
  console.log('Here is a test');
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('Help');
  const response = await fetch(`${BACKEND_URL}/posts/${username}`, requestOptions);
  console.log('HELP@2222')

  if (response.status !== 200) {
    console.log(response.status);
    throw new Error("Unable to fetch posts hdliusdbfvlkhlkdjsahfvliuadsfhvlsdkfjhvasdfvhbhvsd;oiuvhsdf;obiuhsbfio;hsebfio;h");
  }

  const data = await response.json();
  return data;
}

export async function createPost(token, postContent) {
  const payload = {
    message: postContent,
    likeCount: 0
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
    const data = await response.json();
    console.log("RETURN DATA HERE PLZ LOOK!!!!", data)
    return data;
  } else{
    throw new Error(
      `Received status ${response.status} when attempting to create post. Expected 201`
    )
  }
}

export async function editPost(token, postContent, postId) {
  const payload = {
    message: postContent,
    postId: postId
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/posts/edit`, requestOptions);
  // check this is right ^

  if (response.status === 201) {
    return;
  } else{
    throw new Error(
      `Received status ${response.status} when attempting to edit post. Expected 201`
    )
  }
}

export async function likePost (token, post_id) {
  const payload = {
    post_id: post_id
  }
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  }
  const response = await fetch(`${BACKEND_URL}/posts/like`, requestOptions)
  if (response.status === 200){
    const data = await response.json();
    // console.log(`Successfully liked post? got likeCount: ${JSON.stringify(data)}`)
    // console.log(data.likeCount)
    return data.likeCount;
  } else{
    throw new Error(
      `Received status ${response.status} when attempting to like post. Expected 200`
    )
  }

}

export const deletePost = async (postId, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: You are not authorized to delete this post.");
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete post: ${errorData.err || "Unknown error"}`);
      }
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};