import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import './LoginPage.css';

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await login(email, password);
			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("user", JSON.stringify(data.user));
			navigate("/posts");
		} catch (err) {
			console.error(err);
			navigate("/login");
		}
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	return (
		<>
		<Navbar />
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email"></label>
				<input
					id="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
				/>
				<label htmlFor="password"></label>
				<input
					id="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<input role="submit-button" id="submit" type="submit" value="Submit" />
			</form>
		</>
	);
};
