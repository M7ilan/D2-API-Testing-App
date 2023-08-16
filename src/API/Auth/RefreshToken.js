import { getLocalData, setLocalData } from "../../Hooks/localData";
import { GetTokens } from "./GetTokens";

export const TOKEN_REFRESH_TIME = 30 * 60 * 1000;

export const checkAndRefreshToken = async () => {
	const authData = getLocalData("Auth");
	const access_token = authData["Access Token"] ? authData["Access Token"]["Access Token"] : null;
	const refresh_token = authData["Refresh Token"] ? authData["Refresh Token"]["Refresh Token"] : null;

	if (access_token) {
		localStorage.setItem("Logged", true);
	} else {
		localStorage.setItem("Logged", false);
	}

	if (refresh_token) {
		try {
			const response = await refreshAccessToken(refresh_token);
			setLocalData("Auth", {
				"Membership ID": response.membership_id,
				"Access Token": { "Access Token": response.access_token, "Expires In": response.expires_in },
				"Refresh Token": { "Refresh Token": response.refresh_token, "Refresh Expires In": response.refresh_expires_in },
			});
		} catch (error) {
			console.error("Error refreshing access token:", error);
		}
	}
};

export const refreshAccessToken = async (refresh_token) => {
	try {
		const response = await GetTokens(null, "refresh_token", refresh_token);
		return response;
	} catch (error) {
		throw error;
	}
};
