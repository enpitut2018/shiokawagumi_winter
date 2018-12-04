function main() {
	const word = getWord();
	getWords(word)
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
