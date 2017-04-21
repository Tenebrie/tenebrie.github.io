
function generateItem(rarity) {
	var selected = [];
	// Searching for suitable items in the database
	for (var i = 0; i < databaseItemList.length; i++) {
		if (databaseItemList[i].rarity == rarity) {
			selected.push(databaseItemList[i]);
		}
	}
	// Selecting one from the list
	if (selected.length > 0) {
		var selectedIndex = getRandomInt(0, selected.length);
		var item = new Item();
		item.instantianate(selected[selectedIndex]);
		return item;
	}
	else {
		console.log('Can\'t generate an item! (Rarity: ' + rarity + ")");
	}
}