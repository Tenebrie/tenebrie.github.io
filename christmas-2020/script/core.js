const TagRarity = {
	COMMON: 0,
	RARE: 1,
	UNIQUE: 2
}

// Database
const TAG_COMMON_LIMIT = 5
const TAG_PLAY_LIMIT = 8
const DB = {
	currentPage: 0,
	totalPages: 5,

	songFileFormat: '.mp3',
}

let ruleset = {
	maxRarity: TagRarity.UNIQUE,
	songsToPlay: 10,
	scoreModifier: 1
}

// Page initialization
window.onload = function() {
	// Score table
	initScoreTable()
	// Music list
	initEndlessMode()
	performPageTransition()
	// Music controls
	initMusicControls()
	// Meta controls
	initMetaControls()
}

//=================================================================================
// Meta controls
//=================================================================================
function initMetaControls() {
	// Previous page
	document.getElementById("btn_pageLeft").addEventListener("click", () => {
		if (DB.currentPage > 0) {
			DB.currentPage -= 1
		}
		performPageTransition()
	})
	// Next page
	document.getElementById("btn_pageRight").addEventListener("click", () => {
		if (DB.currentPage < DB.totalPages - 1) {
			DB.currentPage += 1
		}
		performPageTransition()
	})
}

function updateBackgroundBlur(shouldHaveBlur) {
	const bgImage = document.getElementsByClassName("background-image")[0]
	console.log(bgImage)
	if (!bgImage) {
		return
	}

	if (shouldHaveBlur && !bgImage.classList.contains('background-image-blur')) {
		bgImage.classList.add("background-image-blur")
	} else if (!shouldHaveBlur && bgImage.classList.contains('background-image-blur')) {
		bgImage.classList.remove('background-image-blur')
	}
}

function performPageTransition() {
	updateBackgroundBlur(DB.currentPage > 0)
	// Title card
	if (DB.currentPage === 0) {
		document.getElementById("table_music_answer").innerHTML = 'Новогодний Конкурс "Угадай Мелодию 2020"!'
		clearMusicTable()
	}
	// First module
	else if (DB.currentPage === 1) {
		document.getElementById("table_music_answer").innerHTML = 'Первый тур!'

		ruleset.maxRarity = TagRarity.COMMON
		ruleset.scoreModifier = 1
		ruleset.songsToPlay = 20

		rollTags()
	}
	// Second module
	else if (DB.currentPage === 2) {
		document.getElementById("table_music_answer").innerHTML = 'Второй тур!'

		ruleset.maxRarity = TagRarity.RARE
		ruleset.scoreModifier = 2
		ruleset.songsToPlay = 40

		rollTags()
	}
	// Final module
	else if (DB.currentPage === 3) {
		document.getElementById("table_music_answer").innerHTML = 'Финальный тур!'

		ruleset.maxRarity = TagRarity.UNIQUE
		ruleset.scoreModifier = 3
		ruleset.songsToPlay = 60

		rollTags()
	}
	// Fireworks
	else if (DB.currentPage === 4) {
		let fireworksInterval

		document.getElementById("table_music_answer").innerHTML = 'С Новым Годом!'
		clearMusicTable()

		if (playingAudio !== undefined && !playingAudio.paused) {
			playingAudio.pause()
		}
		playingAudio = new Audio("music/" + "20_ending" + DB.songFileFormat)
		playingAudioPath = "20_ending"
		playingAudio.volume = 1
		playingAudio.play().then(() => clearInterval(fireworksInterval))

		let fireworkIndex = 0
		const launchFireworks = function() {
			if (DB.currentPage < 4) {
				clearInterval(fireworksInterval)
				return
			}

			let count = 3
			if (fireworkIndex % 2 !== 0) {
				count += 2
			}

			for (let i = 0; i < count; i++) {
				let blastRadius = Math.round(Math.random() * 5) + 20
				let particles = Math.round(Math.random() * 30) + 50
				let circles = Math.round(Math.random() * 2) + 3
				let color = Math.round(Math.random() * 7)
				if (fireworkIndex % 2 !== 0) {
					blastRadius = Math.round(Math.random() * 15) + 35
					particles = Math.round(Math.random() * 40) + 70
					circles = Math.round(Math.random() * 3) + 5
					color = Math.round(Math.random() * 7)
				}
				createFirework(blastRadius, particles, circles, color, null,null,null,null,true,false)
			}
			fireworkIndex += 1

			//setTimeout(launchFireworks, Math.random() * 1000)
		}
		setTimeout(() => {
			fireworksInterval = setInterval(launchFireworks, 600)
			launchFireworks()
		}, 9300)
	}
}

//=================================================================================
// Music controls
//=================================================================================
let playingAudio
let playingAudioPath
let selectedSong
let selectedTag

