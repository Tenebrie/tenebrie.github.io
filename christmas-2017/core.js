
// Page initialization
window.onload = function() {
	// Fullscreen
	// Score table
	initScoreTable();
	// Music list
	initMusicList();
	initMusicTable();
	// Music controls
	initMusicControls();
	// Answer window
	initAnswerWindow();
}

//=================================================================================
// Music controls
//=================================================================================
function initMusicControls() {
	// Play song
	document.getElementById("btn_songPlay").addEventListener("click", function() {
		if (loadedAudioId != selectedSongId) {
			if (loadedAudio != undefined && loadedAudio.paused == false) { loadedAudio.pause(); }
			loadedAudio = new Audio("music/" + selectedSongId + ".mp3");
		}
		loadedAudioId = selectedSongId;
		loadedAudio.play();
	});
	// Pause
	document.getElementById("btn_songPause").addEventListener("click", function() {
		loadedAudio.pause();
	});
	// Stop
	document.getElementById("btn_songStop").addEventListener("click", function() {
		loadedAudio.pause();
		loadedAudio.currentTime = 0;
	});
	// Reveal song
	document.getElementById("btn_songReveal").addEventListener("click", function() {
		document.getElementById("table_music_answer").innerHTML = selectedSongName;
		var volume = 1;
		var timer = setInterval(function() {
			volume -= 0.01;
			loadedAudio.volume = volume;
			if (volume <= 0.25) { clearInterval(timer); }
		}, 10);
	});
	// Hide song
	document.getElementById("btn_songHide").addEventListener("click", function() {
		var selectedElement = document.getElementById("song" + selectedSongId);
		selectedElement.style.visibility = "hidden";
	});
}

//=================================================================================
// Music table
//=================================================================================
var categoryList = ["Виниловая пластинка", "Eurovision 2016 Live", "Original Soundtrack", "По случаю", "Вечеринка", "Урок музыки", "Как повезёт"];
var musicList = [];
var selectedSongId = "";
var selectedSongName = "";
var loadedAudio;
var loadedAudioId;

class Song {
	constructor(cat, cost, name) {
		this.category = cat;
		this.cost = cost;
		this.name = name;
		this.path = ((cat > 9) ? cat : "0" + cat) + "_" + cost;
	}
}

function initMusicList() {
	musicList.push(new Song(0, 100, "Deep Purple - Smoke on the Water"));
	musicList.push(new Song(0, 150, "Pink Floyd - Another Brick in the Wall"));
	musicList.push(new Song(0, 200, "ABBA - Gimme! Gimme! Gimme!"));
	musicList.push(new Song(0, 250, "Eagles - Hotel California"));
	musicList.push(new Song(0, 300, "Kiss - I Was Made For Loving You"));

	musicList.push(new Song(1, 100, "Сергей Лазарев - You Are The Only One (Russia)"));
	musicList.push(new Song(1, 150, "IVAN - Help You Fly (Belarus)"));
	musicList.push(new Song(1, 200, "Jamala - 1944 (Ukraine)"));
	musicList.push(new Song(1, 250, "Poli Genova - If Love Was a Crime (Bulgaria)"));
	musicList.push(new Song(1, 300, "Dami Im - Sound Of Silence (Australia)"));

	musicList.push(new Song(2, 100, "Ghostbusters / Охотники за Привидениями"));
	musicList.push(new Song(2, 150, "Back to the Future / Назад в Будущее"));
	musicList.push(new Song(2, 200, "007: James Bond / Агент 007"));
	musicList.push(new Song(2, 250, "Mission Impossible / Миссия Невыполнима"));
	musicList.push(new Song(2, 300, "Star Wars / Звездные Войны"));

	musicList.push(new Song(3, 100, "Ирония Судьбы"));
	musicList.push(new Song(3, 150, "Пять минут"));
	musicList.push(new Song(3, 200, "We Wish You a Merry Christmas"));
	musicList.push(new Song(3, 250, "Jingle Bells"));
	musicList.push(new Song(3, 300, "Пётр Ильич Чайковский - Щелкунчик"));

	musicList.push(new Song(4, 100, "Дискотека Авария - Disco Superstar"));
	musicList.push(new Song(4, 150, "Филипп Киркоров - Диско-партизаны"));
	musicList.push(new Song(4, 200, "Бурановские Бабушки - Party for Everybody"));
	musicList.push(new Song(4, 250, "LMFAO - Party Rock Anthem"));
	musicList.push(new Song(4, 300, "PSY - Hangover"));

	musicList.push(new Song(5, 100, "Крылатые качели"));
	musicList.push(new Song(5, 150, "Учат в школе"));
	musicList.push(new Song(5, 200, "Пока часы 12 бьют"));
	musicList.push(new Song(5, 250, "Кабы не было зимы"));
	musicList.push(new Song(5, 300, "Умка"));

	musicList.push(new Song(6, 100, "Деревня Дураков"));
	musicList.push(new Song(6, 150, "Ylvis - What Does the Fox Say"));
	musicList.push(new Song(6, 200, "Эдуард Хиль - Песня без слов"));
	musicList.push(new Song(6, 250, "Lordi - Hard Rock Hallelujah (Instrumental)"));
	musicList.push(new Song(6, 300, "Людвиг ван Бетховен - Ода к Радости"));
}

