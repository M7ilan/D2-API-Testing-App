import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import { removeLoading, addLoading } from "./Hooks/setLoading";
import { useEffect } from "react";

export default function App() {
	if (localStorage.getItem("Logged") !== "true") {
		window.addEventListener("load", () => {
			removeLoading();
		});
	}

	const location = useLocation();
	useEffect(() => {
		addLoading();
	}, [location]);

	return (
		<>
			<header>
				<NavBar />
			</header>
			<div id="loading-container">
				<div id="loading" className="absolute opacity-100 flex bg-OpenColor-gray-0 w-full h-[calc(100vh-72px)] items-center justify-center text-4xl font-bold" style={{ transition: "opacity 300ms" }}>
					Loading...
				</div>
			</div>
			<main className="container mx-auto px-8 mt-16">
				<Routes>
					<Route path="/D2-API-Testing-App" element={<Home />} />
					<Route path="/D2-API-Testing-App/Home" element={<Navigate to="/D2-API-Testing-App" />} />
					<Route path="/D2-API-Testing-App/Login" element={localStorage.getItem("Logged") == "true" ? <Navigate to="/D2-API-Testing-App" /> : <Login />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
			{/* <footer></footer> */}
		</>
	);
}
