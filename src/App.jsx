import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";

export default function App() {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main className="container mx-auto px-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Home" element={<Navigate to="/" />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
			{/* <footer></footer> */}
		</>
	);
}
