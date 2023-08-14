import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<div className="flex items-center bg-OpenColor-gray-1 gap-4 px-8">
				<Link className="btn" to="/D2-API-Testing-App-Local/Home">
					Home
				</Link>
				<Link className="btn" to="/D2-API-Testing-App-Local/Login">
					Login
				</Link>
			</div>
		</>
	);
};

export default NavBar;
