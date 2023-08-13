import { API_KEY, BUNIGE_API_ROOT_PATH } from "../config";

export const GetUserInfo = async (_token) => {
	try {
		const options = {
			method: "GET",
			headers: {
				"X-API-Key": API_KEY,
				Authorization: `Bearer ${_token}`,
			},
		};
		const response = await fetch(`${BUNIGE_API_ROOT_PATH}/User/GetMembershipsForCurrentUser/`, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
