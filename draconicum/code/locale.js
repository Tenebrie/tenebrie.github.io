
function LoadLocaleData(locale) {
	var filename = "localization/" + locale + ".json";
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == XMLHttpRequest.DONE) {
			ParseLocaleData(req.responseText);
			ApplyStaticLocale();
		}
	}
	req.open("GET", filename, true);
	req.overrideMimeType("application/json");
	req.send();
}

function ParseLocaleData(data) {
	localeData = JSON.parse(data);
}

function ApplyStaticLocale() {
	Find("PopulationLabel").innerHTML = ApplyLocale("generic", "population") + ":";
	Find("FoodLabel").innerHTML = ApplyLocale("generic", "food") + ":";
}

function FetchLocaleValue(source, key) {
	var output = key;
	if (source[key] != undefined) {
		if (typeof source[key] === "string") {
			output = source[key];
		}
		else if (typeof source[key] === "object") {
			output = source[key][Math.floor(GetRandom(0, source[key].length))];
		}
	}
	return output;
}

function ApplyLocale(type, input) {
	var output = input;
	if (localeData != undefined) {
		if (type == "generic")
			output = FetchLocaleValue(localeData.generic, input);
		else if (type == "location")
			output = FetchLocaleValue(localeData.locations, input);
		else if (type == "activity")
			output = FetchLocaleValue(localeData.activities, input);
		else if (type == "desire")
			output = FetchLocaleValue(localeData.desires, input);
		else if (type == "item")
			output = FetchLocaleValue(localeData.items, input);
	}
	return output;
}