function initMusicControls() {
	// Play song
	document.getElementById("btn_songPlay").addEventListener("click", async () => {
		if (playingAudioPath !== selectedSong.path) {
			if (playingAudio !== undefined && !playingAudio.paused) {
				playingAudio.pause()
			}
			playingAudio = new Audio("music/" + selectedSong.path + DB.songFileFormat)
		}
		playingAudioPath = selectedSong.path
		playingAudio.volume = 1
		await playingAudio.play()
	})
	// Pause
	document.getElementById("btn_songPause").addEventListener("click", async () => {
		playingAudio.pause()
	})
	// Stop
	document.getElementById("btn_songStop").addEventListener("click", async () => {
		await fadeVolumeTo(0.01)
		playingAudio.pause()
		playingAudio.currentTime = 0
	})
	// Reveal song
	document.getElementById("btn_songReveal").addEventListener("click", async () => {
		document.getElementById("table_music_answer").innerHTML = selectedSong.name
		await fadeVolumeTo(0.25)
	})
	// Hide song
	document.getElementById("btn_songHide").addEventListener("click", async () => {
		banCurrentSong()
		rollTags()
	})
}

const fadeVolumeTo = async function(targetValue) {
	if (!playingAudio) {
		console.warn('Trying to fade volume while no audio is present!')
		return
	}
	let volume = playingAudio.volume
	const timer = setInterval(function() {
		volume -= 0.01
		playingAudio.volume = volume
		if (volume <= targetValue) { clearInterval(timer) }
	}, 10)
}

//=================================================================================
// Music endless mode
//=================================================================================
const library = []
const bannedLibrary = []
const tagLibrary = []
let presentedTags = []

class Song {
	constructor(path, name, tags) {
		this.path = path
		this.name = name
		this.tags = tags
	}
}

class Tag {
	constructor(name, limit) {
		this.id = uuidv4()
		this.name = name
		this.limit = limit || TAG_PLAY_LIMIT
		this.timesPlayed = 0
		tagLibrary.push(this)
	}
}

class CountedTag {
	constructor(tag, count) {
		this.tag = tag
		this.count = count
		this.rarity = count >= TAG_COMMON_LIMIT ? TagRarity.COMMON : (count === 1) ? TagRarity.UNIQUE : TagRarity.RARE
	}
}

class WeightedTag {
	constructor(countedTag, totalCount, offset) {
		this.tag = countedTag.tag
		this.rarity = countedTag.rarity

		const count = countedTag.count
		this.minValue = offset / totalCount
		this.maxValue = (count + offset) / totalCount
	}

	matchesValue(value) {
		return this.minValue <= value && value < this.maxValue
	}
}

class PresentedTag {
	constructor(weightedTag) {
		this.tag = weightedTag.tag
		this.rarity = weightedTag.rarity
	}
}

