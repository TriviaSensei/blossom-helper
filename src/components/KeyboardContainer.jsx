import React from 'react';
import KeyRow from './keyboardContainer/KeyRow.jsx';
export default function KeyboardContainer(props) {
	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		[null, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
	];

	return (
		<div className="Keyboard-Container">
			{keys.map((k, i) => {
				return (
					<KeyRow
						key={i}
						keys={k}
						handleKeyPress={props.handleKeyPress}
					></KeyRow>
				);
			})}
		</div>
	);
}
