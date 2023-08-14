import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { checkAndRefreshToken, TOKEN_REFRESH_TIME } from "./API/Auth/RefreshToken";

checkAndRefreshToken();
setInterval(checkAndRefreshToken, TOKEN_REFRESH_TIME);

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
