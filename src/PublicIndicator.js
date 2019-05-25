import React from 'react';


class PublicIndicator extends React.Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	is_public : this.props.is_public
	    };

	    this.setPublic = this.setPublic.bind(this);
	}

	switchPublic() {

		this.props.setVote()

	}


	render() {
		upvoted = this.state.voted == 1
		downvoted = this.state.voted == -1

		return (
			<div class="votes">
				<div class = {"upvote " + (upvoted ? "upvoted" : "")} onclick={this.upvote()}></div>
					{this.votes}
				<div class = {"downvote " + (downvoted ? "downvoted" : "")} onclick={this.downvote()}></div>
			</div>
		)
	}

}