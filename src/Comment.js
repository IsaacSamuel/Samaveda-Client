import React from 'react';

class Comment extends React.Component {
 {
 	constructor(props) {
	    super(props)

	    this.state = {
	      begin_time: this.props.begin_time,
	      end_time: this.props.end_time,
	      is_public: this.props.is_public,
	      score: this.props.comment_score,
	      upvoted: this.props.upvoted
	      owner: this.props.owner
	    }

	    this.parent = this.props.parent //Pointer to the parent comment, if any
	    this.song_uri = this.props.song_uri; //The unique identifier for the current song
	    this.body = this.props.comment_body; 

	    this.setPublic = this.setBegin.bind(this);
	    this.setBegin = this.setBegin.bind(this);
	    this.setEnd = this.setEnd.bind(this);
	    this.upvote = this.upvote.bind(this);
	    this.downvote = this.downvote.bind(this);
	    this.isUserOwner = this.isUserOwner.bind(this);
	}

	function setPublic() {
		/* Change public status, send to server */
	}

	function setBegin(new_begin_time) {
		/* Change begin time, sends to server */
	}

	function setEnd(new_end_time) {
		/* Change end time, sends to server */
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

	function isUserOwner() {
		/* If the user is the owner, return true */
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
		return (
			<div class = 'comment'> 
				<form action="/submitComment" 
           	 		method="post" 
            		onSubmit={this.handleSubmit}>

					< TimeIndicator 
						beginTime = {this.begin}
						endTime = {this.end}
					/>
					< PublicIndicator
						isPublic = {this.is_public}
					/>

					<div class="votes">
						<div class = "upvote"></div>
						{this.votes}
						<div class = "downvote"></div>
					</div>

					< textarea id="body"
						rows="4" cols="50"
					>
					<input type="submit" value="Save Comment" />
				</form>
			</div>)
	}
}
