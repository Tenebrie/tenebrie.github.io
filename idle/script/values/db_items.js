
var databaseItemList = [];
function databaseCreateItems() {
	var item;

	item = new Item();
	item.name = 'Helmet';
	item.slot = ItemSlotEnum.Head;
	item.rarity = RarityEnum.Common;
	item.rollHealth = new Interval(10, 20);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Chestpiece';
	item.slot = ItemSlotEnum.Chest;
	item.rarity = RarityEnum.Common;
	item.rollHealth = new Interval(30, 50);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'One-handed Weapon';
	item.slot = ItemSlotEnum.MainHand;
	item.equipType = ItemEquipTypeEnum.OneHandWeapon;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Two-handed Weapon';
	item.slot = ItemSlotEnum.MainHand;
	item.equipType = ItemEquipTypeEnum.TwoHandWeapon;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'One-handed Crossbow';
	item.slot = ItemSlotEnum.MainHand;
	item.equipType = ItemEquipTypeEnum.OneHandCrossbow;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Two-handed Crossbow';
	item.slot = ItemSlotEnum.MainHand;
	item.equipType = ItemEquipTypeEnum.TwoHandCrossbow;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Shield';
	item.slot = ItemSlotEnum.OffHand;
	item.equipType = ItemEquipTypeEnum.Shield;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Quiver';
	item.slot = ItemSlotEnum.OffHand;
	item.equipType = ItemEquipTypeEnum.Quiver;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Off-hand';
	item.slot = ItemSlotEnum.OffHand;
	item.equipType = ItemEquipTypeEnum.OffHand;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);

	item = new Item();
	item.name = 'Ring';
	item.slot = ItemSlotEnum.Ring;
	item.equipType = ItemEquipTypeEnum.Ring;
	item.rarity = RarityEnum.Common;
	item.rollDamageMin = new Interval(1, 5);
	item.rollDamageMax = new Interval(3, 6);
	databaseItemList.push(item);
}