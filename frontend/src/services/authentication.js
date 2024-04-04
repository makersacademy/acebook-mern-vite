// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export const login = async (email, password) => {
  const payload = {
    email: email,
    password: password
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
  } else {
    const errorMessage = await response.json()
    throw new Error(
      `${errorMessage.message}`
    );
  }
};

export const signup = async (firstName, lastName, bio, email, password, image) => {

  let payload = {}

  if (image != "") {
    payload = {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      email: email,
      password: password,
      image: image
    };
  }
  else {
    payload = {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      email: email,
      password: password,
      image: 'profiles/ieofjhaisofjaios'
    };
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);
  

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return;
  } else {
    const errorMessage = await response.json()
    throw new Error(
      `${errorMessage.message}`
    );
  }
};
