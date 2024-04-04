import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/LoginPageBackground.css'
import { login } from "../../services/authentication";
import { Link } from "react-router-dom";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    
    } catch (err) {
        console.error(err);
        setError([err.message])
        navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
              <div className="container-fluid p-0 neon-background">
                <div className="row m-0">
                  <div className="col-md-12 p-0">
                    <div className="neon-background d-flex align-items-center justify-content-center vh-100 vw-100">
                      <div className="container">
                        <div className="row justify-content-center">
                          {/* Logo */}
                          <div className="text-center mb-3">
                          <div className="row justify-content-center"><img src="../../src/assets/Neonbook_logo.png" alt="Logo" style={{ display: 'flex', maxWidth: '20%', height: 'auto' }} /></div>
                          <div className="row justify-content-center"><img src="../../src/assets/Neonbook_full_logo.png" alt="Logo" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} /></div> 
                            </div>
                          <div className="col-md-4">
                            
                            
                            {/* Login Form */}
                            <div>
                              <div className="card-body">
                                <h2 className="card-title text-center mb-4 ">Log In</h2>
                                <form onSubmit={handleSubmit}>
                                  <div className="form-group mb-4">
                                    <label htmlFor="email">EMAIL:</label>
                                    <input
                                      id="email"
                                      className="form-control"
                                      type="text"
                                      value={email}
                                      onChange={handleEmailChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="password">PASSWORD:</label>
                                    <input
                                      id="password"
                                      className="form-control"
                                      type="password"
                                      value={password}
                                      onChange={handlePasswordChange}
                                    />
                                  </div>
                                  <div><p></p></div>
                                  <button className="btn btn-primary btn-block neon-button mt-3" type="submit">
                                    Submit
                                  </button>
                                </form>
                                {error && (
                                  <div style={{ color: 'white', marginTop: '0.5rem' }}>
                                    {error}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-5" >
                              <Link to="/signup" className="btn btn-primary signup-button">No account? Sign up here.</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
                  

                                }
