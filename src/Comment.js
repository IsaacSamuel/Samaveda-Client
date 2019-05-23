import React from 'react';

class Comment extends React.Component {
 {
 	constructor(props) {
	    super(props)

	    this.state = {
	      begin_time: this.props.comment.begin_time,
	      end_time: this.props.comment.end_time,
	      is_public: this.props.comment.is_public,
	      score: this.props.comment.comment_score,
	      upvoted: this.props.comment.upvoted
	      downvoted: this.props.comment.downvoted
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

	function setPublic() {
		/* Change public status, send to server */
	}

	function setTime(new_begin_time, new_end_time) {
		/* Change begin time, sends to server */
	}

	function newComment(comment) {
		/* Create new comment and add a pointer to it to the subcomments */
	}

	function upvote() {
		/* Send upvote to server, return new score, set votes to new score */
	}

	function downvote() {
		/* Send downvote to server, return new score, set votes to new score */
	}

	function sendChange(field, value) {
		/* Send a change to the server, return response */

		//Create POST request to /comment
	}

	function handleSubmit(event) {
		//Do all the saving or comment generation
	}

	function isUserOwner() {
		/* If the user is the owner, return true */
	}

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

	//How we ultimately want this to display--not a function we'll actually use
	function toString() {
		return (
			<div class="comment">
				<span>{this.begin} - {this.end}</span>
				<div class={this.is_public ? "public" : "private"}></div>
				<div class="votes">
					<div class = "upvote"></div>
						{this.votes}
					<div class = "downvote"></div>
				</div>
				<div class="comment_body">{this.body}</div>
				<span class="user">Written by: {this.user}</span>
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
							beginTime = {this.begin}
							endTime = {this.end}

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
				</div>
			});
		}
	}
}
