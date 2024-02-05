const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

export const updateUserInfo = async (username, email, password, profile_picture, token) => {
    const payload = {
        username: username,
        email: email,
        password: password,
        profile_picture: profile_picture,
    };

    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    console.log(JSON.stringify(payload));

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    if (response.status === 200) {
        return;
    } else {
        throw new Error(
            `Received status ${response.status} when updating details. Expected 200`,
            );
        }
}