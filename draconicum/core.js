
//=====================================================================
// Class declarations
//=====================================================================
class Name {
	static Generate(race) {
		return "Unnamed";
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
		this.activity = "idle";
		this.activityTimer = -1;
		this.activityQueue = [];

		this.desire = "";
		this.needsFood = 0;
		this.needsWater = 0;
		this.needsSleep = 0;

		this.location = "forest";
		this.items = new Inventory();
	}
}

//=====================================================================
// Global scope variables
//=====================================================================
var population = [];
var activities = [];
var locations = [];

var nestFood = 0;

//=====================================================================
// Initialization
//=====================================================================
function Initialization() {
	// Let's consider that we're starting a new game on every page load for now
	var activityList = ['idle', 'goto_eat', 'eating', 'sleeping', 'drinking',
	'goto_sleep', 'waking', 'goto_drink', 'goto_hunt', 'hunting', 'goto_unload',
	'unloading', 'goto_relax', 'relaxing'];

	for (var i = 0; i < activityList.length; i++) {
		activities[activityList[i]] = new Object();
		activities[activityList[i]].chain = 'idle';
		activities[activityList[i]].length = 3.00;
		activities[activityList[i]].location = 'nest';
	}
	activities['idle'].length = -1.00;
	activities['idle'].location = '*';
	activities['goto_eat'].chain = 'eating';
	activities['goto_eat'].length = 5.00;
	activities['goto_eat'].location = '*';
	activities['eating'].length = 15.00;
	activities['goto_drink'].chain = 'drinking';
	activities['goto_drink'].length = 0.00;
	activities['goto_drink'].location = '*';
	activities['drinking'].length = 15.00;
	activities['drinking'].location = 'river';
	activities['goto_sleep'].chain = 'sleeping';
	activities['goto_sleep'].length = 5.00;
	activities['goto_sleep'].location = '*';
	activities['sleeping'].chain = 'waking';
	activities['sleeping'].length = 30.00;
	activities['waking'].length = 7.50;
	activities['goto_hunt'].chain = 'hunting';
	activities['goto_hunt'].length = 5.00;
	activities['goto_hunt'].location = '*';
	activities['hunting'].chain = 'goto_unload';
	activities['hunting'].length = 20.00;
	activities['hunting'].location = 'forest';
	activities['goto_unload'].chain = 'unloading';
	activities['goto_unload'].length = 5.00;
	activities['unloading'].length = 50.00;
	activities['goto_relax'].chain = 'relaxing';
	activities['goto_relax'].length = 5.00;
	activities['relaxing'].length = 15.00;

	var locationList = ['nest', 'river', 'forest'];
	for (var i = 0; i < locationList.length; i++) {
		locations[locationList[i]] = new Object();
		locations[locationList[i]].distance = 0.00;
		activities['travel_' + locationList[i]] = new Object();
		activities['travel_' + locationList[i]].chain = 'idle';
		activities['travel_' + locationList[i]].length = 0.00;
	}
	locations['nest'].distance = 0.00;
	locations['river'].distance = 1.00;
	locations['forest'].distance = 10.00;

	// Generate population
	for (var i = 0; i < 3; i++) {
		population.push(new Pop("dragon"));
	}
	// Assign the event handlers
	window.setInterval(ShowNestStats, 1000 / VFPS);

	// Start stuff
	StartAI();
	// Show stuff
	ShowPopulation();
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
	// Update stats
	for (var i = 0; i < population.length; i++) {
		UpdatePopStats(i);
		UpdatePopDesires(i);
	}
	// Determine activity
	for (var i = 0; i < population.length; i++) {
		PreUpdateActivity(i);
		if (population[i].race == "dragon") { UpdateDragonActivity(i); }
	}
	// Update
	ShowPopulation();
}

