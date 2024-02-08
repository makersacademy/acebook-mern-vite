import { createBrowserRouter, RouterProvider, Outlet, Router } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { ProfileEditsPage }  from "./pages/Profile/ProfileEditsPage";
import Navbar from "./components/navbar/Navbar";
import NavbarLoggedIn from "./components/navbar/NavbarLogin";
import NavbarLoggedOut from "./components/navbar/NavbarLogout";
import {PostPage} from "./pages/IndividualPost/IndividualPostPage"
import { FriendPage } from "./pages/Friends/AddFriends";
import { useState } from "react";

// docs: https://reactrouter.com/en/main/start/overview

const Layout = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  if (token) {
    return (
    <>
    <header>
      <NavbarLoggedIn />
    </header>
    <Outlet />
    </>)}
  else {
    return (
      <>
    <header>
      <NavbarLoggedOut />
    </header>
    <Outlet />
    </>
    )
  }
};

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
        },
        {
          path: "/posts/find/:id",
          element: <PostPage />,
        },
        {
          path: "/addfriends",
          element: <FriendPage />,
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
