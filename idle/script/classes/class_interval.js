
function Interval(min, max) {
	this.min = min;
	this.max = max;
}

Interval.prototype.add = function(interval) {
	this.min += interval.min;
	this.max += interval.max;
}

Interval.prototype.isInside = function(value) {
	return (value >= this.min && value <= this.max);
}