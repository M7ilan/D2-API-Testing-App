export const removeLoading = () => {
	const loading = document.getElementById("loading");
	if (loading) {
		loading.classList.add("loading-hidden");
		setTimeout(() => {
			loading.parentElement.remove();
		}, 300);
	}
};

export const addLoading = () => {
	if (document.getElementById("loading-container")) {
		return;
	}
	const loadingContainer = document.getElementById("loading-container");
	if (loadingContainer) {
		loadingContainer.innerHTML += `<div id="loading" class="absolute opacity-100 flex bg-OpenColor-gray-0 w-full h-[calc(100vh-72px)] items-center justify-center text-4xl font-bold" style="transition: opacity 300ms">Loading...</div>`;
	}
};
