
Hero.prototype.updateStats = function() {
	this.damageMin = 5;
	this.damageMax = 10;
	this.armor = 0;
};

Hero.prototype.startEngageTimer = function() {
	this.engageTimer = 2 + Math.random() * 5;
}