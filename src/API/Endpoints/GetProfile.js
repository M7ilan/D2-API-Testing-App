import { API_KEY, BUNIGE_API_ROOT_PATH } from "../config";

export const GetProfile = async (_token, _membershipType, _membershipID, components) => {
	try {
		const options = {
			method: "GET",
			headers: {
				"X-API-Key": API_KEY,
				Authorization: `Bearer ${_token}`,
			},
		};

		const response = await fetch(`${BUNIGE_API_ROOT_PATH}/Destiny2/${_membershipType}/Profile/${_membershipID}/?components=${components}`, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
