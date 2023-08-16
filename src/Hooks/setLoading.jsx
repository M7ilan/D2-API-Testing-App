export const removeLoading = () => {
	const loading = document.getElementById("loading");
	if (loading) {
		loading.classList.add("loading-hidden");
		setTimeout(() => {
			loading.remove();
			console.log("remove loading");
		}, 300);
	}
};

export const addLoading = () => {
	if (document.getElementById("loading")) {
		return;
	}
	const loadingSection = document.getElementById("loading-section");
	if (loadingSection) {
		loadingSection.innerHTML += `<div id="loading" class="absolute opacity-100 flex bg-OpenColor-gray-0 w-full h-[calc(100vh-72px)] items-center justify-center text-4xl font-bold" style="transition: opacity 300ms">Loading...</div>`;
	}
	console.log("add loading");
};
