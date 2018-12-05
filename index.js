function main() {
	// const word = getWord();
	const word = 'test';
	getWords(word)
		.then((words) => createView(words))
		.then((view) => displayView(view))
		.catch((error) => {
			console.error(`エラーが発生しました (${error})`);
		});
}

function getWords(word) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("GET", 'https://youtubetitleapitest.herokuapp.com/random');
			request.addEventListener("load", (event) => {
				if (event.target.status !== 200) {
					reject(new Error(`${event.target.status}: ${event.target.statusText}`));
				}

				const words = JSON.parse(event.target.responseText);

				console.log(words);

				resolve(words);
			});
			request.addEventListener("error", () => {
				reject(new Error("ネットワークエラー"));
			});
			request.send();
		});
}

function getWord() {
	const value = document.getElementById("word").value;
	return encodeURIComponent(value);
}

function createView(words) {
	let html = `<h4>Words</h4>` + `<p>${words[0]}, ${words[1]}, ${words[2]}, ${words[3]}</p>`;
	html += `<h4>Title</h4>`;

	// shuffleとtitle
	words = _.shuffle(words);
	html += `<p>${words[0]}と${words[1]}一気飲み</p>`;
	words = _.shuffle(words);
	html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
	words = _.shuffle(words);
	html += `<p>\[完全${words[0]}\]${words[1]}必勝法</p>`;
	words = _.shuffle(words);
	html += `<p>${words[0]}で${words[1]}を100倍面白くする方法</p>`;
	words = _.shuffle(words);
	html += `<p>${words[0]}使って1人${words[1]}</p>`;
	return html;
}

function displayView(view) {
	const result = document.getElementById("result");
	result.innerHTML = view;
}

function escapeSpecialChars(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
	return strings.reduce((result, string, i) => {
		const value = values[i - 1];
		if (typeof value === "string") {
			return result + escapeSpecialChars(value) + string;
		} else {
			return result + String(value) + string;
		}
	});
}
