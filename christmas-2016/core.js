
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
}

//=================================================================================
// Music controls
//=================================================================================
function initMusicControls() {
	// Play song
	document.getElementById("btn_songPlay").addEventListener("click", function() {
		if (loadedAudioId != selectedSongId) {
			if (loadedAudio != undefined && loadedAudio.paused == false) { loadedAudio.pause(); }
			loadedAudio = new Audio("music/" + selectedSongId + ".ogg");
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
			if (volume <= 0.10) { clearInterval(timer); }
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
var categoryList = ["Дискотека 80х", "Кинематограф", "Классическая классика", "Ну это все знают", "Танцевальная", "Дела государственные", "Особое место"];
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
	musicList.push(new Song(0, 100, "Максим Леонидов - Девочка-видение"));
	musicList.push(new Song(0, 200, "Boney M - Rasputin"));
	musicList.push(new Song(0, 300, "Веселые Ребята - Уходило лето"));
	musicList.push(new Song(0, 400, "Земляне - Трава у дома"));

	musicList.push(new Song(1, 100, "Джентельмены удачи"));
	musicList.push(new Song(1, 200, "У природы нет плохой погоды (Служебный роман)"));
	musicList.push(new Song(1, 300, "Кин-Дза-Дза"));
	musicList.push(new Song(1, 400, "В бой идут одни старики"));

	musicList.push(new Song(2, 100, "Ричард Вагнер - Полет валькирий"));
	musicList.push(new Song(2, 200, "Моцарт - Симфония №40, часть 1"));
	musicList.push(new Song(2, 300, "Эдвард Григ - В пещере Горного Короля"));
	musicList.push(new Song(2, 400, "Иоганн Себастьян Бах - Токката и фуга ре минор"));

	musicList.push(new Song(3, 100, "PSY - Gangnam Style"));
	musicList.push(new Song(3, 200, "Yolanda be Cool - Papa Americano"));
	musicList.push(new Song(3, 300, "Michael Jackson - Billie Jean"));
	musicList.push(new Song(3, 400, "Пьер Нарцисс - Шоколадный Заяц"));

	musicList.push(new Song(4, 100, "Александр Рыбак - Fairytale (Remix)"));
	musicList.push(new Song(4, 200, "Дискотека Авария - Пей Пиво"));
	musicList.push(new Song(4, 300, "Виктор Цой - Звезда по имени Солнце (Remix)"));
	musicList.push(new Song(4, 400, "Crazy Frog - Axel F"));

	musicList.push(new Song(5, 100, "Государственный гимн СССР"));
	musicList.push(new Song(5, 200, "Государственный гимн США"));
	musicList.push(new Song(5, 300, "Государственный гимн Эстонской ССР"));
	musicList.push(new Song(5, 400, "Государственный гимн Израиля"));

	musicList.push(new Song(6, 100, "Игорь Корнелюк - Город, которого нет"));
	musicList.push(new Song(6, 200, "Britney Spears - Toxic"));
	musicList.push(new Song(6, 300, "Queen - We Will Rock You"));
	musicList.push(new Song(6, 400, "Joe Dassin - L'ete Indien"));
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
		content += "<td id='score" + playerId + "' class='scoreFont  scoreFontRight'>";
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