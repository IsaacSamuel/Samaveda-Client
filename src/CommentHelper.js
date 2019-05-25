import React from 'react';
import TimeIndicator from './TimeIndicator';


//A static class that generates a form for a new comment and handles form submission

class CommentHelper {

	//creates a (static) new comment form
	static newCommentForm(start_time, end_time) {
		return (
			<div class="new_comment">
				<form id="new_comment_form" onsubmit={CommentHelper.onSubmit()} >
					<span class="time">
						<input type="text" name="comment_begin_time">{begin_time ? begin_time : ""}></input> {/*Add ref to avoid detect collisions?}*/}
						<input type="text" name="comment_end_time">{end_time ? end_time : ""}></input>
					</span>
					<div class="is_public">
						<input type="hidden" name="public" value="true" />
					</div>				
					<textarea name="comment_body"
						rows="4" cols="50"></textarea>
					<input type="submit" value="Save Comment" />
				</form>
			</div>
		);
	}

	static saveComment(comment) {
		//Take comment JSON and send to server
		//Add whatever auth is required
	}

	static onSubmit() {
		let begin_time = document.forms["new_comment_form"]["comment_begin_time"];
		let end_time = document.forms["new_comment_form"]["comment_begin_time"];

		let is_public = document.forms["new_comment_form"]["public"];
		let comment_body = document.forms["new_comment_form"]["comment_body"];

		let comment_json = {}

		if (TimeIndicator.setNewBeginTime(begin_time) && TimeIndicator.validateNewEndTime(end_time)) {
			comment_json = {
				begin_time : begin_time,
				end_time : end_time,
				is_public : is_public
				comment_body : comment_body,
				
				is_new : true
			}

			saveComment(comment_json)
		}

		else {
			console.log("Error with time input.")
		}
	}

}