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

export const createNewPost = async (message) => {
    let token = window.localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. User must be logged in.");
    }
    if (message === "") {
        return {
            status: 200,
            message: "posts must not be blank",
        };
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
    };

    const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
    const responseObject = await response.json();

    if (response.status === 201) {
        return responseObject;
    } else {
        throw new Error(
            `Received status ${response.status} when creating post. Expected 200`
        );
    }
};
