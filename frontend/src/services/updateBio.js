const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateMyBio = async (token, bio) => {
  const payload = {
    bio: bio,
    
  };
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),

  };
  // const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);
  // if (response.status !== 200) {
  //   throw new Error("Unable to update profile");
  // }
  // const data = await response.json();
  // console.log("updateProfile.js data:", data);
  // return data;

  try {
    const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to update bio");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unable to update bio");
  }
};
