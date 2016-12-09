
//=====================================================================
// Class declarations
//=====================================================================
class Name {
	static Generate(race) {
		var name = "";
		var left = ['Нар', 'Зер', 'Кин', 'Лен', 'Ван', 'Тар'];
		var center = ['ра', 'ну', 'ма', 'кро', 'ня'];
		var right = ["'Тер", "'Зер", "'Мин", "'Лян", "'Сур", "'Аир"]
		var veryRight = ['то', 'ру', 'ра', 'на', 'так'];
		name = left[Math.floor(GetRandom(0, left.length))];
		name += center[Math.floor(GetRandom(0, center.length))];
		name += right[Math.floor(GetRandom(0, right.length))];
		if (GetRandom(0, 1) <= 0.70)
			name += veryRight[Math.floor(GetRandom(0, veryRight.length))];

		return name;
	}
}

class Inventory {
	// Constructor
	constructor() {
		this.list = [];
	}
	// Add an extra item
	AddItem(id, count) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				this.list[i].count += count;
				return;
			}
		}
		var newItem = new Object();
		newItem.id = id;
		newItem.count = count;
		this.list.push(newItem);
	}
	// Remove an item
	RemoveItem(id, count) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				this.list[i].count -= count;
				if (this.list[i].count <= 0.00) {
					this.list.splice(i, 1);
				}
				return;
			}
		}
	}
	// Unload some items to the nest storage
	UnloadItemsToNest(count) {
		if (this.list.length > 0) {
			var item = this.list[0];
			var toDrop = Math.min(count, this.list[0].count);
			if (item.id == "meat_raw") { nestFood += toDrop; this.RemoveItem(item.id, toDrop); }
			return true;
		}
		return false;
	}
	// Remove decimals from the item counts
	DropDecimals() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].count = Math.floor(this.list[i].count);
		}
	}
	// Return the amount of different items in the inventory
	Count() {
		return this.list.length;
	}
}

class Pop {
	constructor(race) {
		this.name = Name.Generate(race);
		this.race = race;
		this.age = 0;
		this.role = "none";
		this.activity = "idle";
		this.activityString = "";
		this.activityTimer = -1;
		this.activityQueue = [];

		this.desire = "idle";
		this.desireString = "";
		this.energy = 100;	// [0; 100]
		this.needsFood = 0;
		this.needsWater = 0;
		this.needsSleep = 0;
		this.needsShower = 20;

		this.location = "nest";
		this.items = new Inventory();
		this.huntingTimer = 0;

		this.statsSize = GetRandom(0.70, 1.30);
		this.statsSpeed = GetRandom(0.80, 1.20);
		this.statsActivity = GetRandom(0.75, 1.25);
		this.perks = Pop.GeneratePerks(race);
	}

	static GeneratePerks(race) {
		var resultList = [];
		var perkDataBank = [];
		for (var i = 0; i < 32; i++) { perkDataBank[i] = new Object(); }
		perkDataBank[0].id = 'likesWater';
		perkDataBank[0].chance = 0.25;
		perkDataBank[1].id = 'hyperactive';
		perkDataBank[1].chance = 0.25;
		perkDataBank[2].id = 'hunter';
		perkDataBank[2].chance = 0.25;
		perkDataBank[3].id = 'cleanie';
		perkDataBank[3].chance = 0.25;
		perkDataBank[4].id = 'fastFlyer';
		perkDataBank[4].chance = 0.25;

		for (var i = 0; i < perkDataBank.length; i++) {
			if (GetRandom(0.00, 1.00) <= perkDataBank[i].chance) {
				resultList.push(perkDataBank[i].id);
			}
		}
		return resultList;
	}
}

//=====================================================================
// Global scope variables
//=====================================================================
var population = [];
var activities = [];
var locations = [];

var nestFood = 0;
var localeData;

var debugMode = false;

