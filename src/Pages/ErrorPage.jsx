import { useEffect } from "react";
import { removeLoading } from "../Hooks/setLoading";

const ErrorPage = () => {
	useEffect(() => {
		removeLoading();
	}, []);
	
	return (
		<>
			<div className="text-center col-span-12 mt-32 text-2xl md:text-6xl font-bold">
				ERROR <span className="text-red-500">404</span>
			</div>
		</>
	);
};

export default ErrorPage;
