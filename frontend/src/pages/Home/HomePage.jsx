import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

import "./HomePage.css";
import { LoginPage } from "../Login/LoginPage";

export const HomePage = () => {
  return (
    <div className="home">
      <LoginPage />
    </div>
  );
};
