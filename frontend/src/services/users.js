const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMyUserDetails(token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
    },
    };

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch profile details");
    }
    
    const data = await response.json();
    return data;
}

export async function getMyUsername(token) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await fetch(`${BACKEND_URL}/users/getMyUsername`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch username details");
    }
    
    const data = await response.json();
    return data;
}

export async function getUserDetails(token, username) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`
    },
    };

    const response = await fetch(`${BACKEND_URL}/users/${username}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch profile details");
    }
    
    const data = await response.json();
    return data;
}


export async function follow(token, username) {
    const payload = {
        username: username
      };

    const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

    const response = await fetch(`${BACKEND_URL}/users/follow`, requestOptions);

    if (response.status !== 201) {
        throw new Error("Unable to follow user");
    }
    
    const data = await response.json();
    return data;
}

export async function unfollow(token, username) {

    const payload = {
        username: username
      };

    const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

    const response = await fetch(`${BACKEND_URL}/users/unfollow`, requestOptions);

    if (response.status !== 201) {
        throw new Error("Unable to unfollow user");
    }
    
    const data = await response.json();
    return data;
}