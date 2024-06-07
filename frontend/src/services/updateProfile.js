const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// /**
//  * Updates user's profile information including bio and profile picture.
//  * @param {string} token - Authorization token.
//  * @param {Object} updates - Object containing the bio and/or profilePictureURL to update.
//  */
export const updateProfile = async (token, updates) => {
  const { bio, profilePictureURL } = updates;

  const payload = {};
  if (bio !== undefined) payload.bio = bio;
  if (profilePictureURL !== undefined)
    payload.profilePictureURL = profilePictureURL;

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
      throw new Error(data.message || "Unable to update profile");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unable to update profile");
  }
};