const initEndlessMode = () => {
	const tag70s = new Tag('1970s')
	const tag80s = new Tag('1980s')
	const tag90s = new Tag('1990s')
	const tag00s = new Tag('2000s')
	const tagModern = new Tag('Современное')
	const tagEurovision = new Tag('Eurovision')
	const tagDancing = new Tag('Танцевальное')
	const tagBabyTime = new Tag('Baby Time')
	const tagClassics = new Tag('Классика')
	const tagElectronics = new Tag('Чистая электроника')
	const tagRussian = new Tag('Русское')
	const tagForeign = new Tag('Зарубежное')
	const tagSpecific = new Tag('Для определенных целей')
	const tagAlmostRussian = new Tag('Почти русское')
	const tagMovies = new Tag('Кинематограф')
	const tagCover = new Tag('Перепевка')
	const tagMemories = new Tag('Воспоминания')
	const tagEvenOlder = new Tag('Даже не семидесятые')
	const tagDisney = new Tag('Диснеевское')
	const tagThatClip = new Tag('Клип помните?')
	const tagJokeSong = new Tag('Смех, а не песня')
	const tagVocalist = new Tag('За вокал')
	const tagOnOccasion = new Tag('По случаю')
	const tagMusicLesson = new Tag('Урок музыки')
	const tagChristmas = new Tag('Рождественское')
	const tagMTV = new Tag('MTV')
	const tagEasy = new Tag('По трем нотам')
	const tagAssociations = new Tag('По ассоциациям')
	const tagLoveSongs = new Tag('Любовные баллады')
	const tagTransportation = new Tag('Транспорт')
	const tagInstrumental = new Tag('Инструментальное')
	const tagHard = new Tag('Повышенной сложности')
	const tagShouldBeEasy = new Tag('Почему вы этого не знаете?')
	const tagStupidEasy = new Tag('Проще простого')
	const tagWillBeCovered = new Tag('Оригинальная версия')
	const tagMeNoLikey = new Tag('Нет, мне это не нравится')
	const tagNorthern = new Tag('Северные страны')
	const tagAustralia = new Tag('А вы что тут забыли?')
	const tagSadness = new Tag('Печалька')
	const tagFirstTry = new Tag('Первая попытка')
	const tagTopYoutube = new Tag('Сотни миллионов просмотров')
	const tagOverwatched = new Tag('Смотрено и пересмотрено')
	const tagBirbs = new Tag('Всякое летучее')
	const tagFishes = new Tag('Всякое плавучее')
	const tagBallet = new Tag('Балетное')

	const tagGuessLanguage = new Tag('Угадай язык')

	library.push(new Song('20_01', 'Europe - Final Countdown', [tagForeign, tagEasy, tag80s]))
	library.push(new Song('20_02', 'Scorpions - Wind Of Change', [tagForeign, tag90s]))
	library.push(new Song('20_03', 'Opus - Live Is Life', [tagForeign, tag80s]))
	library.push(new Song('20_04', 'Space - Magic Fly', [tagElectronics, tag70s]))
	library.push(new Song('20_05', 'Dead Or Alive - You Spin Me Round', [tagForeign, tag80s]))

	library.push(new Song('20_06', 'Carl Douglas - Kung Fu Fighting', [tagForeign, tag70s]))
	library.push(new Song('20_07', 'Roberta Flack - Killing Me Softly With His Song', [tagForeign, tagLoveSongs, tagWillBeCovered, tag70s]))
	library.push(new Song('20_08', 'Hot Butter - Popcorn', [tag70s, tagWillBeCovered]))
	library.push(new Song('20_09', 'Rednex - Cotton Eye Joe', [tagForeign, tagJokeSong, tagDancing, tag90s]))
	library.push(new Song('20_10', 'Baccara - Yes Sir, I Can Boogie', [tagForeign, tag70s]))

	library.push(new Song('20_11', 'Jane Zhang - The Diva Dance', [tagVocalist, tagCover, tagMovies]))
	library.push(new Song('20_12', 'Chris Rea - Driving Home For Christmas', [tagForeign, tagChristmas, tagTransportation, tag80s]))
	library.push(new Song('20_13', 'Wham! - Last Christmas', [tagForeign, tagChristmas, tag80s]))
	library.push(new Song('20_14', 'Yolanda Be Cool & DCUP - We No Speak Americano', [tagForeign, tagThatClip]))
	library.push(new Song('20_15', 'John Denver - Take Me Home, Country Roads', [tagForeign, tag70s, tagWillBeCovered]))

	library.push(new Song('20_16', 'The Rolling Stones - Paint It, Black', [tagForeign, tagEvenOlder, tagWillBeCovered]))
	library.push(new Song('20_17', 'The Beatles - Yellow Submarine', [tagForeign, tagEvenOlder, tagTransportation]))
	library.push(new Song('20_18', 'Elvis Presley - Blue Suede Shoes 1956', [tagForeign, tagEvenOlder]))
	library.push(new Song('20_19', 'Back to the Future - Johnny B. Goode', [tagForeign, tagMovies, tagOverwatched]))
	library.push(new Song('20_20', 'The Coasters - Yakety Yak', [tagEvenOlder, tagDancing]))

	library.push(new Song('20_21', 'Ievan Polkka', [tagEvenOlder, tagJokeSong, tagWillBeCovered, tagNorthern]))
	library.push(new Song('20_22', 'Imagine Dragons - Believer', [tagThatClip, tagForeign, tagModern]))
	library.push(new Song('20_23', 'Louis Armstrong - What A Wonderful World', [tagForeign, tagEvenOlder]))
	library.push(new Song('20_25', 'The Lion King - Can You Feel The Love Tonight', [tagDisney, tagWillBeCovered, tagLoveSongs]))
	library.push(new Song('20_26', 'Auli\'i Cravalho - How Far I\'ll Go (Moana)', [tagDisney]))

	library.push(new Song('20_27', 'Frozen - Let It Go', [tagDisney, tagTopYoutube]))
	library.push(new Song('20_28', 'Disney Music - Lava', [tagDisney, tagHard, tagLoveSongs]))
	library.push(new Song('20_29', 'Rammstein - Ausländer', [tagForeign, tagModern]))
	library.push(new Song('20_31', 'Queen - Another One Bites the Dust', [tagForeign, tag80s]))
	library.push(new Song('20_32', 'Katy Perry - I Kissed A Girl', [tagForeign, tagMTV]))

	library.push(new Song('20_33', 'Lady Gaga - Poker Face', [tagForeign, tagMTV, tagEasy, tagTopYoutube]))
	library.push(new Song('20_35', 'Somebody That I Used to Know - Walk off the Earth', [tagForeign, tagHard, tagCover]))
	library.push(new Song('20_36', 'Drake - Hotline Bling', [tagForeign, tagThatClip, tagModern, tagTopYoutube]))
	library.push(new Song('20_37', 'Bananarama - Venus', [tagForeign, tag80s]))
	library.push(new Song('20_38', 'Cirque du Soleil Corteo - Ritornare', [tagAssociations]))

	library.push(new Song('20_41', 'Артур Пирожков - Она решила сдаться', [tagRussian, tagJokeSong]))
	library.push(new Song('20_42', 'Ленинград - Кабриолет', [tagRussian, tagThatClip, tagTransportation]))
	library.push(new Song('20_43', 'Профессор Лебединский - Я убью тебя, лодочник', [tagRussian, tagJokeSong, tag90s]))
	library.push(new Song('20_44', 'Сергей Трофимов - Скоро весна!', [tagEasy, tagRussian]))
	library.push(new Song('20_45', 'Супер Жорик - Хочу тибя любицца', [tagAlmostRussian, tagJokeSong]))

	library.push(new Song('20_46', 'PSY - Gangnam Style', [tagJokeSong, tagEasy, tagThatClip, tagTopYoutube]))
	library.push(new Song('20_47', 'Aleksandr Rybak - Fairytale', [tagEurovision, tagStupidEasy, tagNorthern]))

	library.push(new Song('20_39', 'Erutan - Jabberwocky (Бессмысленный язык)', [tagGuessLanguage]))
	library.push(new Song('20_40', 'Noble Maiden Fair (Кельтский язык)', [tagGuessLanguage]))
	library.push(new Song('20_24', 'Lin-Manuel Miranda, Opetaia Foa\'i - We Know The Way (Токелау)', [tagGuessLanguage]))

	library.push(new Song('19_00_100', 'Петр Чайковский - Танец феи Драже (Щелкунчик)', [tagClassics, tagBallet]))
	library.push(new Song('19_00_200', 'Эдвард Григ - В пещере горного короля', [tagClassics]))
	library.push(new Song('19_00_300', 'Жак Оффенбах - Канкан', [tagClassics, tagEasy]))
	library.push(new Song('19_00_400', 'Ричард Вагнер - Полет валькирий', [tagClassics, tagShouldBeEasy, tagBirbs]))

	library.push(new Song('19_01_100', 'DoReDoS - My Lucky Day (Moldova, 2018)', [tagEurovision, tagDancing, tagThatClip]))
	library.push(new Song('19_01_200', 'Elina Nechaeva - La Forza (Estonia, 2018)', [tagEurovision, tagVocalist, tagNorthern]))
	library.push(new Song('19_01_300', 'Rasmussen - Higher Ground (Denmark, 2018)', [tagEurovision, tagNorthern]))
	library.push(new Song('19_01_400', 'Aleksandr Rybak - That’s How You Write a Song (Norway, 2018)', [tagEurovision, tagDancing, tagNorthern]))

	library.push(new Song('19_02_100', 'Cirque du Soleil - Alegria', [tagMemories, tagStupidEasy]))
	library.push(new Song('19_02_200', 'Витас - Opera Nr.2', [tagRussian, tagJokeSong, tagVocalist]))
	library.push(new Song('19_02_300', 'Celine Dion - My Heart Will Go On', [tagForeign, tagLoveSongs]))
	library.push(new Song('19_02_400', 'Avatar OST - Becoming one of the People', [tagMovies, tagInstrumental, tagHard]))

	library.push(new Song('19_03_100', 'Василий Агапкин - Прощание славянки', [tagRussian, tagOnOccasion]))
	library.push(new Song('19_03_200', 'Феликс Мендельсон - Свадебный марш', [tagOnOccasion, tagMemories, tagInstrumental]))
	library.push(new Song('19_03_300', 'Давид Тухманов - День Победы', [tagRussian, tagOnOccasion, tagInstrumental]))
	library.push(new Song('19_03_400', 'Status Quo - You\'re in the army now', [tagForeign, tagMemories]))

	library.push(new Song('19_10_100', 'Ghostbusters / Охотники за привидениями', [tagMovies, tag80s]))
	library.push(new Song('19_10_200', 'Back to the Future / Назад в Будущее', [tagMovies, tag80s, tagInstrumental]))
	library.push(new Song('19_10_300', '007: James Bond / Агент 007', [tagMovies, tag80s, tagInstrumental]))
	library.push(new Song('19_10_400', 'Mission Impossible / Миссия Невыполнима', [tagMovies, tagInstrumental]))
	library.push(new Song('19_10_500', 'Star Wars / Звездные Войны', [tagMovies, tag70s, tagInstrumental]))

	library.push(new Song('19_11_100', 'Максим Леонидов - Девочка-видение', [tagRussian, tag90s]))
	library.push(new Song('19_11_200', 'ABBA - Money Money Money', [tagForeign, tag80s]))
	library.push(new Song('19_11_300', 'Веселые Ребята - Уходило лето', [tagRussian, tag70s]))
	library.push(new Song('19_11_400', 'Земляне - Трава у дома', [tagRussian, tagMemories, tag90s, tagBirbs]))
	library.push(new Song('19_11_500', 'Sting - Englishman in New York', [tagForeign, tag80s]))

	library.push(new Song('19_12_100', 'Григорий Лепс - Рюмка водки на столе', [tagRussian, tagMemories, tagVocalist]))
	library.push(new Song('19_12_200', 'Дмитрий Дюжев - Мой дельтаплан', [tagMovies, tagVocalist, tagTransportation, tagBirbs]))
	library.push(new Song('19_12_300', 'Муслим Магомаев - Луч солнца золотого', [tagRussian, tagMovies]))
	library.push(new Song('19_12_400', 'Taco - Puttin\' On The Ritz', [tagForeign, tagDancing, tag80s]))
	library.push(new Song('19_12_500', 'Toto Cutugno - L’italiano', [tagForeign, tagVocalist, tag80s]))

	library.push(new Song('19_13_100', 'Серега - Черный бумер', [tagEasy, tagRussian, tagTransportation, tag00s]))
	library.push(new Song('19_13_200', 'Ирина Аллегрова - Угонщица', [tagRussian, tagTransportation, tag90s]))
	library.push(new Song('19_13_300', 'Guns N\' Roses - Paradise City', [tagMovies, tagTransportation, tag80s]))
	library.push(new Song('19_13_400', 'Teriyaki Boyz - Tokyo Drift', [tagMovies, tagForeign, tagTransportation, tag00s]))

	library.push(new Song('19_20_100', 'Кристина Орбакайте - Перелетная птица', [tagRussian, tag00s, tagBirbs]))
	library.push(new Song('19_20_200', 'Алла Пугачева - Позови меня с собой', [tagRussian, tag90s, tagLoveSongs]))
	library.push(new Song('19_20_300', 'Любэ - Люберцы', [tagRussian, tag90s]))
	library.push(new Song('19_20_400', 'София Ротару - Луна Луна', [tagRussian, tag80s]))
	library.push(new Song('19_20_500', 'Комбинация - Бухгалтер', [tagRussian, tag90s]))

	library.push(new Song('19_21_100', 'Jingle Bells (Грустная версия)', [tagCover, tagChristmas, tagInstrumental, tagSadness]))
	library.push(new Song('19_21_200', 'Abney Park - Katyusha', [tagForeign, tagCover]))
	library.push(new Song('19_21_300', 'Benny Hill', [tagCover, tagThatClip, tagInstrumental]))
	library.push(new Song('19_21_400', 'Dschinghis Khan - Moskau', [tagForeign, tagCover, tag70s]))
	library.push(new Song('19_21_500', 'Boney M - Rasputin', [tagForeign, tagCover, tag70s]))

	library.push(new Song('19_22_100', 'Harry Potter / Гарри Поттер', [tagMovies, tag00s, tagInstrumental]))
	library.push(new Song('19_22_200', 'Pirates of the Caribbean / Пираты Карибского Моря', [tagEasy, tagMovies, tagTransportation, tagInstrumental]))
	library.push(new Song('19_22_300', 'Indiana Jones / Индиана Джонс', [tagMovies, tag80s, tagInstrumental]))
	library.push(new Song('19_22_400', 'Lord of the Rings / Властелин Колец', [tagMovies, tagInstrumental]))
	library.push(new Song('19_22_500', 'Game of Thrones / Игра Престолов', [tagMovies, tagInstrumental]))

	library.push(new Song('19_23_100', 'Непара - Другая причина', [tagRussian, tag00s]))
	library.push(new Song('19_23_200', 'Лолита - Пошлю его на', [tagRussian, tag00s]))
	library.push(new Song('19_23_300', 'Отпетые Мошенники - Девушки бывают разные', [tagRussian, tag00s]))
	library.push(new Song('19_23_400', 'Иванушки International - Тополиный пух', [tagRussian, tag90s]))
	library.push(new Song('19_23_500', 'Quest Pistols - Белая стрекоза любви', [tagRussian, tagJokeSong, tagBirbs]))

	library.push(new Song('19_24_100', 'Дискотека Авария и Жанна Фриске - Малинки-малинки', [tagRussian, tagDancing]))
	library.push(new Song('19_24_200', 'Crazy Frog - Axel F', [tagBabyTime, tagDancing, tagJokeSong]))
	library.push(new Song('19_24_300', 'Филипп Киркоров - Диско-партизаны', [tagAlmostRussian, tagDancing, tagJokeSong]))
	library.push(new Song('19_24_400', 'Бурановские бабушки - Party for Everybody', [tagRussian, tagDancing, tagJokeSong]))
	library.push(new Song('19_24_500', 'Rammstein - Du hast', [tagForeign, tagEasy]))

	library.push(new Song('18_00_150', 'Алла Пугачева - Волшебник-недоучка', [tagRussian, tagEasy, tag70s]))
	library.push(new Song('18_00_200', 'Машина Времени - Поворот', [tagRussian, tagTransportation, tag80s]))
	library.push(new Song('18_00_250', 'Наутилус Помпилиус - Скованные одной цепью', [tagRussian, tag80s]))
	library.push(new Song('18_00_300', 'Аквариум - Город золотой (К/Ф "Асса")', [tagRussian, tagMovies, tag80s]))

	library.push(new Song('18_01_300', 'Bonnie Tyler - Holding Out For A Hero', [tagForeign, tag80s]))

	library.push(new Song('18_03_100', 'Conchita Wurst - Rise Like a Phoenix (2014, Austria)', [tagEurovision, tagMeNoLikey, tagBirbs]))
	library.push(new Song('18_03_150', 'Loreen - Euphoria (2012, Sweden)', [tagEurovision, tagThatClip, tagNorthern]))
	library.push(new Song('18_03_200', 'Marija Šerifović - Molitva (2007, Serbia)', [tagEurovision, tagMeNoLikey, tagHard]))
	library.push(new Song('18_03_250', 'Måns Zelmerlöw - Heroes (2015, Sweden)', [tagEurovision, tagHard, tagNorthern]))
	library.push(new Song('18_03_300', 'Salvador Sobral - Amar Pelos Dois (2017, Portugal)', [tagEurovision, tagMeNoLikey, tagHard]))

	library.push(new Song('18_10_200', 'Los del Rio - Macarena', [tagForeign, tagDancing, tag90s, tagMTV]))
	library.push(new Song('18_10_250', 'Spice Girls - Wannabe', [tagForeign, tagMTV, tag90s]))
	library.push(new Song('18_10_300', 'The Weather Girls - It\'s Raining Men', [tagForeign, tagThatClip, tagDancing, tag80s]))
	library.push(new Song('18_10_350', 'Kaoma - Lambada', [tagForeign, tagDancing, tag80s]))
	library.push(new Song('18_10_400', 'Ricky Martin - Livin\' La Vida Loca', [tagForeign, tagDancing, tag90s]))

	library.push(new Song('18_11_200', 'Король Лев (1994)', [tagDisney, tagOverwatched]))
	library.push(new Song('18_11_250', 'Красавица и чудовище (1991)', [tagDisney]))
	library.push(new Song('18_11_300', 'Мулан (1998)', [tagDisney, tagOverwatched]))
	library.push(new Song('18_11_350', 'Русалочка (1983)', [tagDisney, tagFishes]))

	library.push(new Song('18_12_200', 'Michael Jackson - Thriller', [tagForeign, tag80s, tagEasy, tagTopYoutube]))

	library.push(new Song('18_13_200', 'AC/DC - Highway to Hell', [tagForeign, tagTransportation, tag70s]))
	library.push(new Song('18_13_250', 'Depeche Mode - Personal Jesus', [tagForeign, tag80s]))
	library.push(new Song('18_13_300', 'Coolio - Gangsta\'s Paradise', [tagForeign, tag90s]))
	library.push(new Song('18_13_350', 'Guns N\' Roses - Paradise City', [tagForeign, tag80s]))
	library.push(new Song('18_13_400', 'Two Steps From Hell - Heart of Courage', [tagSpecific]))

	library.push(new Song('18_14_200', 'Queen - Show Must Go On', [tagForeign, tag90s]))
	library.push(new Song('18_14_250', 'Eiffel 65 - Blue', [tagForeign, tag90s, tagMemories]))
	library.push(new Song('18_14_300', 'Rammstein - Amerika', [tagForeign, tag00s]))
	library.push(new Song('18_14_350', 'Daft Punk - Around The World', [tagForeign, tagTransportation, tag90s]))

	library.push(new Song('17_00_100', 'Deep Purple - Smoke on the Water', [tagForeign, tag90s]))
	library.push(new Song('17_00_150', 'Pink Floyd - Another Brick in the Wall', [tagForeign, tag70s]))
	library.push(new Song('17_00_200', 'ABBA - Gimme! Gimme! Gimme!', [tagForeign, tag80s]))
	library.push(new Song('17_00_250', 'Eagles - Hotel California', [tagForeign, tag70s]))
	library.push(new Song('17_00_300', 'Kiss - I Was Made For Loving You', [tagForeign, tag90s]))

	library.push(new Song('17_01_100', 'Сергей Лазарев - You Are The Only One (Russia, 2017)', [tagEurovision, tagFirstTry]))
	library.push(new Song('17_01_150', 'IVAN - Help You Fly (Belarus, 2017)', [tagEurovision, tagHard]))
	library.push(new Song('17_01_200', 'Jamala - 1944 (Ukraine, 2017)', [tagEurovision, tagMeNoLikey, tagHard]))
	library.push(new Song('17_01_250', 'Poli Genova - If Love Was a Crime (Bulgaria, 2017)', [tagEurovision, tagHard]))
	library.push(new Song('17_01_300', 'Dami Im - Sound Of Silence (Australia, 2017)', [tagAustralia]))

	library.push(new Song('17_03_100', 'Ирония Судьбы', [tagChristmas, tagInstrumental]))
	library.push(new Song('17_03_150', 'Пять минут', [tagEasy, tagChristmas, tagInstrumental]))
	library.push(new Song('17_03_200', 'We Wish You a Merry Christmas', [tagForeign, tagMusicLesson, tagChristmas]))
	library.push(new Song('17_03_250', 'Jingle Bells', [tagForeign, tagEasy, tagMusicLesson, tagChristmas]))

	library.push(new Song('17_04_100', 'Дискотека Авария - Disco Superstar', [tagRussian, tagDancing]))
	library.push(new Song('17_04_250', 'LMFAO - Party Rock Anthem', [tagDancing, tagThatClip, tagTopYoutube]))

	library.push(new Song('17_05_100', 'Крылатые качели', [tagRussian, tagMusicLesson, tagInstrumental, tagBirbs]))
	library.push(new Song('17_05_150', 'Учат в школе', [tagRussian, tagMusicLesson, tagInstrumental]))
	library.push(new Song('17_05_200', 'Пока часы 12 бьют', [tagRussian, tagMusicLesson, tagInstrumental]))
	library.push(new Song('17_05_250', 'Кабы не было зимы', [tagRussian, tagMusicLesson, tagInstrumental]))
	library.push(new Song('17_05_300', 'Умка', [tagRussian, tagMusicLesson, tagInstrumental]))

	library.push(new Song('17_06_100', 'Деревня Дураков', [tagJokeSong, tagThatClip, tagInstrumental]))
	library.push(new Song('17_06_150', 'Ylvis - What Does the Fox Say', [tagJokeSong, tagForeign, tagTopYoutube]))
	library.push(new Song('17_06_200', 'Эдуард Хиль - Песня без слов', [tagJokeSong, tagRussian]))
	library.push(new Song('17_06_250', 'Lordi - Hard Rock Hallelujah (Instrumental)', [tagCover, tagEurovision, tagInstrumental]))
	library.push(new Song('17_06_300', 'Людвиг ван Бетховен - Ода к Радости', [tagClassics]))

	/* 2021:
	 * Adriano Celentano - Confessa
	 * Nightwish
	 */

	updateLibraryStatus()
}

