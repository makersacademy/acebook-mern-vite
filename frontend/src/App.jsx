import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";


// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <SimpleNavBar/>
    <HomePage />,
    </>
  },
  {
    path: "/login",
    element: 
    <>
    <SimpleNavBar/>
    <LoginPage />
    </>,
  },
  {
    path: "/signup",
    element:     <>
    <SimpleNavBar/>
    <SignupPage />
    </>,
  },
  {
    path: "/posts", 
    element: 
    <>
    <NavBar />
    <FeedPage />
    
  </>
    
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
