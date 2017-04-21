
function Unit() {
	// Creating default values
	this.isAlive = true;
	this.health = 100;
	this.maxHealth = 100;
	this.level = 1;
}

Unit.prototype.dealDamage = function(amount) {
	this.health -= amount;
	if (this.health <= 0) {
		this.health = 0;
		this.isAlive = false;
	}
}

Unit.prototype.heal = function(amount) {
	this.health += amount;
	if (this.health >= this.maxHealth) {
		this.health = this.maxHealth;
	}
}

Unit.prototype.ressurect = function() {
	if (this.isAlive == false) {
		this.isAlive = true;
		this.health = 1;
	}
}