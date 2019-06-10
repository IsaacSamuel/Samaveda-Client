import React from 'react';

/*Function of the BaseView is to determine whether the user is logged in or not,
    and render a view accordingly. */

function BaseView (props) {
	if (props.loggedIn) {
		return loggedOutView()
	}
	else {
		return loggedOutView()
	}
}


function loggedInView() {
	return(
		<div id="loggedIn">
			<h2>Recent Songs</h2>
			<p>Here are some recent songs you've commented upon.</p>

			<h2>Discussions</h2>
			<p>These songs are currently being discussed heavily. Feel free to chime in.</p>

			<h2>Your recommendations</h2>
			<p>Here are some recommendations you might like.</p>

		</div>
	)
}

function loggedOutView() {
	return(
		<div id="loggedOut">
			<h1>Welcome to Samaveda</h1>
			<p><i>Samaveda</i> is an app designed to help you annotate and discuss the Spotify songs you love.</p>

			<p>If you're already part of the team, log in to be able to listen to music, comment privately or publicly, and get 
				personalised recommendations. Otherwise, feel free to browse around or sign up.</p>
		</div>
	)
}

export default BaseView;