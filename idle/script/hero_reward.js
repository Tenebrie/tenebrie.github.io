
function generateCombatLoot() {
	storedLootExp = 0;
	storedLootItems = [];

	for (var i = 0; i < engagedEnemies.length; i++) {
		storedLootExp += engagedEnemies[i].expReward;

		if (getRandomInt(0, 100) <= 50) { storedLootItems.push(generateItem(RarityEnum.Common)); }
	}
}

function endCombatVictory() {
	console.log('Hero has been victorious!');

	playerHero.startEngageTimer();

	releaseCombatLoot();
}

function endCombatDefeat() {
	playerHero.action = ActionEnum.InTown;
	playerHero.ressurect();

	console.log('Hero has been defeated!');
}

function releaseCombatLoot() {
	playerHero.addExp(storedLootExp);
	for (var i = 0; i < storedLootItems.length; i++) {
		playerInventory.addItem(storedLootItems[i]);
	}

	console.log('Experience received: ' + storedLootExp);
}