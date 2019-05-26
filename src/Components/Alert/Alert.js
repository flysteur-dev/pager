import React from 'react';
import PropTypes from 'prop-types';
import './Alert.scss';

// NewUserAlert
// Onboarding
// Provide help by adding first feed link
const NewUserAlert = props => (
	<div className="App-Alert">
		<div className="App-Alert-Title">Seems like you are new here ?</div>
		<div className="App-Alert-Content">Let me help you by adding new contents for you :-)</div>
		<div className="App-Alert-Actions">
			<button onClick={props.triggerOK}>OK</button>
		</div>
	</div>
);

NewUserAlert.propTypes = {
	triggerOK: PropTypes.func.isRequired
};

export {
	NewUserAlert
};