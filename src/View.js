import React from 'react';


class View extends React.Component {
 {

 	constructor(props) {
		super(props);

		this.state = {
			/* Five types of views--Song View 'song', 
			Artist View 'artist', Main View ('main'), 
			Settings Page ('settings'), and logged out ('loggedOut') */
			current_view : 'song'
		}

		this.previous_pages = {};

	}

 	goBack() {
 		//Go back to previous page

 		//If there is anything in this.previous_pages, pop from it, and go to that page
 	}

 	checkedIfLoggedOut() {
 		//Check if logged out, if not, go to main page
 	}

 	viewLoggedOutPage(song_uri) {
 		this.setState({'current_view' : 'loggedOut'})
 	}

 	viewSongPage(song_uri) {
 		//Change state (current_view) to 'song'
 		url = 'song/' + song_uri;

 		this.setState({'current_view' : url})
 	}

 	viewArtistPage(artist_uri) {
 		//Change state (current_view) to 'artist'
 		 url = 'song/' + artist_uri;

 		this.setState({'current_view' : url})
 	}

 	viewHomePage() {
 		//Change state (current_view) to 'home'

 		this.setState({'current_view' : 'home'})
 	}

 	render() {
 		if (this.state.current_view === 'main') {
 			view = < Main  />;
 		}
 		if (this.state.current_view === 'settings') {
 			view = < Settings  />;
 		}
 		if (this.state.current_view === 'loggedOut') {
 			view = < LoggedOut  />;
 		}
 		else if (this.state.current_view.includes('song')) {
 			view = < Song />;
 		}
 		else if (this.state.current_view.includes('artist')) {
 			view = < Artist />;
 		}
 		else 
 			view = "Error display view";
 		}
 		return (
 			{view}
 		);
 	}



}