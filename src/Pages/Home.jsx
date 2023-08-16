import React, { useState, useEffect } from "react";
import { GetTokens } from "../API/Auth/GetTokens";
import { GetUserInfo } from "../API/Auth/GetUserInfo";
import { removeLoading } from "../Hooks/setLoading";
import { getLocalData, setLocalData } from "../Hooks/localData";

const Home = () => {
	const [userInfo, setUserInfo] = useState(null);
	const isLoggedin = localStorage.getItem("Logged");

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");

	if (code) {
		GetTokens(code)
			.then((response) => {
				if (response) {
					setLocalData("Auth", {
						"Membership ID": response.membership_id,
						"Access Token": { "Access Token": response.access_token, "Expires In": response.expires_in },
						"Refresh Token": { "Refresh Token": response.refresh_token, "Refresh Expires In": response.refresh_expires_in },
					});
					localStorage.setItem("Logged", true);
					window.location.href = window.location.origin + window.location.pathname;
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
			} finally {
				removeLoading();
			}
		};

		if (isLoggedin == "true") {
			fetchUserInfo(getLocalData("Auth")["Access Token"]["Access Token"]);
		}
	}, []);

	return (
		<>
			<div className={`flex flex-col items-center text-center ${isLoggedin == "true" && "md:text-start md:items-start"} p-4 gap-4`}>
				<div className="text-2xl md:text-4xl font-bold">Welcome {userInfo?.bungieNetUser.uniqueName}</div>
				{userInfo && (
					<div className="text-xs md:text-lg">
						<p>
							<span className="font-bold">Membership ID:</span> {userInfo.destinyMemberships[0].membershipId}
						</p>
						<p>
							<span className="font-bold">Membership Type:</span> {userInfo.destinyMemberships[0].membershipType}
						</p>
						<p>
							<span className="font-bold">Display Name:</span> {userInfo.destinyMemberships[0].LastSeenDisplayName}
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
