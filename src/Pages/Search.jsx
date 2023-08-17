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
				<input
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch(e);
						}
					}}
					placeholder="Search for a player..."
					onChange={(e) => {
						setUserInput(e.target.value);
					}}
					className="w-full focus:shadow-lg border-2 rounded-lg px-4 py-2"
					type="text"
				/>
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
								<Link to={`/D2-API-Testing-App/player/${result.destinyMemberships[0].membershipType}/${result.destinyMemberships[0].membershipId}`} className="col-span-12 flex items-center bg-white rounded-lg hover:shadow-lg cursor-pointer overflow-hidden">
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
