// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPostComments = async (token, postId) => {
const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/comments/posts/${postId}/comments`, requestOptions);

if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
}

const data = await response.json();
return data;
};


export const createComment = async (token, commententData) => {
const requestOptions = {
    method: "POST",
    headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    },
    body: JSON.stringify(commententData),
};

const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

if (response.status !== 201) {
    throw new Error("Unable to create post");
}

const data = await response.json();
return data;
};