const Login = () => {
	return (
		<>
			<div className="flex flex-col p-4 text-center gap-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
				<div className="text-4xl font-bold">Login</div>
				<a className="btn" href={`https://www.bungie.net/en/OAuth/Authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code`}>
					OAuth
				</a>
			</div>
		</>
	);
};

export default Login;
