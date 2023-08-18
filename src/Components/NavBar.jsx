import { useState } from "react";
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
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<>
			<div className="md:flex hidden flex-wrap center justify-between items-center bg-OpenColor-gray-1 gap-4 px-8 py-2">
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
			<div className="flex md:hidden flex-wrap center justify-between items-center bg-OpenColor-gray-1 gap-4 px-8 py-2">
				<div>
					<svg
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-12 h-12"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
					{openMenu && (
						<div className="absolute bg-OpenColor-gray-2 shadow-lg p-2 rounded-lg flex flex-col">
							<Link className="btn-hover hover:bg-OpenColor-gray-3" to="/D2-API-Testing-App">
								Home
							</Link>
							<Link className="btn-hover hover:bg-OpenColor-gray-3" to="/D2-API-Testing-App/Search">
								Search
							</Link>
							{localStorage.getItem("Logged") == "true" ? (
								<button className="btn-hover hover:bg-OpenColor-gray-3" onClick={logout}>
									Logout
								</button>
							) : (
								<Link className="btn-hover hover:bg-OpenColor-gray-3" to="/D2-API-Testing-App/Login">
									Login
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default NavBar;
