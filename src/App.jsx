import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";

export default function App() {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main className="container mx-auto px-8 mt-16">
				<Routes>
					<Route path="/D2-API-Testing-App" element={<Home />} />
					<Route path="/D2-API-Testing-App/Home" element={<Navigate to="/D2-API-Testing-App" />} />
					<Route path="/D2-API-Testing-App/Login" element={localStorage.getItem("isLoggedIn") == "true" ? <Navigate to="/D2-API-Testing-App" /> : <Login />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
			{/* <footer></footer> */}
		</>
	);
}
