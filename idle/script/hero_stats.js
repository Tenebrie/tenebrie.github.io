
Hero.prototype.updateStats = function() {
	this.damageMin = 5;
	this.damageMax = 10;
	this.armor = 0;
	this.maxHealth = 100;

	for (var i = 0; i < playerInventory.equippedList.length; i++) {
		this.damageMin += playerInventory.equippedList[i].bonusDamageMin;
		this.damageMax += playerInventory.equippedList[i].bonusDamageMax;
		this.armor += playerInventory.equippedList[i].bonusArmor;
		this.maxHealth += playerInventory.equippedList[i].bonusHealth;
	}

	if (this.health > this.maxHealth) { this.health = this.maxHealth; }
};

Hero.prototype.startEngageTimer = function() {
	this.engageTimer = 2 + Math.random() * 5;
}