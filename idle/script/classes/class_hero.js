
Hero.prototype = new Unit();
Hero.prototype.constructor = Hero;

function Hero(heroClass) {
	// Creating default values
	this.mana = 100;
	this.maxMana = 100;
	this.exp = 0;
	this.action = ActionEnum.InTown;
	// Stats - readonly
	this.damageMin;
	this.damageMax;
	this.armor;
	// Timers
	this.engageTimer = 0;
	this.attackTimer = 0;
	// Initializing
	this.class = heroClass;
}

Hero.prototype.addExp = function(amount) {
	this.exp += amount;
	if (this.exp >= heroExpReq[this.level]) {
		this.level += 1;
		console.log('Hero levels up!');
	}
}