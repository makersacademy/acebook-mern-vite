// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProfile = async (token) => {

    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch user profile. Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
};

export const setProfilePic = async (email, profilePic, token) => {
    const payload = {
        email: email,
        profilePic: profilePic,
        };

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }

    const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch user profile. Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
    }
    const data = await response.json();
    return data;
};

export const getUsers = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await fetch(`${BACKEND_URL}/profile/users`, requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch users. Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
}

export const addFriend = async (user_id, token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await fetch(`${BACKEND_URL}/profile/${user_id}/friend`, requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch users. Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
}