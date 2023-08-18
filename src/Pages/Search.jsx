import { useEffect, useState } from "react";
import { removeLoading } from "../Hooks/setLoading";
import { SearchByGlobalNamePrefix } from "../API/Endpoints/SearchByGlobalNamePrefix";
import { motion } from "framer-motion";
import { DestinyIcon, LoadingIcon } from "../Components/Icons/index";
import { Link } from "react-router-dom";

const Search = () => {
	const [userInput, setUserInput] = useState("");
	const [userSentInput, setUserSentInput] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (e, page) => {
		e.preventDefault();
		try {
			setUserSentInput(userInput);
			if (!userInput || !userInput.trim()) return;
			if (page == "undefined") {
				if (userInput === userSentInput) return;
			}
			setSearchResult([]);
			setIsLoading(true);
			const response = await SearchByGlobalNamePrefix(userInput, page);
			setIsLoading(false);
			setSearchResult(response);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		removeLoading();
	}, []);

	return (
		<>
			<div className="col-span-8 col-start-3 space-y-4">
				<div className="flex justify-center text-4xl font-bold">Search</div>
				<div className="flex gap-2 items-center">
					<input
						onSubmit={(e) => handleSearch(e)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch(e);
							}
						}}
						placeholder="Search for a player..."
						onChange={(e) => {
							setUserInput(e.target.value);
						}}
						className="flex-1 focus:shadow-lg border-2 rounded-lg px-4 py-2"
						type="text"
					/>
					<button className="bg-OpenColor-gray-7 p-2 rounded-lg flex justify-center text-white" onClick={(e) => handleSearch(e)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
						</svg>
					</button>
				</div>
				{searchResult?.searchResults?.length > 0 && <hr />}
				{isLoading && (
					<div className="flex justify-center">
						<LoadingIcon />
					</div>
				)}
				<div className="grid gap-2">
					{searchResult?.searchResults?.map((result, index) => {
						return (
							<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} key={index} className="grid grid-cols-12 duration-0">
								<Link to={`/D2-API-Testing-App/player/${result?.destinyMemberships[0]?.membershipType}/${result?.destinyMemberships[0]?.membershipId}`} className="col-span-12 flex items-center bg-white rounded-lg hover:shadow-lg cursor-pointer overflow-hidden">
									<div className="flex items-center justify-center bg-current h-full p-2">{result.destinyMemberships?.[0]?.iconPath ? <img className="w-6 h-6 bg-cover" src={`https://www.bungie.net${result.destinyMemberships?.[0]?.iconPath}`} alt="Membership Icon" /> : <DestinyIcon />}</div>
									<div className="text-xl font-bold px-4 py-2 flex-1">
										{result.bungieGlobalDisplayName}#{result.bungieGlobalDisplayNameCode}
									</div>
								</Link>
							</motion.div>
						);
					})}
					{searchResult?.searchResults?.length > 0 && (
						<div className="flex gap-8">
							{searchResult.page > 0 && (
								<div onClick={(e) => handleSearch(e, searchResult.page - 1)} className="btn flex-1 text-center">
									Back
								</div>
							)}
							{searchResult.page + 1 == 0 || (searchResult.hasMore == true && <div className="flex items-center text-center">Page {searchResult.page + 1}</div>)}
							{searchResult.hasMore == true && (
								<div onClick={(e) => handleSearch(e, searchResult.page + 1)} className="btn flex-1 text-center">
									Next
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Search;
