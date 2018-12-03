function getTitle(word) {
	const request = new XMLHttpRequest();
	request.open("GET", 'https://youtubetitleapitest.herokuapp.com/random');
	request.addEventListener("load", (event) => {
		if (event.target.status !== 200) {
			console.log(`${event.target.status}: ${event.target.statusText}`);
			return;
		}
		console.log(event.target.status);
		console.log(event.target.responseText);
	});
	request.addEventListener("error", () => {
		console.error("Network Error");
	});
	request.send();
}
