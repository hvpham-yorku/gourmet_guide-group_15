import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "@/styles/Login.css";

const Login = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});
	const { email, password } = inputValue;
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
			position: "bottom-left",
		});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://localhost:3000/login", {
				...inputValue,
			});
			console.log(data);
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
		});
	};

	return (
		<div className="form-container">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange} />
				<input type="password" name="password" value={password} placeholder="Enter your password" onChange={handleOnChange} />
				<button type="submit">Submit</button>
				<p>
					Don&#39;t have an account? <Link to={"/signup"}>Sign up here</Link>
				</p>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Login;
