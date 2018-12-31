// Database
var DB = {
	currentPage: 0,
	totalPages: 5,
	
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
		document.getElementById("table_music_answer").innerHTML = 'Новогодний Конкурс "Угадай Мелодию 2019"!';
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
		document.getElementById("table_music_answer").innerHTML = 'Финальный тур!';
	}
	// Fireworks
	else if (DB.currentPage === 4) {
		document.getElementById("table_music_answer").innerHTML = 'С Новым Годом!';
		
		let launchFireworks = function() {
			if (DB.currentPage < 4) {
				return;
			}
			
			let count = 1;
			if (Math.random() < 0.5) {
				count += 1;
			}
			if (Math.random() < 0.3) {
				count += 1;
			}
			
			for (let i = 0; i < count; i++) {
				let blastRadius = Math.round(Math.random() * 25) + 25;
				let particles = Math.round(Math.random() * 50) + 50;
				let circles = Math.round(Math.random() * 3) + 4;
				let color = Math.round(Math.random() * 7);
				createFirework(blastRadius, particles, circles, color, null,null,null,null,true,false);
			}
			
			setTimeout(launchFireworks, Math.random() * 1000);
		};
		launchFireworks();
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
		categoryList = ["Начнем с классики", "Eurovision 2018", "Ретроспективно очевидное", "Маршируем"];
		
		musicList.push(new Song(0, 100, "Петр Чайковский - Танец феи Драже (Щелкунчик)"));
		musicList.push(new Song(0, 200, "Эдвард Григ - В пещере горного короля"));
		musicList.push(new Song(0, 300, "Жак Оффенбах - Канкан"));
		musicList.push(new Song(0, 400, "Ричард Вагнер - Полет валькирий"));

		musicList.push(new Song(1, 100, "DoReDoS - My Lucky Day (Moldova)"));
		musicList.push(new Song(1, 200, "Elina Nechaeva - La Forza (Estonia)"));
		musicList.push(new Song(1, 300, "Rasmussen - Higher Ground (Denmark)"));
		musicList.push(new Song(1, 400, "Aleksandr Rybak - That’s How You Write a Song (Norway)"));
		
		musicList.push(new Song(2, 100, "Cirque du Soleil - Alegria"));
		musicList.push(new Song(2, 200, "Витас - Opera Nr.2"));
		musicList.push(new Song(2, 300, "Celine Dion - My Heart Will Go On"));
		musicList.push(new Song(2, 400, "Avatar OST - Becoming one of the People"));
		
		musicList.push(new Song(3, 100, "Василий Агапкин - Прощание славянки"));
		musicList.push(new Song(3, 200, "Феликс Мендельсон - Свадебный марш"));
		musicList.push(new Song(3, 300, "Давид Тухманов - День Победы"));
		musicList.push(new Song(3, 400, "Status Quo - You're in the army now"));
	} else if (page === 2) {
		categoryList = ["Original Soundtrack", "Дискотека 80х", "Для девочек", "Газ в пол",];
		
		musicList.push(new Song(10, 100, "Ghostbusters / Охотники за привидениями"));
		musicList.push(new Song(10, 200, "Back to the Future / Назад в Будущее"));
		musicList.push(new Song(10, 300, "007: James Bond / Агент 007"));
		musicList.push(new Song(10, 400, "Mission Impossible / Миссия Невыполнима"));
		musicList.push(new Song(10, 500, "Star Wars / Звездные Войны"));

		musicList.push(new Song(11, 100, "Максим Леонидов - Девочка-видение"));
		musicList.push(new Song(11, 200, "ABBA - Money Money Money"));
		musicList.push(new Song(11, 300, "Веселые Ребята - Уходило лето"));
		musicList.push(new Song(11, 400, "Земляне - Трава у дома"));
		musicList.push(new Song(11, 500, "Sting - Englishman in New York"));
		
		musicList.push(new Song(12, 100, "Григорий Лепс - Рюмка водки на столе"));
		musicList.push(new Song(12, 200, "Дмитрий Дюжев - Мой дельтаплан"));
		musicList.push(new Song(12, 300, "Муслим Магомаев - Луч солнца золотого"));
		musicList.push(new Song(12, 400, "Taco - Puttin' On The Ritz"));
		musicList.push(new Song(12, 500, "Toto Cutugno - L’italiano"));
		
		musicList.push(new Song(13, 100, "Серега - Черный бумер"));
		musicList.push(new Song(13, 200, "Ирина Аллегрова - Угонщица"));
		musicList.push(new Song(13, 300, "Guns N' Roses - Paradise City"));
		musicList.push(new Song(13, 400, "Teriyaki Boyz - Tokyo Drift"));
		musicList.push(new Song(13, 500, "Snoop Dogg feat. The Doors - Riders on the Storm"));
	} else if (page === 3) {
		categoryList = ["Да вроде и не старое", "Звучит не так", "Часть вторая", "Любовь, вроде как", "Энергичненько"];
		
		musicList.push(new Song(20, 100, "Кристина Орбакайте - Перелетная птица"));
		musicList.push(new Song(20, 200, "Алла Пугачева - Позови меня с собой"));
		musicList.push(new Song(20, 300, "Любэ - Люберцы"));
		musicList.push(new Song(20, 400, "София Ротару - Луна Луна"));
		musicList.push(new Song(20, 500, "Комбинация - Бухгалтер"));

		musicList.push(new Song(21, 100, "Jingle Bells (Грустная версия)"));
		musicList.push(new Song(21, 200, "Abney Park - Katyusha"));
		musicList.push(new Song(21, 300, "Benny Hill"));
		musicList.push(new Song(21, 400, "Dschinghis Khan - Moskau"));
		musicList.push(new Song(21, 500, "Boney M - Rasputin"));
		
		musicList.push(new Song(22, 100, "Harry Potter / Гарри Поттер"));
		musicList.push(new Song(22, 200, "Pirates of the Caribbean / Пираты Карибского Моря"));
		musicList.push(new Song(22, 300, "Indiana Jones / Индиана Джонс"));
		musicList.push(new Song(22, 400, "Lord of the Rings / Властелин Колец"));
		musicList.push(new Song(22, 500, "Game of Thrones / Игра Престолов"));
		
		musicList.push(new Song(23, 100, "Непара - Другая причина"));
		musicList.push(new Song(23, 200, "Лолита - Пошлю его на"));
		musicList.push(new Song(23, 300, "Отпетые Мошенники - Девушки бывают разные"));
		musicList.push(new Song(23, 400, "Иванушки International - Тополиный пух"));
		musicList.push(new Song(23, 500, "Quest Pistols - Белая стрекоза любви"));
		
		musicList.push(new Song(24, 100, "Дискотека Авария и Жанна Фриске - Малинки-малинки"));
		musicList.push(new Song(24, 200, "Crazy Frog - Axel F"));
		musicList.push(new Song(24, 300, "Филипп Киркоров - Диско-партизаны"));
		musicList.push(new Song(24, 400, "Бурановские бабушки - Party for Everybody"));
		musicList.push(new Song(24, 500, "Rammstein - Du hast"));
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
		content += "<td class='table_music_td vert-middle'><button id='song" + rowId + "_" + musicList[i].cost + "' class='btn btn-song btn-primary songBtnFont'>" + musicList[i].cost / 100 + "</button></td>";
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
var players = ["Моника", "Саша", "Сергей", "Стелла"];

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
	var scoreToAdd = 100;
	playerScore[playerId] += scoreToAdd;
	updateScoreTable();
}

function subScore(player, i) {
	var playerId = parseInt(player);
	var scoreToAdd = 100;
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
