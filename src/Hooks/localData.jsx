export const setLocalData = (storageName, value) => {
	const existingData = JSON.parse(localStorage.getItem(storageName)) || {};
	const newData = { ...existingData, ...value };
	localStorage.setItem(storageName, JSON.stringify(newData));
};

export const getLocalData = (storageName) => {
	const data = localStorage.getItem(storageName);
	return data ? JSON.parse(data) : {};
};
