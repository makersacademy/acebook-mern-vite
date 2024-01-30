// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProfile = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/Users`, requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch user profile. Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
};