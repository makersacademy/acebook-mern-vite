// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


// GET ALL USERS
export async function getAllUsers(token) {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
}


// GET CURRENT USER
export async function getUser(token) {

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/me`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }

  const data = await response.json();
  return data; // Can we return less or more specific data here?
}

export async function UpdateUser(updateDetails) {
  const payload = {};
  if (updateDetails.imgURL !== undefined) payload.imgURL = updateDetails.imgURL;
  if (updateDetails.newUsername !== undefined) payload.newUsername = updateDetails.newUsername;
  if (updateDetails.newEmail !== undefined) payload.newEmail = updateDetails.newEmail;
  

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users/me`, requestOptions);

  if (response.status === 202) {
    console.log(payload)
    return response.status;
  } else {
    throw new Error(
      `Received status ${response.status} when updating profile picture. Expected 201`
    );
  }
}
