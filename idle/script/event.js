
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
}

function onClick_itemEquip() {
	playerInventory.equipAllSelected();
	updateHeroInventory();
	updateHeroEquipment();
}

function onClick_itemSell() {

}

function onClick_itemDisenchant() {

}