  import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

  import "./App.css";
  import { HomePage } from "./pages/Home/HomePage";
  import { LoginPage } from "./pages/Login/LoginPage";
  import { SignupPage } from "./pages/Signup/SignupPage";
  import { FeedPage } from "./pages/Feed/FeedPage";
  import { Navbar } from "./components/Navbar/Navbar";
  import { ConnectionsPage } from "./pages/Connections/ConnectionsPage";
  import { Footer } from "./components/Footer";
  import { CreatePostPage } from "./pages/Post/CreatePostPage";
  import { CreateProfilePage } from "./pages/Profile/ProfilePage";
  


const Layout = () => {

  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
}
  // docs: https://reactrouter.com/en/main/start/overview
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
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
      {
        path: "/connections",
        element: <ConnectionsPage />,
      },
      {
        path: "/createpost",
        element: <CreatePostPage />
      },
      {
      path: "/updateuser",
      element: <CreateProfilePage/>
      },
    ]
    }  
  ]);

  const App = () => {
    return (
      <>
        <RouterProvider router={router} />
        <></>
      </>
    );
  };

  export default App;
