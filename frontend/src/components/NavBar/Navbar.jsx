import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const logout = () => {
    return localStorage.removeItem("token");
  };

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="menu_container">
        <Link to="/posts">
          <h1>Home</h1>
        </Link>
        <Link>
          <h1>My profile</h1>
        </Link>
        <Link to="/login" onClick={handleClick}>
          <h1>Logout</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
