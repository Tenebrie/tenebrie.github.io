
function initialization() {
	// Create databases
	databasePopulate();
	// Create events
	document.getElementById('gotoField').addEventListener('click', onClick_gotoField);
	document.getElementById('gotoTown').addEventListener('click', onClick_gotoTown);
	document.getElementById('itemEquip').addEventListener('click', onClick_itemEquip);
	document.getElementById('itemSell').addEventListener('click', onClick_itemSell);
	document.getElementById('itemDisenchant').addEventListener('click', onClick_itemDisenchant);
	// Create timers
	setInterval(advanceGame, 50);
	// Create a hero
	playerHero = new Hero(ClassEnum.Warrior);
	playerHero.updateStats();
	// Force update
	updateHeroStatus();
	// Debug
	/*for (var i = 0; i < 25; i++) {
		storedLootItems.push(generateItem(RarityEnum.Rare));
	}
	releaseCombatLoot();*/
}

function advanceGame() {
	var date = Date.now();
	var tmod = (date - advanceGameTimestamp) / 1000;
	advanceGameTimestamp = date;

	// Farming
	if (playerHero.action == ActionEnum.InField) {
		//console.log(playerHero.engageTimer);
		if (engagedEnemies.length == 0 && playerHero.engageTimer > 0) {
			// Engage timer
			playerHero.engageTimer -= tmod;
		}
		else if (engagedEnemies.length == 0) {
			// Engage with enemy
			engageCombat();
		}
		else {
			// Combat in progress
			proceedWithCombat(tmod);
		}
		//playerHero.addExp(1 * tmod);
	}
	// Healing in town
	else if (playerHero.action == ActionEnum.InTown) {
		playerHero.heal(10 * tmod);
	}

	updateHeroStatus();
}