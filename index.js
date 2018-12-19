function generateTitle() {
  const word = document.getElementById("js-word").value;
  document.getElementById("js-title-button").disabled = "disabled";
  getWords(word)
    .then((data) => createView(data))
    .then((view) => displayView(view))
    .catch((error) => {
      console.error(`エラーが発生しました (${error})`);
    });
}

function getMovies() {
  const words = document.getElementsByClassName("js-words");
  console.log(words);
  document.getElementById("js-movie-button").style.display ="none";
  getMovieIds(words)
    .then((data) => createMovieView(data))
    .then((view) => displayMovieView(view))
    .catch((error) => {
     console.error(`エラーが発生しました (${error})`);
    });
}

function getWords(word) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    let url = word ?
      `https://youtube-title-mecab.herokuapp.com/search?word=${word}` : `https://youtube-title-mecab.herokuapp.com/random`;
    request.open("GET", url);
    request.addEventListener("load", (event) => {
      if (event.target.status !== 200) {
        reject(new Error(`${event.target.status}: ${event.target.statusText}`));
      }

      const data = JSON.parse(event.target.responseText);
      console.log(data);
      resolve(data);
    });
    request.addEventListener("error", () => {
      reject(new Error("ネットワークエラー"));
    });
    request.send();
  });
}

function createView(data) {
  let words = data.words;
  let html = `<div class="balloon" style="margin-top: 30px;"><div class="container with-title"><h3 class="title">たんご</h3>`
    + `<p><var class="js-words">${words[0]}</var>, <var class="js-words">${words[1]}</var>, <var class="js-words">${words[2]}</var>, <var class="js-words">${words[3]}</var></p></div>`;

  html += `<div class="container with-title"><h3 class="title">たいとる</h3>`;

  // 入力した単語はタイトルに含める
  let word = words[0];
  words.shift()

  // shuffleとtitle
  switch(data.categoryId)
  {
    case "1": //映画とアニメ
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>『${word}と${words[1]}』をレビュー</p>`;
      words = _.shuffle(words);
      html += `<p>『${word}』から学んだ${words[1]}のこと</p>`;
      words = _.shuffle(words);
      html += `<p>【架空映画】『${word}と${words[1]}』の架空予告やってみた</p>`;
        break;
    case "10": //音楽、テンプレで
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}を100倍面白くする方法</p>`;
      words = _.shuffle(words);
      html += `<p>『${word}』と『${words[1]}』を歌ってみた</p>`;
      words = _.shuffle(words);
      html += `<p>『${word}』と『${words[1]}』を踊ってみた</p>`;
      words = _.shuffle(words);
      html += `<p>【声真似】『${word}』と『${words[1]}』を歌ってみた</p>`;
      words = _.shuffle(words);
      html += `<p>『${word}』と『${words[1]}』をヘリウムガス吸って歌ってみた</p>`;
        break;
    case "15":  //ペットと動物
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}サプライズ</p>`;
      words = _.shuffle(words);
      html += `<p>${word}と${words[1]}で遊んでみた</p>`;
      words = _.shuffle(words);
      html += `<p>\[完全${word}\]${words[1]}必勝法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}使って1人${words[1]}</p>`;
        break;
    case "17":  //スポーツ
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>\[完全勝利\]${words[1]}必勝法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}を100倍面白くする方法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}使って1人${words[1]}</p>`;
      words = _.shuffle(words);
      html += `<p>${word}と${words[1]}で新しい競技を考えてみた</p>`;
        break;
    case "19": //旅行とイベント
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}を100倍面白くする方法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}使って1人${words[1]}</p>`;
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>【完全制覇】${words[1]}攻略法</p>`;
        break;
    
    case "20": //game
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>【完全${word}】${words[1]}必勝法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}を100倍面白くする方法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}使って1人${words[1]}</p>`;
      words = _.shuffle(words);
      html += `<p>【初見攻略】縛りで1人${word}</p>`;
        break;

    default:
      words = _.shuffle(words);
      html += `<p>${word}の中心で${words[1]}への愛を叫ぶ</p>`;
      words = _.shuffle(words);
      html += `<p>\[完全${word}\]${words[1]}必勝法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}で${words[1]}を100倍面白くする方法</p>`;
      words = _.shuffle(words);
      html += `<p>${word}使って1人${words[1]}</p>`;
      words = _.shuffle(words);
      html += `<p>【頑張った】${word}と${words[1]}を全力で自作</p>`;
        break;
  }

  html += `</div>`;
  html += `</div>`;
  return html;
}

function displayView(view) {
  const title = document.getElementById("title");
  title.innerHTML = view;
  // 生成ボタン有効
  document.getElementById("js-title-button").disabled = "";
  // 動画ボタン表示
  document.getElementById("js-movie-button").style.display ="";
}

function getMovieIds(words) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    let url =
      `https://youtube-title-mecab-test.herokuapp.com/movie?words=${words[0].innerHTML}&words=${words[1].innerHTML}&words=${words[2].innerHTML}&words=${words[3].innerHTML}`;
    console.log(url);
    request.open("GET", url);
    request.addEventListener("load", (event) => {
      if (event.target.status !== 200) {
        reject(new Error(`${event.target.status}: ${event.target.statusText}`));
      }
      const data = JSON.parse(event.target.responseText);
      console.log(data);
      resolve(data);
    });
    request.addEventListener("error", () => {
      reject(new Error("ネットワークエラー"));
    });
    request.send();
  });
}

function createMovieView(data) {
  let movieIds = data.url;
  let html = `<div class="balloon" style="margin-top: 30px;"><div class="container with-title"><h3 class="title">どうが</h3>`
  for (let i = 0; i < movieIds.length; i++) {
    html += `<iframe src="https://www.youtube.com/embed/${movieIds[i]}" frameborder="0" allowfullscreen></iframe>`
  }
  html += `</div>`;
  html += `</div>`;
  return html;
}

function displayMovieView(view) {
  const movie = document.getElementById("movies");
  movie.innerHTML = view;
}