const getEffectiveLibrary = function() {
	return library.filter(song => !bannedLibrary.includes(song))
}

const getTagCount = function(targetTag) {
	const songsWithTag = library.filter(song => {
		return song.tags.includes(targetTag)
	})
	return Math.min(songsWithTag.length, targetTag.limit) - targetTag.timesPlayed
}

const getWeightedTags = function() {
	const reducer = (accumulator, value) => accumulator.concat(value)
	const allTags = getEffectiveLibrary().map(song => song.tags).reduce(reducer, [])
	const uniqueTags = new Array(...new Set(allTags))
	const countedTags = uniqueTags.map(tag => new CountedTag(tag, getTagCount(tag)))
	const filteredTags = countedTags.filter(tag => tag.count > 0).filter(tag => tag.rarity <= ruleset.maxRarity)
	const totalCount = filteredTags.reduce((accumulator, value) => accumulator += value.count, 0)

	let offset = 0
	const weightedTags = []
	filteredTags.forEach(tag => {
		weightedTags.push(new WeightedTag(tag, totalCount, offset))
		offset += tag.count
	})
	return weightedTags
}

const countReachableSongs = function() {
	const tags = getWeightedTags().map(weightedTag => weightedTag.tag)
	const reachableSongs = getEffectiveLibrary().filter(song => song.tags.filter(tag => tags.includes(tag)).length > 0)
	return reachableSongs.length
}

