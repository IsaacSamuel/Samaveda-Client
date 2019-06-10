import React from 'react';

class VoteIndicator extends React.Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	vote : this.props.vote,
	    	score : this.props.score
	    };

	    this.upvote = this.upvote.bind(this);
	    this.downvote = this.downvote.bind(this);

	}

	upvote() {
		if (this.state.vote !== 1) {
			this.setState(prevState => ({
				vote : 1,
				score : (prevState.score + 1)
			}));

			this.props.setVote(this.state.vote);
		}
	}

	downvote() {
		if (this.state.vote !== -1) {
			this.setState(prevState => ({
				vote : -1,
				score : (prevState.score - 1)
			}));

			this.props.setVote(this.state.vote);
		}
	}


	render() {
		let upvoted = this.state.voted === 1
		let downvoted = this.state.voted === -1

		return (
			<div class="votes">
				<div class = {"upvote " + (upvoted ? "upvoted" : "")} onClick={this.upvote}></div>
					{this.votes}
				<div class = {"downvote " + (downvoted ? "downvoted" : "")} onClick={this.downvote}></div>
			</div>
		)
	}

}

export default VoteIndicator;