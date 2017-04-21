
function Inventory() {
	this.itemList = [];
	this.equippedList = [];

	// Indexes to the main list
	this.selectedList = [];
	this.selectedEquipList = [];
}

Inventory.prototype.addItem = function(item) {
	this.itemList.push(item);
	updateHeroInventory();
}

Inventory.prototype.isItemSelected = function(index) {
	for (var i = 0; i < this.selectedList.length; i++) {
		if (this.selectedList[i] == index) {
			return true;
		}
	}
	return false;
}

Inventory.prototype.isEquipmentSelected = function(index) {
	for (var i = 0; i < this.selectedEquipList.length; i++) {
		if (this.selectedEquipList[i] == index) {
			return true;
		}
	}
	return false;
}

Inventory.prototype.selectItem = function(index) {
	this.selectedList.push(index);
}

Inventory.prototype.selectEquipmentItem = function(index) {
	this.selectedEquipList.push(index);
}

Inventory.prototype.getSelectedItem = function() {
	if (this.selectedList.length > 0)
		return this.itemList[this.selectedList[0]];
	else if (this.selectedEquipList.length > 0)
		return this.equippedList[this.selectedEquipList[0]];
	else
		return undefined;
}

Inventory.prototype.unselectAllItems = function(index) {
	this.selectedList = [];
	this.selectedEquipList = [];
}

Inventory.prototype.equipItem = function(index) {
	// Check for free slots
	var slot = this.itemList[index].slot;
	var equipType = this.itemList[index].equipType;
	var itemsToUnequip = [];

	var hasShield = false;
	var hasQuiver = false;

	var oneHandedFound = [];
	var crossbowFound = [];
	var ringFound = [];

	var canDualWield = true;
	var canDualCrossbow = false;
	var canTwoHandWithShield = true;
	for (var i = 0; i < this.equippedList.length; i++) {
		if (this.equippedList[i].equipType == ItemEquipTypeEnum.Shield) { hasShield = true; }
		if (this.equippedList[i].equipType == ItemEquipTypeEnum.Quiver) { hasQuiver = true; }
	}

	for (var i = 0; i < this.equippedList.length; i++) {
		// Generic items, only one in slot
		if (equipType == ItemEquipTypeEnum.Generic && this.equippedList[i].slot == slot) {
			itemsToUnequip.push(i);
			//break;
		}
		// One-handed weapon with shield
		else if (equipType == ItemEquipTypeEnum.OneHandWeapon && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon
			&& (hasShield == true || hasQuiver == true || canDualWield == false))
		{
			itemsToUnequip.push(i);
			//break;
		}
		// One-handed weapons - dual wield
		else if (equipType == ItemEquipTypeEnum.OneHandWeapon && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon
			&& hasShield == false && hasQuiver == false && canDualWield == true)
		{
			if (oneHandedFound.length < 2) {
				oneHandedFound.push(i);
			}
			if (oneHandedFound.length == 2) {
				itemsToUnequip.push(oneHandedFound[0]);
				break;
			}
		}
		// One-handed weapons - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.OneHandWeapon)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					)
				)
		{
			itemsToUnequip.push(i);
			//break;
		}
		// Two-handed weapons - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.TwoHandWeapon)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Quiver
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					|| (this.equippedList[i].equipType == ItemEquipTypeEnum.Shield && canTwoHandWithShield == false)
					)
				)
		{
			itemsToUnequip.push(i);
		}

		// One-handed crossbows with quiver
		else if (equipType == ItemEquipTypeEnum.OneHandCrossbow && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
			&& (hasQuiver == true || canDualCrossbow == false))
		{
			itemsToUnequip.push(i);
			//break;
		}
		// One-handed crossbows - dual wield
		else if (equipType == ItemEquipTypeEnum.OneHandCrossbow && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow && hasQuiver == false)
		{
			if (crossbowFound.length < 2) {
				crossbowFound.push(i);
			}
			if (crossbowFound.length == 2) {
				itemsToUnequip.push(crossbowFound[0]);
				break;
			}
		}
		// One-handed crossbows - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.OneHandCrossbow)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Shield
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					)
				)
		{
			itemsToUnequip.push(i);
		}
		// Two-handed crossbows - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.TwoHandCrossbow)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Shield
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					)
				)
		{
			itemsToUnequip.push(i);
		}
		// Shields - when dual wielding
		else if (equipType == ItemEquipTypeEnum.Shield && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon)
		{
			if (oneHandedFound.length < 2) {
				oneHandedFound.push(i);
			}
			if (oneHandedFound.length == 2) {
				itemsToUnequip.push(oneHandedFound[1]);
				break;
			}
		}
		// Shields - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.Shield)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Quiver
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Shield
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					|| (this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon && canTwoHandWithShield == false)
					)
				)
		{
			itemsToUnequip.push(i);
			break;
		}
		// Quivers - when dual wielding one-handed weapons
		else if (equipType == ItemEquipTypeEnum.Quiver && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandWeapon)
		{
			if (oneHandedFound.length < 2) {
				oneHandedFound.push(i);
			}
			if (oneHandedFound.length == 2) {
				itemsToUnequip.push(oneHandedFound[1]);
				break;
			}
		}
		// Quivers - when dual wielding crossbows
		else if (equipType == ItemEquipTypeEnum.Quiver && this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow)
		{
			if (crossbowFound.length < 2) {
				crossbowFound.push(i);
			}
			if (crossbowFound.length == 2) {
				itemsToUnequip.push(crossbowFound[1]);
				break;
			}
		}
		// Quivers - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.Quiver)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Quiver
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Shield
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					)
				)
		{
			itemsToUnequip.push(i);
			//break;
		}
		// Off-hand items - remove all incompatible
		else if ((equipType == ItemEquipTypeEnum.OffHand)
				&& 	(
					this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandWeapon
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OneHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.TwoHandCrossbow
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Quiver
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.Shield
					|| this.equippedList[i].equipType == ItemEquipTypeEnum.OffHand
					)
				)
		{
			itemsToUnequip.push(i);
			//break;
		}
		// Rings - dual-wield
		else if (equipType == ItemEquipTypeEnum.Ring && this.equippedList[i].equipType == ItemEquipTypeEnum.Ring)
		{
			if (ringFound.length < 2) {
				ringFound.push(i);
			}
			if (ringFound.length == 2) {
				itemsToUnequip.push(ringFound[0]);
				break;
			}
		}
	}
	// Push item to equipped list
	this.equippedList.push(this.itemList[index]);
	// Remove item from inventory
	if (this.itemList.length > 1) {
		this.itemList.splice(index, 1);
	}
	else {
		this.itemList = [];
	}
	// Unequip items
	itemsToUnequip.sort(function(a, b) {
		return a - b;
	});
	for (var i = 0; i < itemsToUnequip.length; i++) {
		this.unequipItem(itemsToUnequip[i] - i);
	}
	
}

Inventory.prototype.equipAllSelected = function() {
	this.selectedList.sort(function(a, b) {
		return a - b;
	});
	for (var i = 0; i < this.selectedList.length; i++) {
		this.equipItem(this.selectedList[i] - i);
	}
}

Inventory.prototype.unequipItem = function(index) {
	// Push item to normal list
	this.itemList.push(this.equippedList[index]);
	// Remove item from inventory
	if (this.equippedList.length > 1) {
		this.equippedList.splice(index, 1);
	}
	else {
		this.equippedList = [];
	}
}