const getRandomTags = function(count) {
	const weightedTags = getWeightedTags()
	if (count >= weightedTags.length) {
		return weightedTags.map(weightedTag => weightedTag.tag)
	}

	const presentedTags = []
	while (presentedTags.length < count) {
		const rand = Math.random()
		const weightedTag = weightedTags.find(weightedTag => weightedTag.matchesValue(rand))
		if (presentedTags.find(presentedTag => presentedTag.tag === weightedTag.tag)) {
			continue
		}
		presentedTags.push(new PresentedTag(weightedTag))
	}
	return presentedTags
}

const banCurrentSong = function() {
	if (selectedSong && selectedTag) {
		bannedLibrary.push(selectedSong);
		selectedTag.timesPlayed += 1
		selectedSong = null
		selectedTag = null
	}

	updateLibraryStatus()
}

const rollTags = function() {
	presentedTags = getRandomTags(5)
	updateMusicTable()
}

const onTagClicked = function(tagId) {
	const tag = tagLibrary.find(tag => tag.id === tagId)
	if (tag === selectedTag) { return }

	const taggedSongs = getEffectiveLibrary().filter(song => song.tags.includes(tag))
	const randomSongIndex = Math.floor(Math.random() * taggedSongs.length)
	selectedSong = taggedSongs[randomSongIndex]
	selectedTag = tag

	updateMusicTable()
	updateLibraryStatus()
}

