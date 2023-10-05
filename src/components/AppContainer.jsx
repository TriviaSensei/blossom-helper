import React, { useState } from 'react';
import FlowerContainer from './FlowerContainer.jsx';
import WordListController from './WordListController.jsx';
import WordListContainer from './WordListContainer.jsx';
import KeyboardContainer from './KeyboardContainer.jsx';
import AlertContainer from './AlertContainer.jsx';
import useTimeout from './hooks/useTimeout.jsx';

import { score } from '../utils/scoring.jsx';
import axios from 'axios';

const messageTimeout = 1500;

export default function AppContainer() {
	const [state, setState] = useState({
		wordList: [],
		letters: ['', '', '', '', '', ''],
		central: '',
		selectedObject: 0,
	});

	const [currentWord, setCurrentWord] = useState('');

	const [messageState, setMessageState] = useState({
		show: false,
		variant: '',
		message: '',
	});

	const [show, setShow] = useState('all');

	const letters = 'abcdefghijklmnopqrstuvwxyz';

	//TODO: hit the MW API to see if word is legal
	async function checkWord(word) {
		const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_DICTIONARY_API_KEY}`;
		const result = await axios.get(url);
		const offensive = result.data.some((d) => {
			return d.meta?.offensive;
		});
		const isWord = result.data.some((d) => {
			return d.fl;
		});
		const valid =
			isWord &&
			result.data.some((d) => {
				return (
					d?.fl !== 'abbreviation' &&
					d?.fl !== 'trademark' &&
					d?.fl?.indexOf('name') < 0
				);
			});
		if (isWord && !offensive && valid) {
			setState((prev) => {
				return {
					...prev,
					wordList: prev.wordList.map((w) => {
						if (word.toUpperCase() === w.word.toUpperCase()) {
							return {
								...w,
								status: 'Valid',
							};
						}
						return w;
					}),
				};
			});
			return;
		} else if (!isWord) {
			setMessageState({
				show: true,
				variant: 'danger',
				message: `${word.toUpperCase()} is not valid.`,
			});
		} else if (offensive) {
			setMessageState({
				show: true,
				variant: 'danger',
				message: `Offensive words are not valid.`,
			});
		} else {
			setMessageState({
				show: true,
				variant: 'danger',
				message: `Abbreviations and proper names are not valid.`,
			});
		}
		setState((prev) => {
			return {
				...prev,
				wordList: prev.wordList.filter((w) => {
					return w.word.toUpperCase() !== word.toUpperCase();
				}),
			};
		});
	}

	function submitWord(word) {
		if (
			!state.central ||
			state.letters.some((l) => {
				return l === '';
			})
		) {
			setMessageState({
				show: true,
				variant: 'danger',
				message: `You must fill in all petals and the center letter before submitting words.`,
			});
		} else if (word.trim().length < 4) {
			setMessageState({
				show: true,
				variant: 'danger',
				message: `Words must be at least 4 letters long.`,
			});
		} else {
			const arr = word.toLowerCase().split('');
			let invalidLetter;
			if (
				arr.some((l) => {
					if (state.central !== l && !state.letters.includes(l)) {
						invalidLetter = l;
						return true;
					}
					return false;
				})
			) {
				setMessageState({
					show: true,
					variant: 'danger',
					message: `Letter ${invalidLetter.toUpperCase()} is not allowed.`,
				});
			} else if (word.toLowerCase().indexOf(state.central.toLowerCase()) < 0) {
				setMessageState({
					show: true,
					variant: 'danger',
					message: `You must use the letter ${state.central.toUpperCase()}.`,
				});
			} else {
				if (
					state.wordList.some((w) => {
						return w.word.toLowerCase() === word.toLowerCase();
					})
				) {
					setMessageState({
						show: true,
						variant: 'danger',
						message: `${word.toUpperCase()} has already been used.`,
					});
				} else {
					setCurrentWord('');
					setState((prev) => {
						return {
							...prev,
							wordList: [...prev.wordList, { word, status: 'Pending' }],
						};
					});
					checkWord(word);
				}
			}
		}
	}

	useTimeout(
		() => {
			setMessageState({
				show: false,
				variant: '',
				message: '',
			});
		},
		messageState.show ? messageTimeout : 0
	);

	function handleKeyPress(e) {
		e.stopPropagation();
		let key = e.key?.toLowerCase() || e.target.getAttribute('data-key');
		if (!key) return;
		if (key === 'backspace' || key === 'delete') key = 'del';
		if (key === 'return') key = 'enter';
		//handle a deletion or entry
		if (state.selectedObject === 7) {
			if (key === 'del') {
				//delete a letter
				setCurrentWord(currentWord.substring(0, currentWord.length - 1));
			} else if (key === 'enter' && currentWord) {
				//submit the current word
				submitWord(currentWord);
			} else if (key === 'escape') {
				setCurrentWord('');
			} else if (key.length === 1 && letters.indexOf(key) >= 0) {
				//add a letter
				setCurrentWord(currentWord + key);
			}
		} else if (state.selectedObject === 0) {
			//changing the central letter
			if (key === 'del') {
				setState((prev) => {
					return {
						...prev,
						central: '',
					};
				});
			} else if (key.length === 1 && letters.indexOf(key) >= 0) {
				if (state.letters.includes(key)) {
					//no duplicate letters
					setMessageState({
						show: true,
						variant: 'danger',
						message: `You may not have a duplicate letter in the puzzle.`,
					});
				} else {
					//set the central letter
					let newSelection;

					const empty = state.letters.findIndex((l) => {
						return l === '';
					});
					if (empty !== -1) newSelection = empty + 1;
					else newSelection = 7;

					setState((prev) => {
						return {
							...prev,
							central: key.toLowerCase(),
							selectedObject: newSelection,
						};
					});
				}
			}
		} else if ([1, 2, 3, 4, 5, 6].includes(state.selectedObject)) {
			const ind = state.selectedObject - 1;
			const newArray = [...state.letters];
			if (key === 'del') {
				newArray.splice(ind, 1, '');
				setState((prev) => {
					return {
						...prev,
						letters: newArray,
						selectedObject:
							prev.letters[ind] === '' ? ind : prev.selectedObject,
					};
				});
			} else if (
				state.central === key ||
				state.letters.some((l, i) => {
					return l === key && i !== ind;
				})
			) {
				//no duplicate letters
				setMessageState({
					show: true,
					variant: 'danger',
					message: `You may not have a duplicate letter in the puzzle.`,
				});
			} else if (key.length === 1 && letters.indexOf(key) >= 0) {
				//set a letter
				newArray.splice(ind, 1, key.toLowerCase());
				let newSelection;

				const empty = state.letters.findIndex((l, i) => {
					return l === '' && i !== ind;
				});
				if (empty !== -1) newSelection = empty + 1;
				else if (!state.central) newSelection = 0;
				else newSelection = 7;

				setState((prev) => {
					return {
						...prev,
						letters: newArray,
						selectedObject: newSelection,
					};
				});
			}
		}

		const obj = document.querySelector(`[data-key="${key}"]`);
		if (!obj || !e.key) return;
		obj.classList.add('Pressed');
	}

	function handleKeyUp(e) {
		let key = e.key?.toLowerCase();
		if (!key) return;
		if (key === 'backspace' || key === 'delete') key = 'del';
		const obj = document.querySelector(`.Key.Pressed[data-key="${key}"`);
		if (obj) obj.classList.remove('Pressed');
	}

	function handleObjectClick(e) {
		const index = e.target?.getAttribute('data-index');
		if (!index) return;

		const newSelection = Number(index);
		if (isNaN(newSelection)) return;

		setState((prev) => {
			return {
				...prev,
				selectedObject: newSelection,
			};
		});
	}

	let wordList =
		show === 'all' ? state.wordList : score(state.wordList, state.letters);

	return (
		<div
			tabIndex={-1}
			onKeyDown={handleKeyPress}
			onKeyUp={handleKeyUp}
			className="App-Container"
		>
			<AlertContainer
				show={messageState.show}
				variant={messageState.variant}
				message={messageState.message}
			></AlertContainer>
			<FlowerContainer
				state={{
					letters: state.letters,
					central: state.central,
					selectedObject: state.selectedObject,
					currentWord,
				}}
				handleClick={handleObjectClick}
				handleClear={() => {
					setCurrentWord('');
				}}
			></FlowerContainer>
			<WordListController
				state={{
					wordList,
				}}
				show={show}
				setShow={setShow}
			></WordListController>
			<WordListContainer
				show={show}
				state={{
					wordList,
					letters: state.letters,
					central: state.central,
				}}
			></WordListContainer>
			<KeyboardContainer handleKeyPress={handleKeyPress}></KeyboardContainer>
		</div>
	);
}
