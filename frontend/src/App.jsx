import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import Nav from "./components/Nav";
import { useState } from "react";
import { useEffect } from "react";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
]);

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }

  useEffect(() => {
    checkAuth();

    window.addEventListener('storage', checkAuth)
    window.addEventListener('authChange', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    }
  }, []);
  

  const logo = ''
  const search = (e) => {
    console.log(e)
}


  return (
    <>
      { isAuthenticated && (
          <Nav 
            logo={logo}
            onSearch={search}
          />
        )}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
