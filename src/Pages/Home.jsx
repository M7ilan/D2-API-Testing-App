import React, { useState, useEffect } from "react";
import { GetTokens } from "../API/Auth/GetTokens";
import { GetUserInfo } from "../API/Auth/GetUserInfo";

const Home = () => {
	const [userInfo, setUserInfo] = useState(null);

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");

	if (code) {
		GetTokens(code)
			.then((response) => {
				if (response.access_token && response.refresh_token) {
					localStorage.setItem("access_token", response.access_token);
					localStorage.setItem("refresh_token", response.refresh_token);
					localStorage.setItem("isLoggedIn", true);
					window.history.replaceState({}, document.title, "/");
					window.location.reload();
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

				if (userInfo.Response) {
					setUserInfo(userInfo.Response);
				}
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
				<div className="text-4xl font-bold">Welcome {userInfo?.bungieNetUser.uniqueName}</div>
				{userInfo && (
					<div className="text-lg">
						<p>Membership ID: {userInfo.destinyMemberships[0].membershipId}</p>
						<p>Membership Type: {userInfo.destinyMemberships[0].membershipType}</p>
						<p>Display Name: {userInfo.destinyMemberships[0].LastSeenDisplayName}</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
