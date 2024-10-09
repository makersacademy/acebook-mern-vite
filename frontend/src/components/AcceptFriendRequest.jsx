import { acceptFriendRequest } from "../services/friends";

export function AcceptFriendRequest(props) {
  const handleClick = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // getting the token from browser storage

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        const data = await acceptFriendRequest(token, props.userId);
        localStorage.setItem("token", data.token);
        props.setRequest("")
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
    <button onClick={handleClick}>Accept</button>
    </>
  )
}