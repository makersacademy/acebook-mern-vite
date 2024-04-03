// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else if (response.status === 401) {
    let errorData = await response.json();
    if (errorData.message === "User not found") {
      throw new Error(`Email not registered, please sign up.`);
    } else if (errorData.message === "Password incorrect") {
      throw new Error(`Incorrect password. Please try again.`);
    } else {
      throw new Error(`Authentication error: ${errorData.message}`);
    }
  } else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`
    );
  }
};

export const signup = async (email, password, fullName, profilePicture) => {
  const payload = {
    email: email,
    password: password,
    fullName: fullName,
    profilePicture: profilePicture,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201 //If status is 201, user is successfully logged in
  if (response.status === 201) { 
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`
    );
  }
};

export const getUserProfile = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when getting user profile. Expected 200`
    );
  }
};