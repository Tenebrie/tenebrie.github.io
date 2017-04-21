
function getIntervalInt(interval) {
	return getRandomInt(interval.min, interval.max);
}

function getRandomInt(min, max) {
	return Math.floor(getRandomFloat(min, max));
}

function getIntervalFloat(interval) {
	return getRandomFloat(interval.min, interval.max);
}

function getRandomFloat(min, max) {
	return min + Math.random() * (max - min);
}

function scaleValue(value, level, type) {
	return Math.pow((Math.sqrt(value) / 100) * level, 2);
}

function scaleInterval(interval, level, type) {
	return new Interval(scaleValue(interval.min, level, type), scaleValue(interval.max, level, type));
}