import { useNavigate } from "react-router-dom";
// import "./FeedPage.css";
const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default LogOut;
