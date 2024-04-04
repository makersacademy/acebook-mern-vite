import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    // Check for errors only after the form is submitted
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email format.");
      return; // Stop form submission if email format is invalid
    } else {
      setEmailError(""); // Clear the email error if the format is valid
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+?ñÑ]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter and one special character."
      );
      return; // Stop form submission if password format is invalid
    } else {
      setPasswordError(""); // Clear the password error if the format is valid
    }
    const fullNameRegex = /^[A-Za-z\s\-']+$/;
    if (!fullNameRegex.test(fullName)) {
      setFullNameError("Enter your name.");
      return; // Stop form submission if no name is entered
    } else {
      setFullNameError(""); // Clear the password error if the format is valid
    }
    try {
      if (emailError || passwordError) {
        return; // won't allow the form to be submitted if there are errors
      }
      await signup(email, password, fullName, profilePicture);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.message === "Email already in use") {
        setEmailError(
          "Email already in use. Please use a different email address."
        );
        navigate("/signup");
      } else {
        setEmailError(
          "An error occurred while signing up. Please try again later."
        );
      }
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (formSubmitted) {
      const newEmail = event.target.value;
      if (!newEmail.includes("@") || !newEmail.includes(".")) {
        setEmailError("Please enter a valid email format.");
      } else {
        setEmailError(""); // Clear the email error when the format is valid
      }
    } else {
      setEmailError(""); // Clear the email error when the form is not submitted
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFullName = (event) => {
    const fullName = event.target.value.replace(/^\s+/, ""); // Remove leading spaces
    setFullName(fullName);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    // IN CASE BASE64 DOESNT WORK UNCOMMENT

    // console.log("Selected file:", file); //See what info is stored - right now loads of info
    // setProfilePicture(file); // Set the profile picture state

    //BASE64 ALTERNATIVE
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setProfilePicture(base64Image);
    };
    reader.readAsDataURL(file); //Payload is still profilePicture: {}
    console.log("Selected file:", file); //WORKED!! Stored in DB
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Enter a valid email format."
        />
        {formSubmitted && emailError && <p>{emailError}</p>}
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          required
          pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$"
          title="Password must contain at least 8 characters, including one uppercase letter and one special character (!@#$%^&*()_+)."
        />
        {formSubmitted && passwordError && <p>{passwordError}</p>}
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <label htmlFor="fullName">Enter your name:</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter your name"
          value={fullName}
          onChange={handleFullName}
        />
        {formSubmitted && fullNameError && <p>{fullNameError}</p>}
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
