import "./styles/Navbar.css";
// import React from "react";
import logo from "./home-icon2.png";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<a href="/" className="logo">
					<img src={logo} width={30} height={30} alt="Home Icon"></img>
				</a>
			</div>
			<div className="navbar-center">
				<ul className="nav-links">
					{/* probably delete if we wanna keep icon goes to home */}
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/advanced">Advanced Search</a>
					</li>
					<li>
						<a href="/database">Recipes</a>
					</li>
					<li>
						<a href="/ai">AI Chef</a>
					</li>
				</ul>
			</div>
			<div className="navbar-right">
				<a href="/login" className="login-button">
					Sign in
				</a>
				{/* <a href="/profile" className="cart-icon">
					<i className="fas fa-shopping-cart"></i>
					<span className="cart-count">90</span>
				</a> */}
				<a href="/profile" className="user-icon">
					Profile
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
