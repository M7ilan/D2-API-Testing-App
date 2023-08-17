import { API_KEY, BUNIGE_API_ROOT_PATH } from "../config";

export const GetMembershipDataById = async (_membershipID, _membershipType) => {
	try {
		const options = {
			method: "GET",
			headers: {
				"X-API-Key": API_KEY,
			},
		};
		const response = await fetch(`${BUNIGE_API_ROOT_PATH}/User/GetMembershipsById/${_membershipID}/${_membershipType}/`, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
