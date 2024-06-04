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


export const updateUserProfile = async (email, password, fullName, bio, user_id) => {
    const payload = {
        email: email,
        password: password,
        fullName: fullName,
        bio: bio
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/users/${user_id}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to update user profile");
    }
};


