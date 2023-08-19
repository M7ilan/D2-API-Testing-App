import LoadingIcon from "../Components/Icons/LoadingIcon";
import { createRoot } from "react-dom/client";

export const removeLoading = () => {
	setTimeout(() => {
		console.log("removeLoading");
		const loading = document.getElementById("loading");
		if (loading) {
			loading.classList.add("loading-hidden");
			setTimeout(() => {
				loading.remove();
			}, 300);
		}
	}, 1);
};

export const addLoading = () => {
	console.log("addLoading");
	if (document.getElementById("loading")) {
		return;
	}

	const loadingContainer = document.getElementById("loading-container");
	if (loadingContainer) {
		const loadingElement = document.createElement("div");
		loadingElement.id = "loading";
		loadingElement.className = "absolute opacity-100 flex bg-OpenColor-gray-0 w-full h-[calc(100vh-72px)] items-center justify-center text-4xl font-bold";
		loadingElement.style.transition = "opacity 300ms";
		loadingContainer.appendChild(loadingElement);

		const root = createRoot(loadingElement);
		root.render(<LoadingIcon />);
	}
};
