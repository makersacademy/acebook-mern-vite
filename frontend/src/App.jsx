import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import Navbar from "./components/navbar/Navbar";

// docs: https://reactrouter.com/en/main/start/overview

const Layout = () => (
  <>
  <header>
    <Navbar />
  </header>
  <Outlet />
  </>
);

const router = createBrowserRouter([
     {
      element: <Layout />,
      children: [
        {path: "/",
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
      ]}
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
