function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function formatDate(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('.');
}

function formatDateTime(date) {
	let d = new Date(date),
		hours = '' + d.getHours(),
		minutes = '' + d.getMinutes(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (hours.length < 2) hours = '0' + hours;
	if (minutes.length < 2)  minutes = '0' + minutes;
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [hours, minutes].join(':') + ' ' + [day, month, year].join('.');
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function toCamelCase(str) {
	if (str === undefined || str === null) {
		return '';
	}
	return str.replace(/[A-Z]/g, ' $&').replace(/^./, str.toUpperCase());
}

function capitalize(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function stripMarkup(text) {
	const htmlTagPattern = /<[^>]+>/g;
	return text.replace(htmlTagPattern, '');
}