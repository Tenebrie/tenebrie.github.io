
function generateMonsterById(id) {
	var monster = new Monster();

	var isFound = false;
	for (var i = 0; i < databaseMonsterList.length; i++) {
		if (databaseMonsterList[i].id == id) {
			// Copy stats
			isFound = true;
			monster.copy(databaseMonsterList[i]);
		}
	}

	if (isFound == false)
		console.log('ERROR: Can\'t find monster with id "' + id + '"');
	
	return monster;
}

function generateMonster(level, rarity) {
	var selected = [];
	// Searching for suitable monsters in the database
	for (var i = 0; i < databaseMonsterList.length; i++) {
		if (databaseMonsterList[i].level == level && databaseMonsterList[i].rarity == rarity) {
			selected.push(databaseMonsterList[i]);
		}
	}
	// Selecting one from the list
	if (selected.length > 0) {
		var selectedIndex = getRandomInt(0, selected.length);
		var monster = new Monster();
		monster.copy(selected[selectedIndex]);
		return monster;
	}
}