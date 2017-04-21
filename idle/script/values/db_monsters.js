
var databaseMonsterList = [];
function databaseCreateMonsters() {
	var unit;
	unit = new Monster();
	unit.id = 'goblinWeakling';
	unit.name = 'Goblin Weakling';
	unit.rarity = RarityEnum.Common;
	unit.level = 1;
	unit.health = 30;
	unit.expReward = 10;
	unit.damageMin = 2;
	unit.damageMax = 5;
	unit.armor = 0;
	databaseMonsterList.push(unit);

	unit = new Monster();
	unit.id = 'debugReward';
	unit.name = 'Debug Reward Monster';
	unit.rarity = RarityEnum.Legendary;
	unit.level = 1;
	unit.health = 1;
	unit.expReward = 10;
	unit.damageMin = 2;
	unit.damageMax = 5;
	unit.armor = 0;
	databaseMonsterList.push(unit);
}