const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserProfile = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/profiles/profile`, requestOptions);

  if (response.status !== 200) {
    throw new Error('Unable to fetch user profile');
  }

  const data = await response.json();
  return data;
};

export const getUserPosts = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/profiles/profile/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error('Unable to fetch user posts');
  }

  const data = await response.json();
  return data;
};
