// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getUserById = async (token, user_id) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    const data = await response.json();
    return data;
};


export const updateUserProfile = async (token, email, fullName, bio, user_id) => {
    const payload = {
        email: email,
        fullName: fullName,
        bio: bio
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status === 200) {
        console.log("\n\n\n\n\n\n\n\nresponse is:", response)
        return response;
    } else {
        throw new Error("Unable to update user profile");
    }
};


