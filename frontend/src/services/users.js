const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserById = async (token, user_id) => {
    // const payload = {
    //     user_id: user_id
    // };
    console.log("starting getUserById")
    const requestOptions = {
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // user_id: user_id,
        },
        // body: JSON.stringify(payload)
    };

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    console.log(`user_id is:${user_id}`);
    const data = await response.json();
    console.log("data is:", data);
    return data;
};


// WIP