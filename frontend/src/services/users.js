const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getId = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user id");
  }

  const data = await response.json();
  return data;
}