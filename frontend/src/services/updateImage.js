const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateMyImage = async (token, profilePictureURL) => {
  const payload = {
    profilePictureURL: profilePictureURL,
    
  };
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),

  };

  try {
    const response = await fetch(`${BACKEND_URL}/profile`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to update image");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unable to update image");
  }
};

