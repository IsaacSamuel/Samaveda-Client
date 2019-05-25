import React from 'react';
import TimeIndicator from './TimeIndicator';
import CommentHelper from './CommentHelper'


class SongView extends React.Component {
 {

 	constructor(props) {
		super(props);

		this.state = {
			comments_loaded : false
		}

		this.fetchPublicComments = this.fetchPublicComments.bind(this);
		this.fetchUserComments = this.fetchUserComments.bind(this);
		this.fetchComments = this.fetchComments.bind(this);

		this.user_comments = {}
		this.public_comments = {}

		//Runs fetch comments upon component intialization
		this.fetchComments();

	}


	fetchPublicComments(song_uri) {
		//Fetch and return the public comment data for this song, excluding the user's comments
	}

	fetchUserComments(song_uri) {
		//Fetch and return the user's personal comments for this song--both public and private
	}

	fetchComments(song_uri) {
		//Fetches user and public comments, stores in data structures, and sets state.comments_loaded to true (after async operations complete)
		this.user_comments = this.fetchUserComments(song_uri);
		this.public_comments = this.fetchPublicComments(song_uri);

		this.setState({'comments_loaded' : true})
	}


	render() {
		if (this.state.comments_loaded) {
			return (
				<div id = "songView">
					<h2>{this.props.current_song_name}</h2>
					<p><i>{this.props.current_song_artist_name}</i></p>
					<h4>Write a comment</h4>
					{CommentHelper.newCommentForm("", "")}
					<h4>Your Comments</h4>
						{/* For each of the user's comments on this song, generate a Comment component and pass it the comment json data as a parameter */} 
						{this.user_comments.map( 
							comment => { 
								return (
									<div class = "user_comment">
										< Comment 
											comment_data = {comment} 
										/>;
									</div>
								)
							}
						)};
					<h4>Public comments on this song</h4>
						{/* For each of the public comments on this song, generate a Comment component and pass it the comment's json data as a parameter */} 
						{this.public_comments.map( 
							comment => { 
								return (
									<div class = "user_comment">
										< Comment 
											comment_data = {comment} 
										/>;
									</div>
								)
							}
						)};
				</div>
			)
		}
		else {
			return (
				<div id="currently_loading"> 
					<img src="../static/images/current_loading.gif" alt="Currently loading details for song">
				</div>
			)
		}
	}

 }