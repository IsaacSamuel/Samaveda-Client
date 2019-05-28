import React from 'react';


class PublicIndicator extends React.Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	is_public : this.props.is_public
	    };

	    this.switchPublic = this.switchPublic.bind(this);
	}

	switchPublic() {

		this.props.setVote()

	}


	render() {
		return (
			<div class={"public " + (this.state.is_public ? "active" : "inactive") }>
			</div>
		)
	}

}

export default PublicIndicator;