//=================================================================================
// Library HTML updates
//=================================================================================
const updateSelectedSong = function() {
	document.getElementById('current-song-id').innerText = selectedSong ? '#' + library.indexOf(selectedSong) : '-'
}

const updateLibraryStatus = function() {
	document.getElementById('songs-played').innerText = bannedLibrary.length.toString()
	document.getElementById('songs-total').innerText = ruleset.songsToPlay
	document.getElementById('songs-reachable').innerText = countReachableSongs().toString()
	updateSelectedSong()
}

const updateMusicTable = function() {
	let content = ''
	presentedTags.forEach(presentedTag => {
		const tag = presentedTag.tag
		const rarity = presentedTag.rarity
		const tagBaseClass = `btn-song btn-primary btn`
		const tagCommonClass = rarity === TagRarity.COMMON ? 'btn-song-common' : ''
		const tagRareClass = rarity === TagRarity.RARE ? 'btn-song-rare' : ''
		const tagUniqueClass = rarity === TagRarity.UNIQUE ? 'btn-song-unique' : ''
		const tagSelectedClass = (selectedTag && tag === selectedTag) ? 'selected' : ''
		const tagDisabledClass = (selectedTag && tag !== selectedTag) ? 'disabled' : ''
		const tagClass = `${tagBaseClass} ${tagCommonClass} ${tagRareClass} ${tagUniqueClass} ${tagSelectedClass} ${tagDisabledClass}`
		content += `<button class="${tagClass}" onclick="onTagClicked('${tag.id}')">${tag.name}</button>`
	})

	document.getElementById('table_music').innerHTML = content
}

