
function updateHeroStatus() {
	document.getElementById('heroClass').innerHTML = playerHero.class;
	document.getElementById('heroLevel').innerHTML = playerHero.level;

	document.getElementById('heroHealth').innerHTML = Math.floor(playerHero.health) + '/' + Math.floor(playerHero.maxHealth);

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
		divClass = 'invButton';
		if (playerInventory.itemList[i].rarity == RarityEnum.Common) { divClass += ' invNormal'; }
		else if (playerInventory.itemList[i].rarity == RarityEnum.Rare) { divClass += ' invRare'; }
		else if (playerInventory.itemList[i].rarity == RarityEnum.Epic) { divClass += ' invEpic'; }
		else if (playerInventory.itemList[i].rarity == RarityEnum.Legendary) { divClass += ' invLegendary'; }
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
		divClass = 'invButton';
		if (playerInventory.equippedList[i].rarity == RarityEnum.Common) { divClass += ' invNormal'; }
		else if (playerInventory.equippedList[i].rarity == RarityEnum.Rare) { divClass += ' invRare'; }
		else if (playerInventory.equippedList[i].rarity == RarityEnum.Epic) { divClass += ' invEpic'; }
		else if (playerInventory.equippedList[i].rarity == RarityEnum.Legendary) { divClass += ' invLegendary'; }
		if (playerInventory.isEquipmentSelected(i)) {
			divClass += ' invSelected';
		}
		output += '<div class="' + divClass + '" onclick="onClick_itemEquipment(' + i + ')">' + playerInventory.equippedList[i].name + '</div>';
	}

	document.getElementById('heroEquipment').innerHTML = output;
}

function updateDisplayedItemStats() {
	var output = '';
	var item = playerInventory.getSelectedItem();
	if (item == undefined) {
		document.getElementById('displayedItemStats').innerHTML = output;
		return;
	}
	// Damage bonus
	if (item.bonusDamageMin > 0 || item.bonusDamageMax > 0) { output += '<div>Damage: ' + item.bonusDamageMin + '-' + item.bonusDamageMax + '</div>'; }
	if (item.bonusArmor > 0) { output += '<div>Armor: ' + item.bonusArmor + '</div>'; }
	if (item.bonusHealth > 0) { output += '<div>Health: +' + item.bonusHealth + '</div>'; }

	output += '<br>';
	if (item.level > 0) { output += '<div>Requires level ' + item.level + '</div>'; }

	document.getElementById('displayedItemStats').innerHTML = output;
}