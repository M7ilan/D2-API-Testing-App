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
			<div className="flex flex-wrap center justify-between items-center bg-OpenColor-gray-1 gap-4 px-8 py-2">
				<div className="flex gap-4">
					<Link className="btn-hover" to="/D2-API-Testing-App">
						Home
					</Link>
					<Link className="btn-hover" to="/D2-API-Testing-App/Search">
						Search
					</Link>
				</div>
				<div>
					<Link className="font-bold text-4xl btn-hover" to="/D2-API-Testing-App">
						D2 API TESTING APP
					</Link>
				</div>
				<div>
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
			</div>
		</>
	);
};

export default NavBar;
