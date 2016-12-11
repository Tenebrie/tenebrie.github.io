
//=====================================================================
// Start AI loop
//=====================================================================
function StartAI() {
	window.setInterval(UpdatePops, 1000 / LFPS);
}

//=====================================================================
// Main AI update function
//=====================================================================
function UpdatePops() {
	// For each group...
	for (var i = 0; i < socialGroups.length; i++) {
		UpdateGroupDesires(i);
		SetGroupActivity(i, socialGroups[i].desire);
	}
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
}

//=====================================================================
// Activity check before the chains and desires apply
//=====================================================================
function PreUpdateActivity(pop) {
	// Move activity timer
	if (population[pop].activityTimer > 0)
	{
		// Move the timer value
		population[pop].activityTimer -= 1000 / LFPS;
		// Reached zero
		if (population[pop].activityTimer <= 0)
		{
			// Reset the value to exactly zero
			population[pop].activityTimer = 0;
			// TODO: ON-COMPLETION EFFECTS GO HERE!
			UpdatePopOnCompletion(pop);
		}
	}
}

//=====================================================================
// Dragons' behavior
//=====================================================================
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
		// If single - look for own desires
		if (PopIsInGroup(pop) == false)
			SetActivity(pop, population[pop].desire);
		// If in group...
		else {
			// If in the same area, then wait
			if (socialGroups[PopGetGroup(pop)].location == population[pop].location)
				SetActivityToWait(pop);
			// If in the different area, go there
			else
				TravelTo(pop, socialGroups[PopGetGroup(pop)].location);
		}
	}
}

//=====================================================================
// Set the pop's activity
//=====================================================================
function SetActivity(pop, activity) {
	if (activity == undefined || activity == "") return;
	// Save old activity
	var oldActivity = population[pop].activity;
	// Already in the correct location
	if (population[pop].location == activities[activity].location || activities[activity].location == '*') {
		population[pop].activity = activity;
		population[pop].activityTimer = (activities[activity].length * 1000) / GetPopModifier(pop, "speed");
	}
	// Not the suitable location
	else {
		population[pop].activityQueue.unshift(activity);
		TravelTo(pop, activities[activity].location);
	}
	// Assign current role
	if (activity == 'goto_hunt') { population[pop].currentRole = 'hunter'; }
	// Check the activity string
	if (population[pop].activity != oldActivity) {
		population[pop].activityString = ApplyLocale("activity", population[pop].activity);
	}
}

function TravelTo(pop, location) {
	population[pop].activity = "travel_" + location;
	var distance = Math.abs(locations[population[pop].location].distance - locations[location].distance);
	population[pop].activityTimer = (distance * 1000) / GetPopModifier(pop, "speed");
	if (GetPopPerkBool(pop, "fastFlyer")) { population[pop].activityTimer /= 2.00; }

	population[pop].activityString = ApplyLocale("activity", population[pop].activity);
}

//=====================================================================
// Set the pop's activity to wait
//=====================================================================
function SetActivityToWait(pop) {
	SetActivity(pop, 'waiting');
	population[pop].patienceTimer = population[pop].statsPatienceVal;
}

//=====================================================================
// Set the whole group's activity [Synchronized]
//=====================================================================
function SetGroupActivity(grp, activity) {
	var activityTimer = 0;
	if (grp != undefined) {
		// Check if everyone's ready
		for (var i = 0; i < socialGroups[grp].members.length; i++) {
			if (population[PopFromId(socialGroups[grp].members[i])].activity != 'waiting') {
				return;
			}
		}
		// Set the activity and calculate common timer
		for (var i = 0; i < socialGroups[grp].members.length; i++) {
			SetActivity(PopFromId(socialGroups[grp].members[i]), activity);
			activityTimer = Math.max(activityTimer, population[PopFromId(socialGroups[grp].members[i])].activityTimer);
		}
		// Set the timers
		for (var i = 0; i < socialGroups[grp].members.length; i++) {
			population[PopFromId(socialGroups[grp].members[i])].activityTimer = activityTimer;
		}
		// Move the location
		if (activities[activity].location != '*') {
		 	socialGroups[grp].location = activities[activity].location;
		}
	}
}

//=====================================================================
// Update group's desires
//=====================================================================
function UpdateGroupDesires(grp) {
	if (socialGroups[grp] == undefined)
		return;

	var desireList = [];
	// For each member...
	for (var i = 0; i < socialGroups[grp].members.length; i++) {
		var member = population[PopFromId(socialGroups[grp].members[i])];
		// For each desire in member...
		for (var y = 0; y < member.desireList.length; y++) {
			var matchFound = false;
			// Check each local desire...
			for (var u = 0; u < desireList.length; u++) {
				// If match - directly add data
				if (desireList[u].id == member.desireList[y].id) {
					matchFound = true;
					desireList[u].value += member.desireList[y].value;
				}
			}
			// Else add the new desire id and value
			if (matchFound == false) {
				var newDesire = new Object();
				newDesire.id = member.desireList[y].id;
				newDesire.value = member.desireList[y].value;
				desireList.push(newDesire);
			}
		}
	}
	// Sort the list
	desireList.sort(function(a, b) {
		if (a.value > b.value) { return -1; }
		if (a.value < b.value) { return 1; }
		return 0;
	});
	socialGroups[grp].desireList = desireList;
	socialGroups[grp].desire = desireList[0].id;
}