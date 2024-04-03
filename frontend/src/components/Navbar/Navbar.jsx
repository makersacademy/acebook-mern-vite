import { NavButton } from "./Links";
import { AcebookLogo } from "../AcebookLogo"


export const Navbar = () => {

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
              <NavButton linkName="Feed" iconId="fa-solid fa-newspaper-o"/>
              <NavButton linkName="Profile" iconId="fa-solid fa-user"/>
              <NavButton linkName="Connections" iconId="fa-solid fa-user-group"/>
              
            </ul>
          </div>

          <div className="col-3 pe-xsm-0 pe-lg-5">
            <ul className="navbar-nav justify-content-end">
              <NavButton linkName="Logout" iconId="fa-solid fa-right-from-bracket"/>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

