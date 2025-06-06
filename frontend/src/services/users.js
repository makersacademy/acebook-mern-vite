const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUsers(token, query) {
  console.log("It tried to fetch users")
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/users/search?q=${encodeURIComponent(query)}`,
      requestOptions
    )
  console.log("This is the response: ", response)

  if (!response.ok) {
    throw new Error("Unable to fetch users")
  }

  const data = await response.json()
  return data
}
