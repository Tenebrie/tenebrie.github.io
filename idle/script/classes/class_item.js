
function Item() {
	// Basic info
	this.name = 'Unnamed item';
	this.slot = null;
	this.equipType = ItemEquipTypeEnum.Generic;
	this.price = 0;
	// Bonus values
	this.bonusDamageMin = 0;
	this.bonusDamageMax = 0;
	this.bonusHealth = 0;
	this.bonusArmor = 0;

	// Roll values
	this.rollDamageMin = new Interval(0, 0);
	this.rollDamageMax = new Interval(0, 0);
	this.rollHealth = new Interval(0, 0);
	this.rollArmor = new Interval(0, 0);
}

Item.prototype.instantianate = function(base) {
	this.name = base.name;
	this.slot = base.slot;
	this.equipType = base.equipType;

	this.bonusDamageMin = getIntervalInt(base.rollDamageMin);
	this.bonusDamageMax = getIntervalInt(base.rollDamageMax);
	this.bonusHealth = getIntervalInt(base.rollHealth);
	this.bonusArmor = getIntervalInt(base.rollArmor);

	this.price = this.bonusDamageMin + this.bonusDamageMax + this.bonusHealth + this.bonusArmor;
}
