import { createBrowserRouter, RouterProvider, Outlet, Router } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { ProfileEditsPage }  from "./pages/Profile/ProfileEditsPage";
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
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profileEdits",
          element: <ProfileEditsPage />,
        }
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