function UpdatePopStats(pop) {
	// Needs grow
	population[pop].needsFood += GetRandom(0.20, 0.50) / LFPS;
	population[pop].needsWater += GetRandom(0.30, 0.70) / LFPS;
	population[pop].needsSleep += GetRandom(0.10, 0.20) / LFPS;
	// Needs drop
	// Eat
	if (population[pop].activity == "eating") {
		if (nestFood <= 0.00) {
			SetActivity(pop, "goto_hunt");
		}
		else {
			nestFood -= 5.00 / LFPS;
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
			population[pop].activityTimer = 0;
		}
	}
	// TODO: IN-PROGRESS EFFECTS GO HERE
	// Hunting for meat
	if (population[pop].activity == "hunting") {
		population[pop].items.AddItem('meat_raw', GetRandom(3.00, 5.00) / LFPS);
	}
	// Unloading items from inventory
	if (population[pop].activity == "unloading") {
		var isMoreLeft = population[pop].items.UnloadItemsToNest(10.00 / LFPS);
		if (isMoreLeft == false) { population[pop].activityTimer = 0; }
	}
}

function UpdatePopDesires(pop) {
	var desire = [];
	for (var i = 0; i < 16; i++) { desire[i] = new Object(); }

	desire[0].id = 'goto_relax';
	desire[0].value = 25;
	desire[1].id = 'goto_eat';
	desire[1].value = population[pop].needsFood;
	desire[2].id = 'goto_drink';
	desire[2].value = population[pop].needsWater;
	desire[3].id = 'goto_sleep';
	desire[3].value = population[pop].needsSleep;

	for (var i = 0; i < desire.length; i++) {
		desire.sort(function(a, b) {
			if (a.value > b.value) { return -1; }
			if (a.value < b.value) { return 1; }
			return 0;
		});
	}

	population[pop].desire = desire[0].id;
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
	else
	{
		SetActivity(pop, population[pop].desire);
		/*if (population[pop].needsWater >= 50) { SetActivity(pop, "goto_drink"); }
		else if (population[pop].needsFood >= 50)
		{
			//SetActivity(pop, "goto_eat");
			if (nestFood >= 30) { SetActivity(pop, "goto_eat"); }
			else { SetActivity(pop, "goto_hunt"); }
		}
		else if (population[pop].needsSleep >= 100)
		{
			SetActivity(pop, "goto_sleep");
		}
		else { SetActivity(pop, "idle", -1); }*/
	}
}

function SetActivity(pop, activity) {
	// Already in the correct location
	if (population[pop].location == activities[activity].location || activities[activity].location == '*') {
		population[pop].activity = activity;
		population[pop].activityTimer = activities[activity].length * 1000;
	}
	// Not the suitable location
	else {
		population[pop].activityQueue.unshift(activity);
		population[pop].activity = "travel_" + activities[activity].location;
		var distance = Math.abs(locations[population[pop].location].distance - locations[activities[activity].location].distance);
		population[pop].activityTimer = distance * 1000;
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
	Find("FoodCounter").innerHTML = nestFood;
}

function ShowPopulation() {
	var output = "";
	for (var i = 0; i < population.length; i++) {
		var div = "<div class='PopStats'>";
		// Name
		div += "<div>" + population[i].name + " " + population[i].race + "</div>";
		// Race
		//div += "<div>" + population[i].race + "</div>";
		// Location
		div += "<div>" + population[i].location + "</div>";
		// Activity
		div += "<div>" + population[i].activity + "</div>";
		// Needs
		div += "<div>Needs:";
		div += "<div>- Food: " + Math.round(population[i].needsFood) + "</div>";
		div += "<div>- Water: " + Math.round(population[i].needsWater) + "</div>";
		div += "<div>- Sleep: " + Math.round(population[i].needsSleep) + "</div>";
		div += "</div>";
		// Items
		div += "<div>Items:";
		if (population[i].items.Count() == 0) {
			div += "<div>- None</div>";
		}
		else {
			for (var y = 0; y < population[i].items.Count(); y++) {
				var count = Math.floor(population[i].items.list[y].count);
				var name = population[i].items.list[y].id;
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