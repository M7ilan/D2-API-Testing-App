import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProfile } from "../API/Endpoints/GetProfile";
import { removeLoading } from "../Hooks/setLoading";
import { getLocalData } from "../Hooks/localData";
import { GetMembershipDataById } from "../API/Endpoints/GetMembershipDataById";

const PlayerProfile = () => {
	const [playerData, setPlayerData] = useState(null);
	const [playerRecords, setPlayerRecords] = useState(null);
	const { playerType, playerId } = useParams();

	useEffect(() => {
		const fetchPlayer = async () => {
			const access_token = getLocalData("Auth")?.["Access Token"]?.["Access Token"];

			const records = await GetProfile(access_token, playerType, playerId, 900);
			setPlayerRecords(records);

			const data = await GetMembershipDataById(playerId, playerType);
			setPlayerData(data);
			console.log(data);

			removeLoading();
		};
		fetchPlayer();
	}, []);

	return (
		<>
			<div className="flex flex-col col-span-12 space-y-4 items-center text-center md:text-start md:items-start">
				<div className="text-4xl md:text-6xl font-bold">{playerData?.Response?.bungieNetUser?.uniqueName}</div>
				<div className="text-base md:text-2xl">
					<div>
						<span className="font-bold">Lifetime Score:</span> {playerRecords?.Response?.profileRecords?.data?.lifetimeScore}
					</div>
					<div>
						<span className="font-bold">Active Score:</span> {playerRecords?.Response?.profileRecords?.data?.activeScore}
					</div>
				</div>
			</div>
		</>
	);
};

export default PlayerProfile;
