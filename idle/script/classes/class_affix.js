
function Affix() {
	// Basic info
	this.id = '';
	this.text = '';
	this.type;

	this.extraDamageMin = new Interval(0, 0);
	this.extraDamageMax = new Interval(0, 0);
	this.extraHealth = new Interval(0, 0);
	this.extraArmor = new Interval(0, 0);
}

Affix.prototype.applyTo = function(item, type) {
	if (type == AffixTypeEnum.Prefix) {
		item.name = this.text + ' ' + item.name;
	}
	else if (type == AffixTypeEnum.Suffix) {
		item.name = item.name + ' ' + this.text;
	}
	item.rollDamageMin.add(this.extraDamageMin);
	item.rollDamageMax.add(this.extraDamageMax);
	item.rollHealth.add(this.extraHealth);
	item.rollArmor.add(this.extraArmor);
}