import React from 'react';

export default function WordListController(props) {
	// const [state, setState] = useState('all');

	function toggleState(e) {
		props.setShow(e.target.value);
	}

	return (
		<div className="Word-List-Controller">
			<div>
				<div>Show words: </div>
				<input
					name="show"
					type="radio"
					id="show-all"
					value="all"
					defaultChecked={true}
					onChange={toggleState}
				></input>
				<label htmlFor="show-all">All</label>
				<input
					name="show"
					type="radio"
					id="show-best"
					value="best"
					onChange={toggleState}
				></input>
				<label htmlFor="show-best">Best</label>
			</div>
			<div>
				<div>{props.show === 'all' ? 'Words:' : 'Score'}</div>
				<div style={{ textAlign: 'right' }}>
					{props.show === 'all'
						? props.state.wordList.length
						: props.state.wordList.reduce((prev, currentBucket, i) => {
								return (
									prev +
									currentBucket.reduce((prev, word, j) => {
										return prev + word.scores[i];
									}, 0)
								);
						  }, 0)}
				</div>
			</div>
		</div>
	);
}
