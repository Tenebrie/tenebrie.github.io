
function onClick_gotoField() {
	playerHero.action = ActionEnum.InField;
	playerHero.startEngageTimer();
	console.log('Hero is going to the field');
}

function onClick_gotoTown() {
	playerHero.action = ActionEnum.InTown;
	engagedEnemies = [];

	console.log('Hero is returning to town');
}

function onClick_itemInventory(index) {
	if (playerInventory.isItemSelected(index) == false) {
		playerInventory.unselectAllItems();
		playerInventory.selectItem(index);
	}
	else {
		playerInventory.unselectAllItems();
	}
	updateHeroInventory();
	updateDisplayedItemStats();
}

function onClick_itemEquipment(index) {
	if (playerInventory.isEquipmentSelected(index) == false) {
		playerInventory.unselectAllItems();
		playerInventory.selectEquipmentItem(index);
	}
	else {
		playerInventory.unselectAllItems();
	}
	updateHeroInventory();
	updateDisplayedItemStats();
}

function onClick_itemEquip() {
	playerInventory.equipAllSelected();
	playerInventory.unselectAllItems();
	playerHero.updateStats();
	updateHeroInventory();
	updateHeroEquipment();
}

function onClick_itemSell() {

}

function onClick_itemDisenchant() {

}