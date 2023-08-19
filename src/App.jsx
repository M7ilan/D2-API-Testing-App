import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeLoading, addLoading } from "./Hooks/setLoading";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import LoadingIcon from "./Components/Icons/LoadingIcon";
import PlayerProfile from "./Components/PlayerProfile";

export default function App() {
	const location = useLocation();
	const [oldLocation, setOldLocation] = useState(window.location.pathname);

	useEffect(() => {
		if (location.pathname == oldLocation) {
			return;
		}
		setOldLocation(location.pathname);
		addLoading();

	}, [location]);

	return (
		<>
			<header>
				<NavBar />
			</header>
			<div id="loading-container">
				<div id="loading" className="absolute opacity-100 flex bg-OpenColor-gray-0 w-full h-[calc(100vh-72px)] items-center justify-center text-4xl font-bold" style={{ transition: "opacity 300ms" }}>
					<LoadingIcon />
				</div>
			</div>
			<main className="container mx-auto px-8 mt-16 grid grid-cols-12">
				<Routes>
					<Route path="/D2-API-Testing-App" element={<Home />} />
					<Route path="/D2-API-Testing-App/Home" element={<Navigate to="/D2-API-Testing-App" />} />
					<Route path="/D2-API-Testing-App/Search" element={<Search />} />
					<Route path="/D2-API-Testing-App/Player/:playerType/:playerId" element={<PlayerProfile />} />
					<Route path="/D2-API-Testing-App/Login" element={localStorage.getItem("Logged") == "true" ? <Navigate to="/D2-API-Testing-App" /> : <Login />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
			{/* <footer></footer> */}
		</>
	);
}
