
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

function ApplyLocale(type, input, pop) {
	var output = input;
	if (localeData != undefined) {
		var source;
		// Prefer group text over individual text
		if (pop != undefined && PopIsInGroup(pop)) {
			if (type == "activity")
				source = localeData.activities_ingroup;
			else if (type == "desire")
				source = localeData.desires_ingroup;

			if (source != undefined) {
				output = FetchLocaleValue(source, input);
				if (output != input)
					return output;
			}
		}
		// Not in group or no group text found, fallback to individual
		if (type == "generic")
			source = localeData.generic;
		else if (type == "location")
			source = localeData.locations;
		else if (type == "activity")
			source = localeData.activities;
		else if (type == "desire")
			source = localeData.desires;
		else if (type == "item")
			source = localeData.items;

		output = FetchLocaleValue(source, input);
	}
	return output;
}