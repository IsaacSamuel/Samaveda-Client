import React from 'react';

function ErrorView(props) {
	let errorMessage = parseError(props.error)

	return (
		<div id="errorMessage">
			<h1>Sorry, we've encountered an error.</h1>
			<p>{errorMessage}</p>
		</div>
	)
}

function parseError(error) {
	if (error === "404") {
		return (
			<p><b>404 Error:</b> Page not found. Please try a different URL.</p>
		)
	}

	else {
		return (
			<p>Something went wrong on our end. Please try again, or contact an adminstrator.</p>
		)
	}
}

export default ErrorView;
