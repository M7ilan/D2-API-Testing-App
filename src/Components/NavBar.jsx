import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<div className="flex items-center bg-OpenColor-gray-1 gap-4 px-8">
				<Link className="btn" to="/Home">
					Home
				</Link>
				<Link className="btn" to="/Login">
					Login
				</Link>
			</div>
		</>
	);
};

export default NavBar;
