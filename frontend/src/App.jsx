  import { createBrowserRouter, RouterProvider } from "react-router-dom";

  import "./App.css";
  import { HomePage } from "./pages/Home/HomePage";
  import { LoginPage } from "./pages/Login/LoginPage";
  import { SignupPage } from "./pages/Signup/SignupPage";
  import { FeedPage } from "./pages/Feed/FeedPage";
  import { Navbar } from "./components/Navbar/Navbar";
  // import { ConnectionsPage } from "./pages/Connections/ConnectionsPage";
  

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
    // {
    //   path: "/connections",
    //   element: <ConnectionsPage />,
    // },
  ]);

  const App = () => {
    return (
      <>
        <Navbar />
        <RouterProvider router={router} />
        <></>
      </>
    );
  };

  export default App;
