import React from 'react';
import Key from './Key.jsx';

export default function KeyRow(props) {
	return (
		<div className="Key-Row">
			{props.keys.map((k, i) => {
				return (
					<Key key={i} handleKeyPress={props.handleKeyPress} content={k}></Key>
				);
			})}
		</div>
	);
}
