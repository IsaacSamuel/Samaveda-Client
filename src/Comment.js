import React from 'react';
import CommentHelper from './CommentHelper'


class Comment extends React.Component {
 {
 	constructor(props) {
	    super(props)

	    this.state = {
	      begin_time: this.props.comment.begin_time,
	      end_time: this.props.comment.end_time,
	      is_public: this.props.comment.is_public,
	      score: this.props.comment.comment_score,
	      vote: this.props.comment.upvote
	      owner: this.props.comment.owner
	    }

	    this.parent = this.props.comment.parent //Pointer to the parent comment, if any
	    this.song_uri = this.props.comment.song_uri; //The unique identifier for the current song
	    this.body = this.props.comment.comment_body; 

	    this.setPublic = this.setBegin.bind(this);
	    this.setBeginTime = this.setBeginTime.bind(this);
	    this.setEndTime = this.setEndTime.bind(this);
	    this.upvote = this.upvote.bind(this);
	    this.downvote = this.downvote.bind(this);
	    this.isUserOwner = this.isUserOwner.bind(this);
	    this.votingDiv = this.votingDiv(this);
	}

	function setPublic(public_status) {
		this.state.setState({
			is_public : public_status
		});
	}

	function setTime(new_begin_time, new_end_time) {
		this.state.setState({
			begin_time : new_begin_time,
			end_time : new_end_time
		});
	}

	function newComment(comment) {
		/* Create new comment and add a pointer to it to the subcomments */
	}

	function vote(user_vote) {
		this.state.setState({
			vote : user_vote
		});
	}


	function handleSubmit() {
		//Do all the saving of our comment into json form, use helper to send to server

		let is_public = document.forms["new_comment_form"]["public"];
		let comment_body = document.forms["new_comment_form"]["comment_body"];

		let comment_json = {}

		comment_json = {
			"begin_time" : this.state.begin_time,
			"end_time" : this.state.end_time,
			"is_public" : this.state.is_public
			"comment_body" : this.state.comment_body,
			"vote" : this.state.vote,
			
			"is_new" : false
		}

		CommentHelper.saveComment(comment_json)

	}

	function isUserOwner() {
		/* If the user is the owner, return true */
		return true
	}

	//change to const
	function votingDiv() {
		//voting div exists for public and private components, we encapsulte to avoid repitition
		return (
			<div class="votes">
				<div class = "upvote"></div>
					{this.votes}
				<div class = "downvote"></div>
			</div>
		)
	}

	function render() {
		//If comment is owned by user, we need to generate TimeIndicator and PublicIndicator component and allow user to edit body
		if (this.isUserOwner) {
			return (
				<div class = 'comment'> 
					<form 
	            		onSubmit={this.handleSubmit}>

						< TimeIndicator 
							begin_time = {this.begin}
							end_time = {this.end}

							setTime = {this.setTime}
						/>
						< PublicIndicator
							isPublic = {this.is_public}
						/>

						{this.votingDiv()}

					{/* For now just using textarea, but should replace with a component that is not double click */}
						<textarea id="body"
							rows="4" cols="50"
						>
							{this.comment.body} 
						</textarea>

						<input type="submit" value="Save Comment" />
					</form>
				</div>
			)
		}
		else {
			return ( {
				<div class = 'static_comment'> 
					<div class="static_comment_time">
						<span>{this.props.begin_time} - {this.props.end_time}</span>
					</div>

					{this.votingDiv()}

					<div class = "comment_body">
						{this.comment.body}
					</div>

					<span class="author">Written by: {this.user}</span>

				</div>
			});
		}
	}
}
