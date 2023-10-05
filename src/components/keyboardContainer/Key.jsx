import React from 'react';

export default function Key(props) {
	if (props.content === 'enter' || props.content === 'del') {
		return (
			<button
				className="Key Wide-Key"
				data-key={props.content}
				onClick={props.handleKeyPress}
			>
				<div
					className="Key-Contents"
					data-key={props.content}
					onClick={props.handleKeyPress}
				>
					{props.content.toUpperCase()}
				</div>
			</button>
		);
	} else if (props.content) {
		return (
			<button
				className="Key"
				data-key={props.content}
				onClick={props.handleKeyPress}
			>
				<div
					className="Key-Contents"
					data-key={props.content}
					onClick={props.handleKeyPress}
				>
					{props.content.toUpperCase()}
				</div>
			</button>
		);
	} else {
		return <div className="Key-Placeholder"></div>;
	}
}
