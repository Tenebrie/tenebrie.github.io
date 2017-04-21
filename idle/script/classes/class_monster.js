
Monster.prototype = new Unit();
Monster.prototype.constructor = Monster;

function Monster() {
	// Creating default values
	this.id;
	this.name;
	this.rarity;
	this.expReward;
	// Stats - readonly
	this.damageMin;
	this.damageMax;
	this.armor;
	// Timers
	this.attackTimer = 0;

	// Initialization
}

Monster.prototype.copy = function(base) {
	this.id = base.id;
	this.name = base.name;
	this.rarity = base.rarity;
	this.level = base.level;
	this.expReward = base.expReward;

	this.health = base.health;
	this.maxHealth = base.maxHealth;

	this.damageMin = base.damageMin;
	this.damageMax = base.damageMax;
	this.armor = base.armor;
}