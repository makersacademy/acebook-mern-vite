export const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <nav className="navbar navbar-expand-lg darkest-bg-color">
          {/* TODO: Replace bavbar brand with logo */}
          <div className="col-2">
            <a className="navbar-brand lightest-text-color" href="#">
              Navbar
            </a>
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
            className="collapse navbar-collapse row"
            id="navbarSupportedContent"
          >
            
              <div className="col-8  mx-auto">
            <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link lightest-text-color" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link lightest-text-color" href="#">
                    Connections
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link lightest-text-color" href="#">
                    Profile
                  </a>
                </li>
                </ul>
              </div>

              <div className="col-2">
              <ul>
                <li className="nav-item">
                  <a className="nav-link lightest-text-color" href="#">Logout
                  </a>
                </li>
            </ul>
              </div>
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
