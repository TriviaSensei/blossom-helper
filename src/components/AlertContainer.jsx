import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertContainer(props) {
	return (
		<div className={`Alert-Container ${!props.show && 'Invisible'}`}>
			<Alert variant={props.variant}>{props.message}</Alert>
		</div>
	);
}
