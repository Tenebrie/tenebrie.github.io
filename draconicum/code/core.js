
//=====================================================================
// Global scope variables
//=====================================================================
var VFPS = 30;
var LFPS = 30;

var population = [];
var activities = [];
var locations = [];
var socialGroups = [];

var nestFood = 0;
var localeData;

var debugMode = false;

//=====================================================================
// Initialization
//=====================================================================
window.onload = function() { Initialization(); } 

function Initialization() {
	// Let's consider that we're starting a new game on every page load for now
	var activityList = ['idle', 'goto_eat', 'eating', 'sleeping', 'drinking',
	'goto_sleep', 'waking', 'goto_drink', 'goto_hunt', 'hunting', 'goto_unload',
	'unloading', 'goto_relax', 'relaxing', 'cleaning', 'goto_swim', 'swimming',
	'running', 'group_join', 'group_leave', 'gofrom_swim', 'waiting', 'crying_lonely',
	'crying_stop', 'playing'];

	for (var i = 0; i < activityList.length; i++) {
		activities[activityList[i]] = new Object();
		activities[activityList[i]].chain = 'idle';
		activities[activityList[i]].length = 3.00;
		activities[activityList[i]].location = 'nest';
		activities[activityList[i]].physicalLoad = 0.00;
		activities[activityList[i]].mentalLoad = 0.00;
		activities[activityList[i]].social = 0;
		activities[activityList[i]].cooldown = 50;
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
	activities['sleeping'].chain = 'waking';
	activities['sleeping'].length = 60.00;
	activities['waking'].length = 15.00;
	activities['goto_hunt'].chain = 'hunting';
	activities['goto_hunt'].length = 10.00;
	activities['goto_hunt'].location = '*';
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
	activities['goto_swim'].location = 'river';
	activities['goto_swim'].cooldown = 200;
	activities['swimming'].chain = 'gofrom_swim';
	activities['swimming'].length = 30.00;
	activities['swimming'].location = 'river';
	activities['swimming'].physicalLoad = 2.50;
	activities['gofrom_swim'].length = 10.00;
	activities['gofrom_swim'].location = 'river';
	activities['running'].length = 10.00;
	activities['running'].location = '*';
	activities['running'].physicalLoad = 2.00;
	activities['group_join'].length = 10.00;
	activities['group_join'].location = '*';
	activities['group_join'].cooldown = 250.00;
	activities['group_leave'].length = 5.00;
	activities['group_leave'].location = '*';
	activities['waiting'].location = '*';
	activities['crying_lonely'].chain = 'crying_stop';
	activities['crying_lonely'].length = 55.00;
	activities['crying_lonely'].location = '*';
	activities['crying_stop'].length = 10.00;
	activities['crying_stop'].location = '*';
	activities['playing'].length = 30.00;
	activities['playing'].location = '*';
	activities['playing'].social = 2;

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
	for (var i = 0; i < 10; i++) {
		population.push(new Pop("dragon"));
	}
	// Assign the event handlers
	window.setInterval(ShowNestStats, 1000 / VFPS);
	window.setInterval(ShowPopulation, 1000 / VFPS);
	Find("PopulationAdd").addEventListener("click", function() { AddNewDragon(1); });
	Find("PopulationAdd10").addEventListener("click", function() { AddNewDragon(10); });

	// Load locale
	LoadLocaleData("ru_ru");
	// Wait until locale
	var initTimer = setInterval(function() {
		if (localeData != undefined) {
			// Start stuff
			StartAI();
			// Show stuff
			ShowPopulation();
			// Kill timer
			clearInterval(initTimer);
		}
	}, 50)
}
