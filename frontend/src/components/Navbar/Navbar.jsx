import { NavButton } from "./Links";
import { AcebookLogo } from "../AcebookLogo"
import { useNavigate } from "react-router-dom";
import { FeedPage } from "../../pages/Feed/FeedPage";


export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logout")
  };

  const navigateToPostFeed = (event) => {
    event.preventDefault()
    navigate("/Posts")
  }

  
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-expand-lg darkest-bg-color fixed-top">
          <div className="col-3">
            <AcebookLogo height="55px" width="55px" fillCircle="#c3f2da" />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse col-lg-6 d-lg-none"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-100 justify-content-around"> 
              <NavButton linkName="Feed" iconId="fa-solid fa-newspaper-o" onClick={navigateToPostFeed}/>
              <NavButton linkName="Profile" iconId="fa-solid fa-user"/>
              <NavButton linkName="Connections" iconId="fa-solid fa-user-group"/>
              <div className="d-lg-none">
              <NavButton linkName="Logout" iconId="fa-solid fa-right-from-bracket" onClick={handleLogout} />
              </div>              
            </ul>
          </div>

          <div className="col-3 d-none d-lg-block pe-lg-5">
            <ul className="navbar-nav justify-content-end">
              <NavButton linkName="Logout" iconId="fa-solid fa-right-from-bracket" onClick={handleLogout}/>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

