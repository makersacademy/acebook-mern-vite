// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllComments = async (post_id, token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(
        `${BACKEND_URL}/comments/${post_id}`,
        requestOptions
    );

    if (response.status !== 200) {
        throw new Error("Unable to fetch post");
    }

    const data = await response.json();
    return data;
};

export const createComment = async (message, post_id) => {
    let token = window.localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. User must be logged in.");
    }
    if (message === "") {
        return {
            status: 200,
            message: "comments must not be blank",
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

    const response = await fetch(
        `${BACKEND_URL}/comments/${post_id}`,
        requestOptions
    );

    const responseObject = await response.json();

    if (response.status === 201) {
        return responseObject;
    } else {
        throw new Error(
            `Received status ${response.status} when creating comment. Expected 201`
        );
    }
};