const clearMusicTable = function() {
	document.getElementById('table_music').innerHTML = ''
}

//=================================================================================
// Score table
//=================================================================================
let playerScore = []
let players = ["Команда 1", "Команда 2"]

function initScoreTable() {
	const table = document.getElementById("table_score")
	let content = ""
	for (let i = 0; i < players.length; i++) {
		const playerId = (i > 9) ? i : "0" + i
		if (playerScore.length <= i) {
			playerScore.push(0)
		}

		// Next row
		content += "<tr>"
		// Player name
		content += "<td id='player" + playerId + "' class='scoreFont'>"
		content += players[i] + ":"
		content += "</td>"
		// Player score
		content += "<td id='score" + playerId + "' class='scoreFont scoreFontRight'>"
		content += "0"
		content += "</td>"
		// Buttons
		content += "<td>"
		content += "<button id='scoreplus" + playerId + "' class='btn btn-score'><span class='glyphicon glyphicon-plus'></span></button> <button id='scoreminus" + playerId + "' class='btn btn-score'><span class='glyphicon glyphicon-minus'></span></button>"
		content += "</td>"
		// Close the row
		content += "</tr>"
	}
	table.innerHTML = content
	// Register the event handlers
	for (let i = 0; i < players.length; i++) {
		const playerId = (i > 9) ? i : "0" + i
		document.getElementById("scoreplus" + playerId).addEventListener("click", function(){ addScore(this.id.substring(9)) })
		document.getElementById("scoreminus" + playerId).addEventListener("click", function(){ subScore(this.id.substring(10)) })
	}
}

function addScore(player) {
	const playerId = parseInt(player)
	const scoreToAdd = 100 * ruleset.scoreModifier
	playerScore[playerId] += scoreToAdd
	updateScoreTable()
}

function subScore(player) {
	const playerId = parseInt(player)
	const scoreToAdd = 100 * ruleset.scoreModifier
	playerScore[playerId] -= scoreToAdd
	updateScoreTable()
}

function updateScoreTable() {
	for (let i = 0; i < players.length; i++) {
		const playerId = (i > 9) ? i : "0" + i
		const display = document.getElementById("score" + playerId)
		display.innerHTML = playerScore[i]
	}
}

//=================================================================================
// Utility functions
//=================================================================================
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}