import { Link } from "react-router-dom";

const logout = () => {
	if (localStorage.getItem("isLoggedIn") == "true") {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.setItem("isLoggedIn", false);
		window.location.href = "/D2-API-Testing-App/Login";
	} else {
		window.location.href = "/D2-API-Testing-App/Login";
	}
};

const NavBar = () => {
	return (
		<>
			<div className="flex flex-wrap center justify-between items-center bg-OpenColor-gray-1 gap-4 px-8">
				<Link className="btn" to="/D2-API-Testing-App/Home">
					Home
				</Link>
				{localStorage.getItem("isLoggedIn") == "true" ? (
					<button className="btn" onClick={logout}>
						Logout
					</button>
				) : (
					<Link className="btn" to="/D2-API-Testing-App/Login">
						Login
					</Link>
				)}
			</div>
		</>
	);
};

export default NavBar;
