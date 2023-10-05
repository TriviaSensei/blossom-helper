import React from 'react';
import Flower from './flowerContainer/Flower.jsx';
import WordInput from './flowerContainer/WordInput.jsx';

export default function FlowerContainer(props) {
	return (
		<div className="Flower-Container">
			<Flower state={props.state} handleClick={props.handleClick}></Flower>
			<WordInput
				selectedObject={props.state.selectedObject}
				currentWord={props.state.currentWord}
				handleClick={props.handleClick}
				handleClear={props.handleClear}
			></WordInput>
		</div>
	);
}
