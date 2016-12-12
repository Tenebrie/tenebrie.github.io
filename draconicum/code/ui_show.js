
//=====================================================================
// Display basic stats
//=====================================================================
function ShowNestStats() {
	Find("PopulationCounter").innerHTML = population.length;
	Find("FoodCounter").innerHTML = Math.floor(nestFood);
}

//=====================================================================
// Display the current population
//=====================================================================
function ShowPopulation() {
	var output = "";
	if (localeData == undefined) { return; }
	for (var i = 0; i < population.length; i++) {
		var div = "<div class='PopStats'>";
		// Name
		div += "<div>" + ApplyLocale("generic", population[i].race) + " " + population[i].name + "</div>";
		// Race
		//div += "<div>" + population[i].race + "</div>";
		// Location
		div += "<div>" + ApplyLocale("location", population[i].location) + "</div>";
		// Activity
		div += "<div><p class='PopActivity'>" + population[i].activityString + "</p></div>";
		div += "<div><p class='PopDesire'>" + population[i].desireString + "</p></div>";
		// Needs
		if (debugMode) {
			div += "<div>- Energy: " + Math.round(population[i].energy) + "</div>";
			div += "<div>Needs:";
			div += "<div>- Food: " + Math.round(population[i].needsFood) + "</div>";
			div += "<div>- Water: " + Math.round(population[i].needsWater) + "</div>";
			div += "<div>- Sleep: " + Math.round(population[i].needsSleep) + "</div>";
			div += "<div>- Shower: " + Math.round(population[i].needsShower) + "</div>";
			div += "<div>- Social: " + Math.round(population[i].needsSocial) + "</div>";
			div += "</div>";
			// Group
			div += "<div>" + ApplyLocale("generic", "group") + ": " + PopGetGroup(i) + "</div>";
		}
		// Items
		div += "<div>" + ApplyLocale("generic", "items") + ":";
		if (population[i].items.Count() == 0) {
			div += "<div>- " + ApplyLocale("generic", "none") + "</div>";
		}
		else {
			for (var y = 0; y < population[i].items.Count(); y++) {
				var count = Math.floor(population[i].items.list[y].count);
				var name = ApplyLocale("item", population[i].items.list[y].id);
				div += "<div>- " + count + "x " + name + "</div>";
			}
		}
		div += "</div>";
		// End of div
		div += "</div>"
		output += div;
	}
	Find("Population").innerHTML = output;
}