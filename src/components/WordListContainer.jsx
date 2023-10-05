import React from 'react';
import WordTile from './wordListContainer/WordTile.jsx';
const statusSort = ['Pending', 'Valid', 'Invalid'];

export default function WordListContainer(props) {
	const isPangram = (word) => {
		let toReturn = true;
		props.state.letters.some((l) => {
			if (word.toUpperCase().indexOf(l.toUpperCase()) < 0) {
				toReturn = false;
				return true;
			}
			return false;
		});
		return toReturn;
	};

	return (
		<div className="Word-List-Container">
			<div className="Word-List">
				{props.show === 'all'
					? props.state.wordList
							.sort((a, b) => {
								const as = statusSort.findIndex((w) => w === a.status);
								const bs = statusSort.findIndex((w) => w === b.status);
								if (as !== bs) return as - bs;
								return a.word.toLowerCase().localeCompare(b.word.toLowerCase());
							})
							.map((w, i) => {
								let bestLetter = '';
								let pangram = isPangram(w.word);
								let valid = true;
								let reason = '';
								const baseValue =
									w.word.length < 4
										? 0
										: w.word.length === 4
										? 2
										: w.word.length === 5
										? 4
										: w.word.length === 6
										? 6
										: 12 + 3 * (w.word.length - 7);
								let bestValue = baseValue;
								//if the word contains only valid letters
								if (w.word.indexOf(props.state.central) < 0) {
									valid = false;
									reason = 'Does not contain central letter';
								} else {
									const letters = w.word.split('');
									letters.some((l) => {
										if (l === props.state.central) return false;
										if (!props.state.letters.includes(l)) {
											valid = false;
											reason = `Letter ${l.toUpperCase()} is not allowed`;
											return true;
										}
										return false;
									});
								}
								//if the word is valid in length
								if (baseValue > 0) {
									//for each letter, figure out the value if that letter is highlighted
									props.state.letters.forEach((l) => {
										let value = baseValue;
										//count the occurrences
										let count = 0;
										for (var j = 0; j < w.word.length; j++) {
											if (w.word.charAt(j).toLowerCase() === l.toLowerCase())
												count++;
										}
										//5 points per occurrence
										value = value + count * 5;
										if (value > bestValue) {
											bestValue = value;
											bestLetter = l;
										} else if (value === bestValue) bestLetter = bestLetter + l;
									});
									//+7 for a pangram
									if (pangram) bestValue += 7;
								}

								return (
									<WordTile
										key={i}
										word={w.word.toUpperCase()}
										status={!valid ? 'Invalid' : w.status}
										reason={reason}
										note={`${
											pangram ? '🌈 ' : ''
										}(${bestLetter.toUpperCase()} = ${bestValue})`}
									></WordTile>
								);
							})
					: props.state.wordList.map((bucket, i) => {
							return bucket.map((word, j) => {
								return (
									<WordTile
										key={j}
										word={word.word.toUpperCase()}
										status="Valid"
										note={`${
											isPangram(word.word) ? '🌈 ' : ''
										} (${props.state.letters[i].toUpperCase()} = ${
											word.scores[i]
										})`}
									></WordTile>
								);
							});
					  })}
			</div>
		</div>
	);
}
//(${bestLetter.toUpperCase()} = ${bestValue})
