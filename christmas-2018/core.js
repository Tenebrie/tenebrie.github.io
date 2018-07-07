// Database
var DB = {
	currentPage: 0,
	totalPages: 4,
	
	songFileFormat: '.ogg',
};

// Page initialization
window.onload = function() {
	// Score table
	initScoreTable();
	// Music list
	initMusicList(DB.currentPage);
	initMusicTable();
	performPageTransition();
	// Music controls
	initMusicControls();
	// Meta controls
	initMetaControls();
}

//=================================================================================
// Meta controls
//=================================================================================
function initMetaControls() {
	// Previous page
	document.getElementById("btn_pageLeft").addEventListener("click", function() {
		if (DB.currentPage > 0) {
			DB.currentPage -= 1;
			initMusicList(DB.currentPage);
			initMusicTable();
		}
		performPageTransition();
	});
	// Next page
	document.getElementById("btn_pageRight").addEventListener("click", function() {
		if (DB.currentPage < DB.totalPages - 1) {
			DB.currentPage += 1;
			initMusicList(DB.currentPage);
			initMusicTable();
		}
		performPageTransition();
	});
}

function performPageTransition() {
	// Title card
	if (DB.currentPage === 0) {
		document.getElementById("table_music_answer").innerHTML = 'Новогодний Конкурс "Угадай Мелодию 2018"!';
		// Find the BG image
		var bgImage = document.getElementsByClassName("background-image-blur")[0];
		// If the BG image has the blur, remove it
		if (bgImage !== undefined) {
			bgImage.classList.remove('background-image-blur');
		}
	}
	// First module
	else if (DB.currentPage === 1) {
		document.getElementById("table_music_answer").innerHTML = 'Первый тур!';
		// Find the BG image
		var bgImage = document.getElementsByClassName("background-image")[0];
		// If the image does not have the blur, add the blur
		if (bgImage !== undefined && !bgImage.classList.contains('background-image-blur') !== -1) {
			bgImage.classList.add("background-image-blur");
		}
	}
	// Second module
	else if (DB.currentPage === 2) {
		document.getElementById("table_music_answer").innerHTML = 'Второй тур!';
	}
	// Final module
	else if (DB.currentPage === 3) {
		document.getElementById("table_music_answer").innerHTML = 'Супер игра!';
	}
}

//=================================================================================
// Music controls
//=================================================================================
function initMusicControls() {
	// Play song
	document.getElementById("btn_songPlay").addEventListener("click", function() {
		if (loadedAudioId != selectedSongId) {
			if (loadedAudio != undefined && loadedAudio.paused == false) { loadedAudio.pause(); }
			loadedAudio = new Audio("music/" + selectedSongId + DB.songFileFormat);
		}
		loadedAudioId = selectedSongId;
		loadedAudio.volume = 1;
		loadedAudio.play();
	});
	// Pause
	document.getElementById("btn_songPause").addEventListener("click", function() {
		loadedAudio.pause();
	});
	// Stop
	document.getElementById("btn_songStop").addEventListener("click", function() {
		var volume = loadedAudio.volume;
		var timer = setInterval(function() {
			volume -= 0.01;
			loadedAudio.volume = volume;
			if (volume <= 0.01) {
				loadedAudio.pause();
				loadedAudio.currentTime = 0;
				clearInterval(timer);
			}
		}, 10);
	});
	// Reveal song
	document.getElementById("btn_songReveal").addEventListener("click", function() {
		document.getElementById("table_music_answer").innerHTML = selectedSongName;
		var volume = loadedAudio.volume;
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
		selectedSongId = null;
		selectedSongName = null;
	});
}

//=================================================================================
// Music table
//=================================================================================
var categoryList = [];
var musicList = [];
var selectedSongId = null;
var selectedSongName = null;
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

