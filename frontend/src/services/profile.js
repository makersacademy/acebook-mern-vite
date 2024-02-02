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

export const setProfile = async ( username, email, profilePic, token) => {
    const payload = {
        username: username,
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