const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getUserInfo = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("token, ", token);
  const response = await fetch(`${BACKEND_URL}/profiles`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }
  const data = await response.json();
  return data;
};

export const updateUserInfo = async  (data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${BACKEND_URL}/profiles`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to update user");
  }

  const updatedUser = await response.json();
  return updatedUser;
};

export const deleteUser = async () => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BACKEND_URL}/profiles`, requestOptions);

  if (response.status !== 204) {
    throw new Error("Unable to delete user");
  }
};