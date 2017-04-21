
function proceedWithCombat(tmod) {
	// Do timer
	if (combatTurnTimer > 0) {
		combatTurnTimer -= tmod;
		return;
	}

	// Do turns
	playersTurn(tmod);
	enemiesTurn(tmod);
	// Check for outcome
	if (engagedEnemies.length == 0) {
		endCombatVictory();
	}
	else if (playerHero.isAlive == false) {
		endCombatDefeat();
	}
	// Wind up the timer
	windUpCombatTurnTimer();
}

function playersTurn(tmod) {
	// Autoattack
	if (playerHero.attackTimer > 0) { playerHero.attackTimer -= 1; }
	else if (playerHero.attackTimer <= 0) {
		var damageRoll = Math.round(playerHero.damageMin + Math.random() * (playerHero.damageMax - playerHero.damageMin));
		var focusedEnemy = Math.floor(Math.random() * engagedEnemies.length);

		engagedEnemies[focusedEnemy].dealDamage(damageRoll);
		console.log('Hero attacked ' + engagedEnemies[focusedEnemy].name + ' for ' + damageRoll + ' damage');

		if (engagedEnemies[focusedEnemy].isAlive == false) {
			console.log(engagedEnemies[focusedEnemy].name + ' has been defeated!');

			if (engagedEnemies.length > 1)
				engagedEnemies = engagedEnemies.splice(focusedEnemy, 1);
			else
				engagedEnemies = [];
		}

		playerHero.attackTimer = 0;

	}
}

function enemiesTurn(tmod) {
	for (var i = 0; i < engagedEnemies.length; i++) {
		if (engagedEnemies[i].attackTimer > 0) { engagedEnemies[i].attackTimer -= 1; }
		else if (engagedEnemies[i].attackTimer <= 0) {
			var damageRoll = Math.round(engagedEnemies[i].damageMin + Math.random() * (engagedEnemies[i].damageMax - engagedEnemies[i].damageMin));
			playerHero.dealDamage(damageRoll);

			console.log(engagedEnemies[i].name + ' has attacked Hero for ' + damageRoll + ' damage');

			engagedEnemies[i].attackTimer = 0;
		}
	}
}

function windUpCombatTurnTimer() {
	combatTurnTimer = 2.0;
}