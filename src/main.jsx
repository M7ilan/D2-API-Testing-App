import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { checkAndRefreshToken, TOKEN_REFRESH_TIME } from "./API/Auth/AuthService";

checkAndRefreshToken();
setInterval(checkAndRefreshToken, TOKEN_REFRESH_TIME);
console.log(import.meta.env.VITE_CLIENT_ID);

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
