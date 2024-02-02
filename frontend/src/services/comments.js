// frontend/src/services/comments.js

// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const submitComment = async (commentId, token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({ commentId }),
        };
    
    
        const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);
    
        if (response.status !== 200) {
        throw new Error("Unable to comment on post!");
        }
    
        const data = await response.json();
        return data;
};