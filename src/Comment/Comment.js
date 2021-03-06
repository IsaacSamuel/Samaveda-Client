import React from 'react';
import CommentHelper from './CommentHelper'
import VoteIndicator from './VoteIndicator'
import PublicIndicator from './PublicIndicator'
import TimeIndicator from './TimeIndicator'


class Comment extends React.Component {
 	constructor(props) {
	    super(props)

	    this.state = {
	      begin_time: this.props.comment_data.begin_time,
	      end_time: this.props.comment_data.end_time,
	      is_public: this.props.comment_data.is_public,
	      score: this.props.comment_data.comment_score,
	      vote: this.props.comment_data.upvote,
	      owner: this.props.comment_data.owner
	    }

	    //this.parent = this.props.comment.parent //Pointer to the parent comment, if any
	    this.song_uri = this.props.comment_data.song_uri; //The unique identifier for the current song
	    this.body = this.props.comment_data.comment_body; 

	    this.setPublic = this.setPublic.bind(this);
	    this.setTime = this.setTime.bind(this);
	    this.setVote = this.setVote.bind(this);
	    this.isUserOwner = this.isUserOwner.bind(this);
	}

	setPublic() {
		this.state.setState(prevState => ({
			is_public : !prevState.is_public
		}));
	}

	setTime(new_begin_time, new_end_time) {
		this.setState({
			begin_time : new_begin_time,
			end_time : new_end_time
		});
	}


	setVote(user_vote) {
		this.setState({
			vote : user_vote
		});
	}


	handleSubmit() {
		//Do all the saving of our comment into json form, use helper to send to server

		let is_public = document.forms["new_comment_form"]["public"];
		this.state.setState({is_public : is_public})
		this.comment_body = document.forms["new_comment_form"]["comment_body"];

		let comment_json = {}

		comment_json = {
			"begin_time" : this.state.begin_time,
			"end_time" : this.state.end_time,
			"is_public" : this.state.is_public,
			"comment_body" : this.state.comment_body,
			"vote" : this.state.vote,
			
			"is_new" : false
		}

		CommentHelper.saveComment(comment_json)

	}

	isUserOwner() {
		/* If the user is the owner, return true */
		return true
	}

	render() {
		//If comment is owned by user, we need to generate TimeIndicator and PublicIndicator component and allow user to edit body
		if (this.isUserOwner) {
			return (
				<div class = 'comment'> 
					<form 
	            		onSubmit={this.handleSubmit}>

						< TimeIndicator 
							begin_time = {this.state.begin_time}
							end_time = {this.state.end_time}

							setTime = {this.setTime}
						/>
						< PublicIndicator
							isPublic = {this.state.is_public}
							setPublic = {this.setPublic}
						/>

						< VoteIndicator
							vote = {this.state.vote}
							score = {this.state.score}

							setVote = {this.setVote}
						/>

					{/* For now just using textarea, but should replace with a component that is not double click */}
						<textarea
							rows="4" cols="50"
							value = {this.body} />

						<input type="submit" value="Save Comment" />
					</form>
				</div>
			)
		}
		else {
			return ( 
				<div class = 'static_comment'> 
					<div class="static_comment_time">
						<span>{this.state.begin_time} - {this.state.end_time}</span>
					</div>

					{this.votingDiv()}

					<div class = "comment_body">
						{this.body}
					</div>

					<span class="author">Written by: {this.user}</span>

				</div>
			)
		}
	}
}

export default Comment;