//=====================================================================
// Initialization
//=====================================================================
function Initialization() {
	// Let's consider that we're starting a new game on every page load for now
	var activityList = ['idle', 'goto_eat', 'eating', 'sleeping', 'drinking',
	'goto_sleep', 'waking', 'goto_drink', 'goto_hunt', 'hunting', 'goto_unload',
	'unloading', 'goto_relax', 'relaxing', 'cleaning', 'goto_swim', 'swimming',
	'running'];

	for (var i = 0; i < activityList.length; i++) {
		activities[activityList[i]] = new Object();
		activities[activityList[i]].chain = 'idle';
		activities[activityList[i]].length = 3.00;
		activities[activityList[i]].location = 'nest';
		activities[activityList[i]].physicalLoad = 0.00;
		activities[activityList[i]].mentalLoad = 0.00;
	}
	activities['idle'].length = -1.00;
	activities['idle'].location = '*';
	activities['goto_eat'].chain = 'eating';
	activities['goto_eat'].length = 10.00;
	activities['goto_eat'].location = '*';
	activities['eating'].length = 30.00;
	activities['goto_drink'].chain = 'drinking';
	activities['goto_drink'].length = 0.00;
	activities['goto_drink'].location = '*';
	activities['drinking'].length = 30.00;
	activities['drinking'].location = 'river';
	activities['goto_sleep'].chain = 'sleeping';
	activities['goto_sleep'].length = 15.00;
	activities['goto_sleep'].location = '*';
	activities['sleeping'].chain = 'waking';
	activities['sleeping'].length = 60.00;
	activities['waking'].length = 15.00;
	activities['goto_hunt'].chain = 'hunting';
	activities['goto_hunt'].length = 10.00;
	activities['goto_hunt'].location = '*';
	activities['hunting'].chain = 'goto_unload';
	activities['hunting'].length = 30.00;
	activities['hunting'].location = 'forest';
	activities['hunting'].physicalLoad = 2.50;
	activities['goto_unload'].chain = 'unloading';
	activities['goto_unload'].length = 10.00;
	activities['unloading'].length = 100.00;
	activities['goto_relax'].chain = 'relaxing';
	activities['goto_relax'].length = 10.00;
	activities['relaxing'].length = 40.00;
	activities['cleaning'].length = 20.00;
	activities['cleaning'].location = '*';
	activities['goto_swim'].chain = 'swimming';
	activities['goto_swim'].length = 10.00;
	activities['goto_swim'].location = '*';
	activities['swimming'].length = 30.00;
	activities['swimming'].location = 'river';
	activities['swimming'].physicalLoad = 1.50;
	activities['running'].length = 10.00;
	activities['running'].location = '*';
	activities['running'].physicalLoad = 1.00;

	var locationList = ['nest', 'river', 'forest'];
	for (var i = 0; i < locationList.length; i++) {
		locations[locationList[i]] = new Object();
		locations[locationList[i]].distance = 0.00;
		activities['travel_' + locationList[i]] = new Object();
		activities['travel_' + locationList[i]].chain = 'idle';
		activities['travel_' + locationList[i]].length = 0.00;
	}
	locations['nest'].distance = 0.00;
	locations['river'].distance = 10.00;
	locations['forest'].distance = 45.00;

	// Generate population
	for (var i = 0; i < 3; i++) {
		population.push(new Pop("dragon"));
	}
	// Assign the event handlers
	window.setInterval(ShowNestStats, 1000 / VFPS);

	// Load locale
	LoadLocaleData("ru_ru");
	// Start stuff
	StartAI();
	// Show stuff
	ShowPopulation();
}

