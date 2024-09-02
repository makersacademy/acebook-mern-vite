import "./HomePage.css";

export const HomePage = (props) => {
  const DOCS_URL =
    "https://github.com/makersacademy/acebook-mern-vite/blob/main/DOCUMENTATION.md";

  return (
    <div className="home">
      <h1>Welcome to Acebook!</h1>
      <a href="#" onClick={() => props.setPage("signup")}>
        Sign Up
      </a>
      <a href="#" onClick={() => props.setPage("login")}>
        Log In
      </a>
      <p>
        Documentation for this project can be found <a href={DOCS_URL}>here.</a>
      </p>
    </div>
  );
};
