function Login() {
	let json = 
		{
			client_id : "2496d8f8670f4dc586a7627ee9ddeeb2",
			redirect_uri : "localhost:8080/login",
			response_type : "code",
			scopes : "user-read-currently-playing user-top-read user-follow-read user-read-playback-state user-library-read user-read-recently-played"
		};

	window.location.href = ('https://accounts.spotify.com/authorize?' + JSON.stringify(json));
 
}

export default Login;