//=====================================================================
// Localization
//=====================================================================
function LoadLocaleData(locale) {
	var filename = "localization/" + locale + ".json";
	$.ajax({
  		url: filename,
  		done: function(response) {
  			console.log(response);
  		}
	});

	//var filename = "style.css";
	/*var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == XMLHttpRequest.DONE) {
			console.log(req.status);
			console.log(req.responseText);
			ParseLocaleData(req.responseText);
			ApplyStaticLocale();
		}
	}
	req.open("GET", filename, true);
	req.overrideMimeType("application/json");
	req.send();*/
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

//=====================================================================
// Event handlers
//=====================================================================

//=====================================================================
// AI functions
//=====================================================================
var VFPS = 10;
var LFPS = 10;
function StartAI() {
	window.setInterval(UpdatePops, 1000 / LFPS);
}

function UpdatePops() {
	// For each pop...
	for (var i = 0; i < population.length; i++) {
		// Update stats
		UpdatePopStats(i);
		// Update desires
		UpdatePopDesires(i);
		// Update current activity
		PreUpdateActivity(i);
		if (population[i].race == "dragon") { UpdateDragonActivity(i); }
	}
	// Determine activity
	for (var i = 0; i < population.length; i++) {
		
	}
	// Update
	ShowPopulation();
}

function GetPopModifier(pop, mod) {
	var curAct = population[pop].activity;
	if (mod == "drain_food") {
		var fromSize = population[pop].statsSize - 1.0;
		return 1.00 + fromSize;
	}
	if (mod == "drain_water") {
		var fromSize = population[pop].statsSize - 1.0;
		return 1.00 + fromSize;
	}
	if (mod == "drain_sleep") {
		return 1.00;
	}
	if (mod == "drain_shower") {
		var fromHunt = (population[pop].activity == 'hunting') ? 2.00 : 0.00;
		return 1.00 + fromHunt;
	}
	if (mod == "regen_energy") {
		if (curAct.substring(0, 6) == "travel") { return 0.00; }
		var fromFood = (100 - Math.min(100, population[pop].needsFood)) / 100;
		var fromSleep = Math.min(100, population[pop].needsSleep) / 100
		var fromActivity = (activities[curAct].physicalLoad > 0) ? 1.00 : 0.00;
		var fromRelaxing = (curAct == "relaxing") ? 1.00 : 0.00
		return 1.00 + fromFood - fromSleep - fromActivity + fromRelaxing;
	}
	if (mod == "speed") {
		// Must NEVER be exactly 0
		var fromSpeed = population[pop].statsSpeed - 1.00;
		var fromEnergy = (100 - population[pop].energy) / 200;
		return 1.0 - fromEnergy + fromSpeed;
	}
}

function GetSocialCount(role) {
	var count = 0;
	for (var i = 0; i < population.length; i++) {
		if (population[i].currentRole == role) {
			count += 1;
		}
	}
	return count;
}

function PopHasPerk(pop, id) {
	for (var i = 0; i < population[pop].perks.length; i++) {
		if (population[pop].perks[i] == id) {
			return true;
		}
	}
	return false;
}

function AdjustPopStat(pop, stat, amount) {
	if (stat == 'energy') {
		population[pop].energy += amount;
		if (population[pop].energy < 0) { population[pop].energy = 0; }
		if (population[pop].energy > 100) { population[pop].energy = 100; }
	}
}

function UpdatePopStats(pop) {
	// Needs grow
	population[pop].needsFood += 0.30 * GetPopModifier(pop, "drain_food") / LFPS;
	population[pop].needsWater += 0.50 * GetPopModifier(pop, "drain_water") / LFPS;
	population[pop].needsSleep += 0.15 * GetPopModifier(pop, "drain_sleep") / LFPS;
	population[pop].needsShower += 0.07 * GetPopModifier(pop, "drain_shower") / LFPS;
	// Energy
	AdjustPopStat(pop, 'energy', 0.50 * GetPopModifier(pop, "regen_energy") / LFPS);
	// Needs drop
	// Eat
	if (population[pop].activity == "eating") {
		if (nestFood <= 0.00) {
			SetActivity(pop, "goto_hunt");
		}
		else {
			nestFood -= 2.00 / LFPS;
			if (nestFood < 0.00) { nestFood = 0.00; }
			population[pop].needsFood -= 15.00 / LFPS;
			if (population[pop].needsFood <= 0.00) {
				population[pop].needsFood = 0.00;
				population[pop].activityTimer = 0;
			}
		}
	}
	// Drink
	if (population[pop].activity == "drinking") {
		population[pop].needsWater -= 30.00 / LFPS;
		if (population[pop].needsWater <= 0.00) {
			population[pop].needsWater = 0.00;
			population[pop].activityTimer = 0;
		}
	}
	// Sleep
	if (population[pop].activity == "sleeping") {
		population[pop].needsSleep -= 10.00 / LFPS;
		if (population[pop].needsSleep <= 0.00) {
			population[pop].needsSleep = 0.00;
		}
	}
	// Shower
	if (population[pop].activity == "cleaning" || population[pop].activity == "swimming") {
		if (population[pop].activity == "cleaning") {
			population[pop].needsShower -= 5.00 / LFPS;
		}
		if (population[pop].activity == "swimming") {
			population[pop].needsShower -= 15.00 / LFPS;
			if (population[pop].needsShower < 0) { population[pop].needsShower = 0; }
			AdjustPopStat(pop, 'energy', -activities['swimming'].physicalLoad / LFPS);
			if (population[pop].energy < 0) { population[pop].activityTimer = 0; }
		}
	}
	// TODO: IN-PROGRESS EFFECTS GO HERE
	// Hunting for meat
	if (population[pop].activity == "hunting") {
		AdjustPopStat(pop, 'energy', -activities['hunting'].physicalLoad / LFPS);
		population[pop].huntingTimer += 1000 / LFPS;
		if (population[pop].huntingTimer >= 1000) {
			population[pop].huntingTimer = 0;
			if (GetRandom(0.00, 1.00) <= 0.50) {
				population[pop].items.AddItem('meat_raw', Math.round(GetRandom(1.00, 5.00)));
				// Critical
				if (GetRandom(0.00, 1.00 <= 0.10)) {
					population[pop].items.AddItem('meat_raw', Math.round(GetRandom(5.00, 10.00)));
				}
			}
		}
		if (population[pop].energy <= 1.00) { population[pop].activityTimer = 0; }
	}
	// Unloading items from inventory
	if (population[pop].activity == "unloading") {
		var isMoreLeft = population[pop].items.UnloadItemsToNest(10.00 / LFPS);
		if (isMoreLeft == false) {
			// Reset the role and stop activity
			population[pop].activityTimer = 0;
			population[pop].currentRole = 'none';
		}
	}
}

function UpdatePopDesires(pop) {
	var desire = [];
	for (var i = 0; i < 16; i++) { desire[i] = new Object(); }

	// Save old desire to compare later
	var oldDesire = population[pop].desire;
	// Initialize variables
	var energy = population[pop].energy;
	var needsFood = population[pop].needsFood;
	var needsWater = population[pop].needsWater;
	var needsSleep = population[pop].needsSleep;
	var needsShower = population[pop].needsShower;

	// Initialize dynamic databank
	desire[0].id = 'goto_relax';
	desire[0].value = 100 - energy;
	desire[1].id = 'goto_eat';
	desire[1].value = needsFood * (nestFood / 25);
	desire[2].id = 'goto_drink';
	desire[2].value = needsWater;
	desire[3].id = 'goto_sleep';
	desire[3].value = needsSleep / 2;
	desire[4].id = 'goto_hunt';
	desire[4].value = 10.00 + (75 - nestFood) - GetSocialCount('hunter') * 100 + PopHasPerk(pop, 'hunter') * 25.00;
	desire[5].id = 'cleaning';
	desire[5].value = 15.00 + needsShower + PopHasPerk(pop, 'cleanie') * 25.00;
	desire[6].id = 'goto_swim';
	desire[6].value = (45.00 + needsShower) * (energy / 100) + PopHasPerk(pop, 'likesWater') * 25.00;
	desire[7].id = 'running';
	desire[7].value = energy / 2.00 + PopHasPerk(pop, 'hyperactive') * 25.00;

	// Sort the list
	for (var i = 0; i < desire.length; i++) {
		desire.sort(function(a, b) {
			if (a.value > b.value) { return -1; }
			if (a.value < b.value) { return 1; }
			return 0;
		});
	}
	// Set new desire
	population[pop].desire = desire[0].id;
	if (population[pop].desire != oldDesire) {
		population[pop].desireString = ApplyLocale("desire", population[pop].desire);
	}
}

function PreUpdateActivity(pop) {
	// Move activity timer
	if (population[pop].activityTimer > 0)
	{
		population[pop].activityTimer -= 1000 / LFPS;
		// Reached zero
		if (population[pop].activityTimer <= 0)
		{
			// Reset the value to exactly zero
			population[pop].activityTimer = 0;
			// TODO: ON-COMPLETION EFFECTS GO HERE!
			// Move to another location after travel
			if (population[pop].activity.indexOf('travel_') == 0) {
				population[pop].location = population[pop].activity.split('_')[1];
			}
			// Drop decimals from inventory before unloading
			if (population[pop].activity == 'goto_unload') {
				population[pop].items.DropDecimals();
			}
		}
	}
}

function UpdateDragonActivity(pop) {
	// Note
	// After an activity is completed or interrupted:
	// - Chained activities are TOP priority
	// - Queued activities are NEXT priority
	// - New activities are LAST priority

	// Do not interrupt locked activity
	if (population[pop].activityTimer > 0) { return; }
	// Chained activities
	var chain = activities[population[pop].activity].chain;
	var queue = population[pop].activityQueue;
	if (chain != "idle") {
		SetActivity(pop, chain);
	}
	// Queued activities
	else if (queue.length > 0) {
		SetActivity(pop, queue.shift());
	}
	// Do what it wants
	else {
		SetActivity(pop, population[pop].desire);
	}
}

function SetActivity(pop, activity) {
	// Save old activity
	var oldActivity = population[pop].activity;
	if (activities[activity] == undefined) { console.log(activity); return; }
	// Already in the correct location
	if (population[pop].location == activities[activity].location || activities[activity].location == '*') {
		population[pop].activity = activity;
		population[pop].activityTimer = (activities[activity].length * 1000) / GetPopModifier(pop, "speed");
	}
	// Not the suitable location
	else {
		population[pop].activityQueue.unshift(activity);
		population[pop].activity = "travel_" + activities[activity].location;
		var distance = Math.abs(locations[population[pop].location].distance - locations[activities[activity].location].distance);
		population[pop].activityTimer = (distance * 1000) / GetPopModifier(pop, "speed");
		if (PopHasPerk(pop, "fastFlyer")) { population[pop].activityTimer /= 2.00; }
	}
	// Assign current role
	if (activity == 'goto_hunt') { population[pop].currentRole = 'hunter'; }
	// Check the activity string
	if (population[pop].activity != oldActivity) {
		population[pop].activityString = ApplyLocale("activity", population[pop].activity);
	}
}

//=====================================================================
// Supplementary functions
//=====================================================================
function Find(Id) {
	return document.getElementById(Id);
}

function GetRandom(min, max) {
	return (Math.random() * (max - min)) + min;
}

//=====================================================================
// UI update functions
//=====================================================================
function ShowNestStats() {
	Find("PopulationCounter").innerHTML = population.length;
	Find("FoodCounter").innerHTML = Math.floor(nestFood);
}

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
			div += "</div>";
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