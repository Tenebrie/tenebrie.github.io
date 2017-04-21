
function engageCombat() {
	if (playerHero.action == ActionEnum.InField) {
		var enemyCount = getRandomInt(1, 3);
		for (var i = 0; i < enemyCount; i++) {
			engagedEnemies.push(generateMonsterById('goblinWeakling'));
		}
	}
	generateCombatLoot();
	windUpCombatTurnTimer();

	console.log('Hero has engaged in combat! Enemies');
	for (var i = 0; i < engagedEnemies.length; i++) {
		console.log(i + ': ' + engagedEnemies[i].name + ', Level ' + engagedEnemies[i].level);
	}
}

function engageDebugCombat() {
	
}