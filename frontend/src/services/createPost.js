// frontend/src/services/createPost.js

// use same methods as in posts.js in this same folder
// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createPost = async (token, postData) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };

    const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

    if (response.status !== 201) {
        throw new Error("Unable to create post");
    }

    const data = await response.json();
    return data;
};
