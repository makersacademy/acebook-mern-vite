const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createProfile = async (token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);
  if (response.status !== 201) {
    throw new Error("Unable to fetch profile");
  }
  const data = await response.json();
  console.log("createProfile.js data:", data);
  return data;
};
