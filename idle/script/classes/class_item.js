
function Item() {
	// Basic info
	this.name = 'Unnamed item';
	this.rarity = RarityEnum.Common;
	this.slot = null;
	this.equipType = ItemEquipTypeEnum.Generic;
	this.classRequirement = ClassEnum.Any;
	this.price = 0;
	this.level = 0;
	// Bonus values
	this.bonusDamageMin = 0;
	this.bonusDamageMax = 0;
	this.bonusHealth = 0;
	this.bonusArmor = 0;

	// Roll values
	this.allowedPrefixes = [];
	this.allowedSuffixes = [];
	this.rollLevel = new Interval(100, 100);
	this.rollDamageMin = new Interval(0, 0);
	this.rollDamageMax = new Interval(0, 0);
	this.rollHealth = new Interval(0, 0);
	this.rollArmor = new Interval(0, 0);
}

Item.prototype.instantianate = function(base, level) {
	this.name = base.name;
	this.rarity = base.rarity;
	this.slot = base.slot;
	this.equipType = base.equipType;
	this.classRequirement = base.classRequirement;

	// Determine affixes
	if (base.allowedPrefixes.length > 0) {
		var prefix = base.allowedPrefixes[getRandomInt(0, base.allowedPrefixes.length)];
		databaseFindPrefix(prefix).applyTo(this, AffixTypeEnum.Prefix);
	}
	if (base.allowedSuffixes.length > 0) {
		var suffix = base.allowedSuffixes[getRandomInt(0, base.allowedSuffixes.length)];
		databaseFindSuffix(suffix).applyTo(this, AffixTypeEnum.Suffix);
	}
	// Check level
	if (level != undefined) {
		this.level = level;
	}
	else {
		this.level = getIntervalInt(base.rollLevel);
	}
	// Roll stats
	this.bonusDamageMin = getIntervalInt(scaleInterval(base.rollDamageMin, this.level, null));
	this.bonusDamageMax = getIntervalInt(scaleInterval(base.rollDamageMax, this.level, null));
	this.bonusHealth = getIntervalInt(scaleInterval(base.rollHealth, this.level, null));
	this.bonusArmor = getIntervalInt(scaleInterval(base.rollArmor, this.level, null));
	// Determine secondary stats
	this.price = this.bonusDamageMin + this.bonusDamageMax + this.bonusHealth + this.bonusArmor;
}