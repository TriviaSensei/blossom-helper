const scoreWord = (word, letter) => {
	let score =
		word.length < 4
			? 0
			: word.length === 4
			? 2
			: word.length === 5
			? 4
			: word.length === 6
			? 6
			: 12 + 3 * (word.length - 7);

	if (score === 0) return 0;

	const uniqueLetters = [];
	const letters = word.split('');
	letters.forEach((l) => {
		if (l === letter) score += 5;
		if (!uniqueLetters.includes(l)) uniqueLetters.push(l);
	});
	if (uniqueLetters.length === 7) score += 7;
	return score;
};

const sortBy = (n) => {
	return (a, b) => {
		return b.scores[n] - a.scores[n];
	};
};

const getScore = (bck) => {
	let score = 0;
	bck.forEach((b, i) => {
		b.sort(sortBy(i));
		for (var j = 0; j < Math.min(b.length, 2); j++) {
			score = score + b[j].scores[i];
		}
	});
	return score;
};

const arrangeWords = (bck) => {
	const nodesToVisit = [bck];
	let bestTry = bck.map((b) => {
		return [];
	});
	let bestScore = 0;
	let loops = 0;
	while (nodesToVisit.length > 0 && loops < 500) {
		loops++;
		const currentNode = nodesToVisit.shift();
		const currentScore = getScore(currentNode);
		//calculate the score of the current try
		if (currentScore > bestScore) {
			bestTry = [...currentNode];
			bestScore = currentScore;
		}
		//make every possible move and see if that score is better
		const children = [];
		currentNode.forEach((b1, i) => {
			currentNode.forEach((b2, j) => {
				if (i === j) return;
				//for each source bucket
				b1.forEach((v, k) => {
					const newNode = JSON.parse(JSON.stringify(currentNode));
					//remove v from b1;
					const removed = newNode[i].splice(k, k + 1);
					newNode[j].push(removed[0]);
					children.push(newNode);
					// if (children.length <= 10) {
					// 	console.log(`Moving ${removed[0]} from ${i} to ${j}`);
					// 	console.log(newNode);
					// 	console.log('--------');
					// }
				});
			});
		});
		children.forEach((c) => {
			if (getScore(c) > currentScore) nodesToVisit.unshift(c);
		});
	}
	return bestTry.map((w) => {
		return w.filter((w2, i) => {
			return i <= 1;
		});
	});
};

//get the optimal scoring arrangement for this word list
export function score(wordList, letters) {
	const buckets = [];
	let words = [];
	letters.forEach((l) => buckets.push([]));
	wordList.forEach((word) => {
		if (word.status !== 'Valid') return;
		let v = [];
		letters.forEach((letter) => {
			v.push(scoreWord(word.word, letter));
		});
		words.push({ word: word.word, scores: v });
	});

	words.forEach((word) => {
		const maxInd = word.scores.reduce(
			(p, c, i) => {
				if (c > p.val) {
					return {
						ind: i,
						val: c,
					};
				} else {
					return p;
				}
			},
			{ ind: -1, val: 0 }
		);
		buckets[maxInd.ind].push(word);
	});

	return arrangeWords(buckets);
}
