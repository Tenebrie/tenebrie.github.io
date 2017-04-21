
function updateHeroStatus() {
	document.getElementById('heroClass').innerHTML = playerHero.class;
	document.getElementById('heroLevel').innerHTML = playerHero.level;

	document.getElementById('heroHealth').innerHTML = Math.floor(playerHero.health);

	document.getElementById('heroExp').innerHTML = Math.floor(playerHero.exp);
	document.getElementById('heroExpNeeded').innerHTML = heroExpReq[playerHero.level];
	document.getElementById('heroAction').innerHTML = playerHero.action;
	document.getElementById('heroDamageMin').innerHTML = playerHero.damageMin;
	document.getElementById('heroDamageMax').innerHTML = playerHero.damageMax;
	document.getElementById('heroArmor').innerHTML = playerHero.armor;
}

function updateHeroInventory() {
	var divClass = '';
	var output = '';

	for (var i = 0; i < playerInventory.itemList.length; i++) {
		divClass = 'invButton invNormal';
		if (playerInventory.isItemSelected(i)) {
			divClass += ' invSelected';
		}
		output += '<div class="' + divClass + '" onclick="onClick_itemInventory(' + i + ')">' + playerInventory.itemList[i].name + '</div>';
	}

	document.getElementById('heroInventory').innerHTML = output;
}

function updateHeroEquipment() {
	var divClass = '';
	var output = '';

	for (var i = 0; i < playerInventory.equippedList.length; i++) {
		divClass = 'invButton invNormal';
		/*if (playerInventory.isItemSelected(i)) {
			divClass += ' invSelected';
		}*/
		output += '<div class="' + divClass + '" onclick="onClick_itemEquipment(' + i + ')">' + playerInventory.equippedList[i].name + '</div>';
	}

	document.getElementById('heroEquipment').innerHTML = output;
}