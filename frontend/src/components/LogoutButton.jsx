import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id"); // deletes user_id upon logout
    // localStorage.removeItem("email"); // deletes email upon logout

    navigate("/");
  }

  return <button onClick={logOut} className="logout-btn p-2">Log out</button>;
}

export default LogoutButton;
