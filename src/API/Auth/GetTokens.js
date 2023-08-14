import { CLIENT_ID, CLIENT_SECRET, BUNIGE_API_ROOT_PATH } from "../config";

export const GetTokens = async (_code, grantType = "authorization_code", refreshToken = null) => {
	try {
		const options = {
			method: "POST",
			body: new URLSearchParams({
				grant_type: grantType,
				code: _code,
				refresh_token: refreshToken,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
			}),
		};

		const response = await fetch(`${BUNIGE_API_ROOT_PATH}/App/OAuth/token/`, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
