import React from 'react';
import SongView from './SongView'


class View extends React.Component {

 	constructor(props) {
		super(props);

		this.state = {
			/* Five types of views--Song View 'song', 
			Artist View 'artist', Main View ('main'), 
			Settings Page ('settings'), and logged out ('loggedOut') */
			current_view : this.props.current_view
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
 		let url = 'song/' + song_uri;

 		this.setState({'current_view' : url})
 	}

 	viewArtistPage(artist_uri) {
 		//Change state (current_view) to 'artist'
 		let url = 'song/' + artist_uri;

 		this.setState({'current_view' : url})
 	}

 	viewHomePage() {
 		//Change state (current_view) to 'home'

 		this.setState({'current_view' : 'home'})
 	}

 	render() {
 		let view;
 		//Decide which type of view to display based on current state
 		if (this.state.current_view === 'main') {
 			//view = < MainView  />;
 		}
 		if (this.state.current_view === 'settings') {
 			//view = < SettingsView  />;
 		}
 		if (this.state.current_view === 'loggedOut') {
 			//view = < LoggedOut  />;
 		}
 		else if (this.state.current_view.includes('song')) {
 			view = < SongView 
 						current_song_name = "River"
 						current_song_artist_name = 'Bishop Briggs'
 					/>;
 		}
 		else if (this.state.current_view.includes('artist')) {
 			//view = < ArtistView />;
 		}
 		else {
 			view = "Error display view";
 		}


 		return view;
 	}

}

export default View;