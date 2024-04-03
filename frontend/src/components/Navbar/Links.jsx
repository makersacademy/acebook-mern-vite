import { useNavigate, NavLink } from "react-router-dom";


export const NavButton = (props) => {
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logout")
  };
  

  return (
    <li className="nav-item lightest-text-color" >
      <NavLink onClick={handleLogout}>
        <div className="d-flex flex-column align-items-center">
          <i className={`fa ${props.iconId} fs-4 pt-2 lightest-text-color`}></i>
          <span className="lightest-text-color pt-0">{props.linkName}</span>
        </div>
      </NavLink>
    </li>


  );
};
