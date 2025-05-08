import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return <Link className="nav-link" onClick={logOut}>Log out</Link>;
}

export default LogoutButton;
