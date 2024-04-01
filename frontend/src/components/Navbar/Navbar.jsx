import { NavButton } from "./Buttons";
import { AcebookLogo } from "../AcebookLogo"

export const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-expand-lg darkest-bg-color fixed-top">
          <div className="col-3">
            <i className="lightest-text-color">
              <AcebookLogo height="55px" width="55px" fillCircle="#c3f2da"/>
            </i>
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
              <NavButton linkName="Home" iconId="fa-solid fa-house" />
              <NavButton linkName="Profile" iconId="fa-solid fa-user" />
              <NavButton linkName="Connections" iconId="fa-solid fa-user-group" />
              
            </ul>
          </div>

          <div className="col-3 pe-xsm-0 pe-lg-5">
            <ul className="navbar-nav justify-content-end">
              <NavButton linkName="Log Out" iconId="fa-solid fa-right-from-bracket" />
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

// dropdown code:
// <a className="nav-link dropdown-toggle lightest-text-color" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Profile
//                 </a>
//                 <ul className="dropdown-menu lightest-bg-color">
//                     <li><a className="dropdown-item" href="#">See friends posts!</a></li>
//                     <li><a className="dropdown-item" href="#">See posts!</a></li>
//                     <li><hr className="dropdown-divider"></hr></li>
//                     <li><a className="dropdown-item" href="#">See all posts!</a></li>
//                 </ul>
//                 </li>

// disabled button code:
// <li className="nav-item">
//                 <a className="nav-link disabled" aria-disabled="true">Disabled</a>
//                 </li>

// search for a friend

// <form className="d-flex" role="search">
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                 <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
