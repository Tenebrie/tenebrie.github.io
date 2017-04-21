
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