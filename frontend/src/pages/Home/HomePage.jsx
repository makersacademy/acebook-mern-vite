import { Link } from "react-router-dom";
import { ImageCircle } from "../../components/ImageCircle";
import { Footer } from "../../components/Footer";

import "./HomePage.css";
import { LoginPage } from "../Login/LoginPage";

export const HomePage = () => {
  return (
    <div className="home">
      <LoginPage />
      <Footer/>
    </div>
  );
};
