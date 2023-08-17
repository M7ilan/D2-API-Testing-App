import { API_KEY, BUNIGE_API_ROOT_PATH } from "../config";

export const SearchByGlobalNamePrefix = async (displayNamePrefix, page = "0") => {
	try {
		if (!displayNamePrefix) return [];
		const options = {
			method: "GET",
			headers: {
				"X-API-Key": API_KEY,
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`${BUNIGE_API_ROOT_PATH}/User/Search/Prefix/${displayNamePrefix}/${page}/`, options);
		const data = await response.json();
		return data.Response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