function initMusicList(page) {
	musicList = [];
	if (page === 1) {
		categoryList = ["Российская минутка", "Звучит не так", "Музыка из фильмов", "Победители Евровидения"];
		
		musicList.push(new Song(0, 100, "Григорий Лепс - Рюмка водки на столе"));
		musicList.push(new Song(0, 150, "Алла Пугачева - Волшебник-недоучка"));
		musicList.push(new Song(0, 200, "Машина Времени - Поворот"));
		musicList.push(new Song(0, 250, "Наутилус Помпилиус - Скованные одной цепью"));
		musicList.push(new Song(0, 300, "Аквариум - Город золотой (К/Ф \"Асса\")"));

		musicList.push(new Song(1, 100, "Jingle Bells (Грустная версия)"));
		musicList.push(new Song(1, 150, "Abney Park - Katyusha"));
		musicList.push(new Song(1, 200, "Benny Hill - Yakety Sax"));
		musicList.push(new Song(1, 250, "Dschinghis Khan - Moskau"));
		musicList.push(new Song(1, 300, "Bonnie Tyler - Holding Out For A Hero"));
		
		musicList.push(new Song(2, 100, "Гарри Поттер"));
		musicList.push(new Song(2, 150, "Пираты Карибского Моря"));
		musicList.push(new Song(2, 200, "Индиана Джонс"));
		musicList.push(new Song(2, 250, "Властелин Колец"));
		musicList.push(new Song(2, 300, "Игра Престолов"));
		
		musicList.push(new Song(3, 100, "Conchita Wurst - Rise Like a Phoenix (2014, Austria)"));
		musicList.push(new Song(3, 150, "Loreen - Euphoria (2012, Sweden)"));
		musicList.push(new Song(3, 200, "Marija Šerifović - Molitva (2007, Serbia)"));
		musicList.push(new Song(3, 250, "Måns Zelmerlöw - Heroes (2015, Sweden)"));
		musicList.push(new Song(3, 300, "Salvador Sobral - Amar Pelos Dois (2017, Portugal)"));
	}
	else if (page === 2) {
		categoryList = ["Потанцульки", "Классический Дисней", "M. J. Special", "Немного религии", "Вокруг света"];
		
		musicList.push(new Song(10, 200, "Los del Rio - Macarena"));
		musicList.push(new Song(10, 250, "Spice Girls - Wannabe"));
		musicList.push(new Song(10, 300, "The Weather Girls - It's Raining Men"));
		musicList.push(new Song(10, 350, "Kaoma - Lambada"));
		musicList.push(new Song(10, 400, "Ricky Martin - Livin' La Vida Loca"));

		musicList.push(new Song(11, 200, "Король Лев (1994)"));
		musicList.push(new Song(11, 250, "Красавица и чудовище (1991)"));
		musicList.push(new Song(11, 300, "Мулан (1998)"));
		musicList.push(new Song(11, 350, "Русалочка (1983)"));
		musicList.push(new Song(11, 400, "Робин Гуд (1973)"));
		
		musicList.push(new Song(12, 200, "Michael Jackson - Thriller"));
		musicList.push(new Song(12, 250, "Michael Jackson - Bad"));
		musicList.push(new Song(12, 300, "Michael Jackson - Billie Jean"));
		musicList.push(new Song(12, 350, "Michael Jackson - Black or White"));
		musicList.push(new Song(12, 400, "Michael Jackson - Earth Song"));
		
		musicList.push(new Song(13, 200, "AC/DC - Highway to Hell"));
		musicList.push(new Song(13, 250, "Depeche Mode - Personal Jesus"));
		musicList.push(new Song(13, 300, "Coolio - Gangsta's Paradise"));
		musicList.push(new Song(13, 350, "Guns N' Roses - Paradise City"));
		musicList.push(new Song(13, 400, "Two Steps From Hell - Heart of Courage"));
		
		musicList.push(new Song(14, 200, "Queen - Show Must Go On"));
		musicList.push(new Song(14, 250, "Eiffel 65 - Blue"));
		musicList.push(new Song(14, 300, "Rammstein - Amerika"));
		musicList.push(new Song(14, 350, "Daft Punk - Around The World"));
		musicList.push(new Song(14, 400, "a-ha - Take On Me"));
	}
	else if (page === 3) {
		categoryList = ["#1 (30 нот)", "#2 (26 нот)", "#3 (18 нот)", "#4 (37 нот)"];
		
		musicList.push(new Song(20, 1000, "Игра Престолов"));
		musicList.push(new Song(21, 1000, "Celine Dion - My Heart Will Go On"));
		musicList.push(new Song(22, 1000, "Scorpions - Wind of Change"));
		musicList.push(new Song(23, 1000, "Охотники за привидениями"));
	}
}

function initMusicTable(page) {
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
			var categoryName = (currentCategory > 9) ? categoryList[currentCategory % 10] : categoryList[currentCategory];
			content += "<td class='table_music_td vert-middle'><span class='songCatFont'>" + categoryName + "</span></td>";
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
		// Click function
		button.addEventListener("click", function() {
			selectedSongId = this.id.substring(4);
			var songCat = parseInt(selectedSongId.substring(0, 2));
			var songCost = parseInt(selectedSongId.substring(3));
			var songCatName = categoryList[songCat > 9 ? songCat % 10 : songCat];
			document.getElementById("table_music_answer").innerHTML = songCatName + " - " + songCost;
			// Find the song name
			for (var y = 0; y < musicList.length; y++) {
				if (musicList[y].category === songCat && musicList[y].cost === songCost) {
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
		if (playerScore.length <= i) {
			playerScore.push(0);
		}

		// Next row
		content += "<tr>";
		// Player name
		content += "<td id='player" + playerId + "' class='scoreFont'>";
		content += players[i] + ":";
		content += "</td>";
		// Player score
		content += "<td id='score" + playerId + "' class='scoreFont scoreFontRight'>";
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
	var playerId = parseInt(player);
	var scoreToAdd = 50;
	if (selectedSongId !== null && selectedSongId !== undefined) {
		scoreToAdd = parseInt(selectedSongId.substring(3));
	}
	playerScore[playerId] += scoreToAdd;
	updateScoreTable();
}

function subScore(player, i) {
	var playerId = parseInt(player);
	var scoreToAdd = 50;
	if (selectedSongId !== null && selectedSongId !== undefined) {
		scoreToAdd = parseInt(selectedSongId.substring(3));
	}
	playerScore[playerId] -= scoreToAdd;
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
