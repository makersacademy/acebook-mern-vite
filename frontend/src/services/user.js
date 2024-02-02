// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (token, username) => {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${username}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    const data = await response.json();
    return data;
};

export const searchUsers = async (searchQuery) => {
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }

    const response = await fetch(`${BACKEND_URL}/users?search=${searchQuery}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }

    const data = await response.json();
    return data;

}

export const uploadImage = async (formData, username) => {
    console.log("inside uploadImage", formData, username)
    const requestOptions = {
        method: "PATCH",
		body: formData,
	};

    let response = await fetch(`${BACKEND_URL}/users/${username}/upload`, requestOptions);

    if (response.status === 200) {
        return response;
	} else {
		throw new Error(
			`Received status ${response.status} when uploading image up. Expected 200`
		);
	}
}


export const editBio = async(bioText, username) => {

    const payload = {
        bio: bioText
    }

    const requestOptions = {
        method: "PATCH",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(payload),
    };

    let response = await fetch(`${BACKEND_URL}/users/${username}/edit-bio`, requestOptions);
    if (response.status === 200) {
		return "bio updated sucessfully";
	} else {
		throw new Error(
			`Received status ${response.status} when changing bio. Expected 200`
		);
	}

}


