class VoteIndicator extends React.Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	vote : this.props.vote,
	    	score : this.props.score
	    };

	    this.setNewVote = this.setNewVote.bind(this);
	}

	upvote() {
		if (this.state.vote != 1) {
			this.state.setState({
				vote : 1
				score : score + 1
			});

			this.props.setVote(this.state.vote);
		}
	}

	downvote() {
		if (this.state.vote != -1) {
			this.state.setState({
				vote : -1
				score : score -1 1
			});

			this.props.setVote(this.state.vote);
		}
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