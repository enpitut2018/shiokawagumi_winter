function main() {
	const word = getWord();
	console.log(word);
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
		var url = word ?
			`https://youtube-title-mecab.herokuapp.com/search/${word}` : `https://youtube-title-mecab.herokuapp.com/random`;
		request.open("GET", url);
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
	let html = `<div class="balloon" style="margin-top: 30px;"><div class="container with-title"><h3 class="title">たんご</h3>`
		+ `<p>${words[0]}, ${words[1]}, ${words[2]}, ${words[3]}</p></div>`;

	html += `<div class="container with-title"><h3 class="title">たいとる</h3>`;

	// shuffleとtitle
    var category = data.categoryId;
    switch(category)
    {
        case "1": //映画とアニメ
            words = _.shuffle(words);
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>『${words[0]}と${words[1]}』をレビュー</p>`;
            words = _.shuffle(words);
            html += `<p>『${words[0]}』から学んだ${words[1]}のこと</p>`;
            words = _.shuffle(words);
            html += `<p>【架空映画】『${words[0]}と${words[1]}』の架空予告やってみた</p>`;
        case "2": //自動車と乗り物
            words = _.shuffle(words);
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}で${words[1]}を100倍面白くする方法</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}で1人${words[1]}</p>`;
        case "10": //音楽、テンプレで
            words = _.shuffle(words);
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}で${words[1]}を100倍面白くする方法</p>`;
            words = _.shuffle(words);
            html += `<p>『${words[0]}』と『${words[1]}』を歌ってみた</p>`;
            words = _.shuffle(words);
            html += `<p>『${words[0]}』と『${words[1]}』を踊ってみた</p>`;
            words = _.shuffle(words);
            html += `<p>【声真似】『${words[0]}』と『${words[1]}』を歌ってみた</p>`;
            words = _.shuffle(words);
            html += `<p>『${words[0]}』と『${words[1]}』をヘリウムガス吸って歌ってみた</p>`;
        case "15":  //ペットと動物
            words = _.shuffle(words);
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}で${words[1]}サプライズ</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}と${words[1]}で遊んでみた</p>`;
            words = _.shuffle(words);
            html += `<p>\[完全${words[0]}\]${words[1]}必勝法</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}使って1人${words[1]}</p>`;
        case "17":  //スポーツ
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>\[完全勝利\]${words[1]}必勝法</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}で${words[1]}を100倍面白くする方法</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}使って1人${words[1]}</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}と${words[1]}で新しい競技を考えてみた</p>`;
        case "19": //旅行とイベント
            words = _.shuffle(words);
            html += `<p>${words[0]}で${words[1]}を100倍面白くする方法</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}使って1人${words[1]}</p>`;
            words = _.shuffle(words);
            html += `<p>${words[0]}の中心で${words[1]}への愛を叫ぶ</p>`;
            words = _.shuffle(words);
            html += `<p>【完全制覇】${words[1]}攻略法</p>`;
            
        default:
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
    }

	html += `</div>`;
	html += `</div>`;
	return html;
}

function displayView(view) {
	const result = document.getElementById("result");
	result.innerHTML = view;
}
