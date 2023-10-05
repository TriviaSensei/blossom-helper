import React from 'react';

export default function WordTile(props) {
	return (
		<div
			className={`Word-Tile ${props.status}`}
			title={props.status === 'Invalid' ? props.reason : ''}
		>
			<div>{props.word}</div>
			{props.status === 'Valid' ? (
				<div>{props.note}</div>
			) : (
				<div>{props.reason}</div>
			)}
		</div>
	);
}
