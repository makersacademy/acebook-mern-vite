// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMessages(token, conversationId) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  const newUrl = new URL(`${BACKEND_URL}/messages`);
  newUrl.searchParams.append("conversationId", `${conversationId}`);
  console.log(newUrl);

  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch conversations");
  }

  const data = await response.json();
  console.log("messages", data);
  return data;
}
