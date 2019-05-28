import React from 'react';

class TimeIndicator extends React.Component {
	/* A simple child component of a comment that has two functions:
		1.) Display the start and end time that a comment is referring to for a particular song.
		2.) If the comment belongs to the user, allow the user to double click on the component and enter a custom time
				that falls within the duration of the song.
	*/

	constructor(props) {
	    super(props);

	    this.state = {
	    	editting : this.props.is_new_comment,
	    	error : false
	    };

	    this.begin_time = this.props.begin_time;
	    this.end_time = this.props.end_time

	    this.setNewTime = this.setNewTime.bind(this);

	}


	static validateNewBeginTime(input){
		/* Checks to make sure input is:
			1.) A valid time in the format XX:XX where X are numerals
			2.) If end time exists, checks to make sure it is less than it (comes before it in time)
			3.) Checks to makes sure the song is within the duration of the song (e.g. you cannot comment
					on 2:45 of a song if the song is only 1:45 long.)
		*/

		return true; //Build validation later
	}



	static validateNewEndTime(input){
		/* Checks to make sure input is:
			1.) A valid time in the format XX:XX where X are numerals
			2.) Checks to makes sure the song is within the duration of the song (e.g. you cannot comment
					on 2:45 of a song if the song is only 1:45 long.)
		*/

		return true; //Build validation later
	}

	setNewTime(new_begin_time, new_end_time) {
		//Validates the new times and passes them up to the parent component. 
		if (TimeIndicator.setNewBeginTime(new_begin_time) && TimeIndicator.validateNewEndTime(new_end_time)) {
			this.props.setTime(new_begin_time, new_end_time);

			this.state.setState({
				error : false
			});
		}
		else {
			//Some error in input
			this.state.setState({
				error : true
			});
		}
	}

	/*Needs some sort of detection mechanism when user changes form--enter key, unfocus, or submit button? 
		Or just bind it, but then error will display on the first character the user enters.*/

	OnDoubleClick(event) {
		//User wants to edit the time

	}


	render () {

		if (this.state.editting == false) {
			return (
				<div class = "display_comment_time">
					<span>{this.props.begin_time} - {this.props.end_time}</span>
				</div>
			)
		}
		else {
			return (
				<div class = "display_comment_time_form">
					<span> 
						<input type="text" name="comment_begin_time" value={this.begin_time} /> {/*Add ref to avoid detect collisions?}*/}
						<input type="text" name="comment_end_time" value={this.end_time} />
					</span>
				</div>
			)
		}

	}
}

export default TimeIndicator;