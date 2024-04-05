import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home vh-100 vw-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <img src="../../src/assets/Neonbook_logo.png" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
              <img src="../../src/assets/Neonbook_full_logo.png" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            {/* Login */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Log In</h5>
                <p className="card-text">Log into your existing Neonbook account</p>
                <Link to="/login"  className="btn btn-primary btn-block neon-button mt-1">Log In</Link>
              </div>
            {/* Sign Up */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Sign Up</h5>
                <p className="card-text">Create a new account</p>
                <Link to="/signup"  className="btn btn-primary btn-block neon-button mt-1">Sign Up</Link>
              </div>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
