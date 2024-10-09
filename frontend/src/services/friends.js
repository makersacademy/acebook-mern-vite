// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getFriends(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/friends`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch friends");
  }

  const data = await response.json();
  return data;
}

export async function addFriend(token, userId) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newUrl = new URL(`${BACKEND_URL}/friends?userId=${userId}`);
  const response = await fetch(newUrl.toString(), requestOptions);
  
  const data = await response.json()
  return data;
}

export async function getNonFriendUsers(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/friends/non`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
}
