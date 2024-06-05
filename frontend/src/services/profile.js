// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getMyProfile = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch profile");
  }

  const data = await response.json();
  console.log("from services/profile.js, data: ", data);
  return data;
};
