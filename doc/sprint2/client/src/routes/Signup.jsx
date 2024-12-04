import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "@/styles/Login.css";

const Signup = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		username: "",
	});
	const { email, password, passwordConfirm, username } = inputValue;
	const handleOnChange = e => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = err =>
		toast.error(err, {
			position: "bottom-left",
		});
	const handleSuccess = msg =>
		toast.success(msg, {
			position: "bottom-right",
		});

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(password, passwordConfirm);
		if (password === passwordConfirm) {
			try {
				const { data } = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/signup`, {
					...inputValue,
				});
				const { success, message } = data;
				if (success) {
					handleSuccess(message);
					setTimeout(() => {
						navigate("/");
					}, 1000);
				} else {
					handleError(message);
				}
			} catch (error) {
				console.log(error);
			}
			setInputValue({
				...inputValue,
				email: "",
				password: "",
				passwordConfirm: "",
				username: "",
			});
		} else {
			handleError("Passwords dont match!");
		}
	};

	return (
		<div className="form-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="username" placeholder="Enter your username" value={username} onChange={handleOnChange} required />
				<input type="email" name="email" placeholder="Enter your email" value={email} onChange={handleOnChange} required />
				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					value={password}
					onChange={handleOnChange}
					required
				/>
				<input
					type="password"
					name="passwordConfirm"
					placeholder="Confirm password"
					value={passwordConfirm}
					onChange={handleOnChange}
					required
				/>
				<button type="submit">Sign Up</button>
				<p>
					Already have an account? <Link to="/login">Login here</Link>
				</p>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Signup;
