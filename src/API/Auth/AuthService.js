import { GetAuthToken } from "./GetAuthToken";

export const TOKEN_REFRESH_TIME = 30 * 60 * 1000;

export const checkAndRefreshToken = async () => {
	if (localStorage.getItem("access_token")) {
		localStorage.setItem("isLoggedIn", "true");
	} else {
		localStorage.setItem("isLoggedIn", "false");
	}

	const refresh_token = localStorage.getItem("refresh_token");

	if (refresh_token) {
		try {
			const response = await refreshAccessToken(refresh_token);
			const new_access_token = response.access_token;
			localStorage.setItem("access_token", new_access_token);
		} catch (error) {
			console.error("Error refreshing access token:", error);
		}
	}
};

export const refreshAccessToken = async (refresh_token) => {
	try {
		const response = await GetAuthToken(null, "refresh_token", refresh_token);
		return response;
	} catch (error) {
		throw error;
	}
};
