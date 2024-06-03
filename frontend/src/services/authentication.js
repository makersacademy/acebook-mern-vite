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

  // Check if the response is successful
  if (response.ok) {
    let data = await response.json();
    return { token: data.token, user_id: data.user_id }
  } else {
    // Throw an error if the response status is not OK
    throw new Error(
      `Received status ${response.status} when logging in. Expected 200 OK`
    );
  }
};
export const signup = async ({ firstName, lastName, email, password, DOB, gender }) => {
  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    DOB: DOB,
    gender: gender
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  // Check if the response is successful
  if (response.ok) {
    return;
  } else {
    // Throw an error if the response status is not OK
    throw new Error(
      `Received status ${response.status} when signing up. Expected 200 OK`
    );
  }
};