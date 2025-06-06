import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";

import { getUsers } from "./services/users";
import Nav from "./components/Nav";
import Logo from '../src/assets/images/acebook_logo.png';

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
  const [users, setUsers] = useState([]);
  const logo = Logo


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
  

  
  const searchDatabase = async (searchTerm) => {
    console.log("The search was triggereddddd")
    const token = localStorage.getItem('token');

    if (!searchTerm.trim()) {
      setUsers([]);
      return;
    }

    try {
      console.log("I promise i tried")
      const response = await getUsers(token, searchTerm)
      console.log("search results: ", response)
      
      setUsers(response.users || [])

    } catch (error) {
      console.error("Search Failed: ", error)
      setUsers([]);
    }
    
}


  return (
    <>
      { isAuthenticated && (
          <Nav 
            logo={logo}
            onSearch={searchDatabase}
            users={users} // nav needs users to display them under search field
          />
        )}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
