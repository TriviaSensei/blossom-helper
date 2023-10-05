import React from 'react';

export default function WordInput(props) {
	return (
		<div className="Word-Input">
			<div className="Word-Display-Container">
				<h3>Enter word:</h3>
				<div
					className={`Word-Display-Outer ${
						props.selectedObject === 7 && 'Selected'
					}`}
				>
					<div
						className="Word-Display"
						onClick={props.handleClick}
						data-object="entry"
						data-index={7}
					>
						<div onClick={props.handleClick} data-index={7}>
							{props.currentWord}
						</div>
					</div>
				</div>
				<button className="Clear-Button" onClick={props.handleClear}>Clear</button>
			</div>
		</div>
	);
}
