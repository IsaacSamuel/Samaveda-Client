import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SongView from './Views/SongView'
import ErrorView from './Views/ErrorView'
import BaseView from './Views/BaseView'



class View extends React.Component {

 	constructor(props) {
		super(props);

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

	 	return (
	 		<Router>
		 		<Switch>
		 			<Route exact path="/" render={
		 				(props) => 
		 					<BaseView
		 						logged_in = {this.props.logged_in}
		 					/>
		 				} 
		 			/>

		 			<Route path="/song" 
		 				render={
		 					props=>
		 						<SongView
		 					 		current_song_name = "River"
		 					 		current_song_artist_name = 'Bishop Briggs'
		 						/>
		 				} 
		 			/>	

		 			<Route render={
	 					props=>
	 						<ErrorView
	 					 		errorType="404"
	 						/>
	 				}  />

		 		</Switch>
	 		</Router>
	 	)
	}
}

/*

	 			<Route exact path="/" component={MainView} />
	 			<Route path="/settings" component={SettingsView} />	 			
	 
	 			<Route path="/artist" component={ArtistView} />

*/

export default View;