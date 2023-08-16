import { Link } from "react-router-dom";

const logout = () => {
	if (localStorage.getItem("Logged") == "true") {
		localStorage.removeItem("Auth");
		localStorage.setItem("Logged", false);
		window.location.href = "/D2-API-Testing-App/Login";
	} else {
		window.location.href = "/D2-API-Testing-App/Login";
	}
};

const NavBar = () => {
	return (
		<>
			<div className="flex flex-wrap center justify-between items-center bg-OpenColor-gray-1 gap-4 px-8">
				<Link className="btn-hover" to="/D2-API-Testing-App">
					Home
				</Link>
				<Link className="font-bold text-4xl my-4 btn-hover" to="/D2-API-Testing-App">D2 API TESTING APP</Link>
				{localStorage.getItem("Logged") == "true" ? (
					<button className="btn-hover" onClick={logout}>
						Logout
					</button>
				) : (
					<Link className="btn-hover" to="/D2-API-Testing-App/Login">
						Login
					</Link>
				)}
			</div>
		</>
	);
};

export default NavBar;
