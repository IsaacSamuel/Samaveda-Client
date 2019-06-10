import React from 'react';
import Comment from '../Comment/Comment'
import CommentHelper from '../Comment/CommentHelper'
import { withRouter } from "react-router";



class SongView extends React.Component {


 	constructor(props) {
		super(props);

		this.state = {
			comments_loaded : true,
			song_info_loaded : false,
			song_name : null
		}

		this.fetchPublicComments = this.fetchPublicComments.bind(this);
		this.fetchUserComments = this.fetchUserComments.bind(this);
		this.fetchComments = this.fetchComments.bind(this);

		this.user_comments = {}
		this.public_comments = {}

		//The current path is in the props as location.pathname
		let path = this.props.location.pathname;
		//Now we just need to split the path and take the last element to get the song id
		this.song_id = path.split("/").pop()


		//Runs fetch comments upon component intialization
		this.fetchComments();

	}


  	componentDidMount() {
  		fetch('http://localhost:3000/song?id=' + this.song_id)
  			.then(resp => resp.json())
  			.then(
  				(result) => {
  					this.setState({
  						song_info_loaded : true,
  						song_name : result.name
  					})
  				}
  			)

  	}	


	fetchPublicComments(song_uri) {
		//Fetch and return the public comment data for this song, excluding the user's comments
		let comments = 
			[
				{
					song_name : "River",
					artist_name : "Bishop Briggs",
					begin_time : ":00",
					end_time : "2:43",
					comment_body : "This song rules! Best of Bishop Briggs!!",
					comment_score : '2',
					is_public : true,
					owner : "Current User",
					song_uri : "2309039103200832"
				}
			]

		return comments
	}

	fetchUserComments(song_uri) {
		//Fetch and return the user's personal comments for this song--both public and private

		//For now, just subbing in static comments for testing
		let comments = 
			[
				{
					song_name : "River",
					artist_name : "Bishop Briggs",
					begin_time : ":43",
					end_time : "1:03",
					comment_body : "Notice the use of resolute dissonance here (at the start of the downbeat.)",
					comment_score : '4',
					is_public : true,
					owner : "Current User",
					song_uri : "2309039103200832"
				}
			]

		return comments
	}

	fetchComments(song_uri) {
		//Fetches user and public comments, stores in data structures, and sets state.comments_loaded to true (after async operations complete)
		this.user_comments = this.fetchUserComments(song_uri);
		this.public_comments = this.fetchPublicComments(song_uri);

		this.setState({'comments_loaded' : true})
	}


	render() {
		if (this.state.song_info_loaded) {

			return (
				<div id = "songView">
					<h2>{this.state.song_name}</h2>
					<p><i>{this.props.current_song_artist_name}</i></p>
					<h4>Write a comment</h4>
					{CommentHelper.newCommentForm("", "")}
					<h4>Your Comments</h4>
						{/* For each of the user's comments on this song, generate a Comment component and pass it the comment json data as a parameter */} 
						{this.state.comments_loaded ? this.user_comments.map( 
							comment => { 
								return (
									<div class = "user_comment">
										< Comment 
											comment_data = {comment} 
										/>
									</div>
								)
							}
						) : ""}
					<h4>Public comments on this song</h4>
						{/* For each of the public comments on this song, generate a Comment component and pass it the comment's json data as a parameter */} 
						{this.state.comments_loaded ? this.public_comments.map( 
							comment => { 
								return (
									<div class = "user_comment">
										< Comment 
											comment_data = {comment} 
										/>
									</div>
								)
							}
						) : ""}
				</div>
			)
		}
		else {
			return (
				<div id="currently_loading"> 
					<img src="../static/images/current_loading.gif" alt="Currently loading details for song" />
				</div>
			)
		}
	}

 }

 export default withRouter(SongView);