function initMusicTable() {
	var table = document.getElementById("table_music");
	var currentCategory = -1;
	var content = "";
	for (var i = 0; i < musicList.length; i++) {
		var rowId = (currentCategory > 9) ? currentCategory : "0" + currentCategory;
		// Start next row
		if (musicList[i].category > currentCategory) {
			// Update category id
			currentCategory = musicList[i].category;
			rowId = (currentCategory > 9) ? currentCategory : "0" + currentCategory;
			// We're just starting
			if (i != 0) { content += "</tr>"; }
			// New row
			content += "<tr>";
			// Category name
			content += "<td class='table_music_td vert-middle'><span class='songCatFont'>" + categoryList[currentCategory] + "</span></td>";
		}
		// Current song
		content += "<td class='table_music_td vert-middle'><button id='song" + rowId + "_" + musicList[i].cost + "' class='btn btn-song btn-primary songBtnFont'>" + musicList[i].cost + "</button></td>";
	}
	// Close the last row
	content += "</tr>";
	// Flush contents
	table.innerHTML = content;
	// Add event handlers
	for (var i = 0; i < musicList.length; i++) {
		var rowId = (musicList[i].category > 9) ? musicList[i].category : "0" + musicList[i].category;
		var fullId = rowId + "_" + musicList[i].cost;
		var button = document.getElementById("song" + fullId);
		button.addEventListener("click", function() {
			selectedSongId = this.id.substring(4);
			var songCat = parseInt(selectedSongId.substring(0, 2));
			var songCost = parseInt(selectedSongId.substring(3));
			document.getElementById("table_music_answer").innerHTML = categoryList[songCat] + " - " + songCost;
			for (var y = 0; y < musicList.length; y++) {
				if (musicList[y].category == songCat && musicList[y].cost == songCost) {
					selectedSongName = musicList[y].name;
					break;
				}
			}
		});
	}
}


//=================================================================================
// Score table
//=================================================================================
var playerScore = [];
var players = ["Моника", "Саша", "Сергей", "Стелла", "Мартин"];

function initScoreTable() {
	var table = document.getElementById("table_score");
	var content = "";
	for (var i = 0; i < players.length; i++) {
		var playerId = (i > 9) ? i : "0" + i;
		playerScore.push(0);

		// Next row
		content += "<tr>";
		// Player name
		content += "<td id='player" + playerId + "' class='scoreFont'>";
		content += players[i] + ":";
		content += "</td>";
		// Player score
		content += "<td id='score" + playerId + "' class='scoreFont'>";
		content += "0";
		content += "</td>";
		// Buttons
		content += "<td>";
		content += "<button id='scoreplus" + playerId + "' class='btn btn-score'><span class='glyphicon glyphicon-plus'></span></button> <button id='scoreminus" + playerId + "' class='btn btn-score'><span class='glyphicon glyphicon-minus'></span></button>";
		content += "</td>";
		// Close the row
		content += "</tr>";
	}
	table.innerHTML = content;
	// Register the event handlers
	for (var i = 0; i < players.length; i++) {
		var playerId = (i > 9) ? i : "0" + i;
		document.getElementById("scoreplus" + playerId).addEventListener("click", function(){ addScore(this.id.substring(9)); });
		document.getElementById("scoreminus" + playerId).addEventListener("click", function(){ subScore(this.id.substring(10)); });
	}
}

function addScore(player) {
	player = parseInt(player);
	playerScore[player] += 50;
	updateScoreTable();
}

function subScore(player, i) {
	player = parseInt(player);
	playerScore[player] -= 50;
	updateScoreTable();
}

function updateScoreTable() {
	for (var i = 0; i < players.length; i++) {
		var playerId = (i > 9) ? i : "0" + i;
		var display = document.getElementById("score" + playerId);
		display.innerHTML = playerScore[i];
	}
}

//=================================================================================
// Console controls
//=================================================================================
function table(cmd, arg) {
	if (cmd === 'add') {
		players.push(arg);
		initScoreTable();
	}
	else if (cmd === 'remove') {
		var index = parseInt(arg);
		if (index >= 0 && index < players.length) {
			players.splice(index, 1);
			playerScore.splice(index, 1);
			initScoreTable();
		}
		else {
			console.error('Incorrect index!');
		}
	}
	else if (cmd === 'reset') {
		playerScore = [];
		initScoreTable();
	}
	else if (cmd === 'render') {
		initScoreTable();
	}
	return 'Success!';
}

//=================================================================================
// Fullscreen stuff
//=================================================================================
var isFullScreen = false;
function startFullScreen() {
	isFullScreen = true;
	document.getElementById("btn_fullscreen_icon").className = "glyphicon glyphicon-resize-small";
	launchFullScreen(document.documentElement);
}

function stopFullScreen() {
	isFullScreen = false;
	document.getElementById("btn_fullscreen_icon").className = "glyphicon glyphicon-resize-full";
	cancelFullScreen(document.documentElement);
}

function btn_fullscreen_onclick() {
	if (isFullScreen == true) { stopFullScreen(); }
	else { startFullScreen(); }
}

// Fullscreen functions
function launchFullScreen(element) {
	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}

function cancelFullScreen() {
	if (document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}
