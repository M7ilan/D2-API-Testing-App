import React, { useState, useEffect } from "react";
import { GetAuthToken } from "../API/Auth/GetAuthToken";
import { GetUserInfo } from "../API/Auth/GetUserInfo";

const Home = () => {
	const [uniqueName, setUniqueName] = useState("");

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");

	if (code && localStorage.getItem("isLoggedIn") == "true") {
		window.location.href = "/";
	}

	if (code) {
		GetAuthToken(code)
			.then((response) => {
				if (response.access_token && response.refresh_token) {
					localStorage.setItem("access_token", response.access_token);
					localStorage.setItem("refresh_token", response.refresh_token);
					localStorage.setItem("isLoggedIn", true);
					window.location.href = "/";
				}
			})
			.catch((error) => {
				console.error("Error fetching access token:", error);
			});
	}

	useEffect(() => {
		const fetchUserInfo = async (accessToken) => {
			try {
				const userInfo = await GetUserInfo(accessToken);
				setUniqueName(userInfo.Response.bungieNetUser.uniqueName);
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};

		if (localStorage.getItem("isLoggedIn") == "true") {
			fetchUserInfo(localStorage.getItem("access_token"));
		}
	}, []);

	return (
		<>
			<div className="flex flex-col p-4 text-center gap-4">
				<div className="text-4xl font-bold">Welcome {uniqueName}</div>
			</div>
		</>
	);
};

export default Home;
