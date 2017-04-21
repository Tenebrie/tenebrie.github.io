
//=====================================================================
// Adjust pop's stats
//=====================================================================
function AdjustPopStat(pop, stat, amount) {
	if (stat == 'energy') {
		population[pop].energy += amount;
		if (population[pop].energy < 0) { population[pop].energy = 0; }
		if (population[pop].energy > 100) { population[pop].energy = 100; }
	}
}

//=====================================================================
// Move the pop's timer
//=====================================================================
function TickPopTimer(pop, timer, amount) {
	if (timer == "socializeFail") {
		population[pop].socializeFailTimer -= amount;
		if (population[pop].socializeFailTimer < 0.00)
			population[pop].socializeFailTimer = 0.00;
	}
	else if (timer == "patience") {
		population[pop].patienceTimer -= amount;
		if (population[pop].patienceTimer < 0.00)
			population[pop].patienceTimer = 0.00;
	}
}

//=====================================================================
// Get pop's stat modifier
//=====================================================================
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
	if (mod == "drain_social") {
		return 1.00;
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
		var fromEnergy = (100 - population[pop].energy) / 400;
		return 1.0 - fromEnergy + fromSpeed;
	}
}

//=====================================================================
// Apply activity in-progress effects
//=====================================================================
function UpdatePopInProgress(pop, TMOD) {
	// TODO: IN-PROGRESS EFFECTS GO HERE
	// Hunting for meat
	if (population[pop].activity == "hunting") {
		AdjustPopStat(pop, 'energy', -activities['hunting'].physicalLoad * TMOD);
		population[pop].huntingTimer += 1000 * TMOD;
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
		var isMoreLeft = population[pop].items.UnloadItemsToNest(10.00 * TMOD);
		if (isMoreLeft == false) {
			// Reset the role and stop activity
			population[pop].activityTimer = 0;
			population[pop].currentRole = 'none';
		}
	}
	// Leaving the group
	if (population[pop].activity == "waiting" && population[pop].patienceTimer <= 0) {
		SetActivity(pop, "group_leave");
	}
}

//=====================================================================
// Apply activity on-completion effects
//=====================================================================
function UpdatePopOnCompletion(pop) {
	// Move to another location after travel
	if (population[pop].activity.indexOf('travel_') == 0) {
		population[pop].location = population[pop].activity.split('_')[1];
	}
	// Drop decimals from inventory before unloading
	if (population[pop].activity == 'goto_unload') {
		population[pop].items.DropDecimals();
	}
	// Creating (joining to) a group
	if (population[pop].activity == 'group_join') {
		PopLookForGroup(pop);
	}
	// Leaving a group
	if (population[pop].activity == 'group_leave') {
		PopRemoveFromGroup(pop);
		population[pop].socializeFailTimer = 100;
	}
}

//=====================================================================
// Modify stats and needs
//=====================================================================
function UpdatePopStats(pop, TMOD) {
	// Needs grow
	population[pop].needsFood += 0.30 * GetPopModifier(pop, "drain_food") * TMOD;
	population[pop].needsWater += 0.50 * GetPopModifier(pop, "drain_water") * TMOD;
	population[pop].needsSleep += 0.15 * GetPopModifier(pop, "drain_sleep") * TMOD;
	population[pop].needsShower += 0.07 * GetPopModifier(pop, "drain_shower") * TMOD;
	population[pop].needsSocial += 0.20 * GetPopModifier(pop, "drain_social") * TMOD;
	// Energy
	AdjustPopStat(pop, 'energy', 0.50 * GetPopModifier(pop, "regen_energy") * TMOD);
	// Needs drop
	// Eat
	if (population[pop].activity == "eating") {
		if (nestFood > 0.00) {
			nestFood -= 2.00 * TMOD;
			if (nestFood < 0.00) { nestFood = 0.00; }
			population[pop].needsFood -= 15.00 * TMOD;
			if (population[pop].needsFood <= 0.00) {
				population[pop].needsFood = 0.00;
				population[pop].activityTimer = 0;
			}
		}
		if (nestFood <= 0.00)
			population[pop].activityTimer = 0;
	}
	// Drink
	if (population[pop].activity == "drinking") {
		population[pop].needsWater -= 30.00 * TMOD;
		if (population[pop].needsWater <= 0.00) {
			population[pop].needsWater = 0.00;
			population[pop].activityTimer = 0;
		}
	}
	// Sleep
	if (population[pop].activity == "sleeping") {
		population[pop].needsSleep -= 10.00 * TMOD;
		if (population[pop].needsSleep <= 0.00) {
			population[pop].needsSleep = 0.00;
		}
	}
	// Shower
	if (population[pop].activity == "cleaning" || population[pop].activity == "swimming") {
		if (population[pop].activity == "cleaning") {
			population[pop].needsShower -= 5.00 * TMOD;
			if (population[pop].needsShower < 0) { population[pop].needsShower = 0; }
		}
		if (population[pop].activity == "swimming") {
			population[pop].needsShower -= 15.00 * TMOD;
			if (population[pop].needsShower < 0) { population[pop].needsShower = 0; }
			AdjustPopStat(pop, 'energy', -activities['swimming'].physicalLoad * TMOD);
			if (population[pop].energy < 0) { population[pop].activityTimer = 0; }
		}
	}
	// Any social activity
	if (PopIsInGroup(pop)) {
		population[pop].needsSocial -= 0.50 * TMOD;
		if (population[pop].needsSocial < 0.00)
			population[pop].needsSocial = 0.00;
	}
	// Crying lonely
	if (population[pop].activity == "crying_lonely") {
		population[pop].needsSocial -= 0.75 * TMOD;
		if (population[pop].needsSocial < 0.00) {
			population[pop].needsSocial = 0.00;
			population[pop].activityTimer = 0;
		}
	}
	// In-progress effects
	UpdatePopInProgress(pop, TMOD);
	// TIMERS
	TickPopTimer(pop, "patience", 1.00 * TMOD);
	TickPopTimer(pop, "socializeFail", 1.00 * TMOD);
}

//=====================================================================
// Calculate desires
//=====================================================================
function UpdatePopDesires(pop) {
	var desire = [];
	for (var i = 0; i < 32; i++) { desire[i] = new Object(); desire[i].value = -10000; }

	// Save old desire to compare later
	var oldDesire = population[pop].desire;
	// Initialize variables
	var energy = population[pop].energy;
	var needsFood = population[pop].needsFood;
	var needsWater = population[pop].needsWater;
	var needsSleep = population[pop].needsSleep;
	var needsShower = population[pop].needsShower;
	var needsSocial = population[pop].needsSocial;

	var itemCount = population[pop].items.CountTotal();

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
	desire[4].value = 10.00 + (GetFoodDemand() - nestFood) - GetRoleCount('hunter') * 100 + GetPopPerkBool(pop, 'hunter') * 25.00;
	desire[5].id = 'cleaning';
	desire[5].value = 15.00 + needsShower + GetPopPerkBool(pop, 'cleanie') * 25.00;
	desire[6].id = 'goto_swim';
	desire[6].value = (35.00 + needsShower) * (energy / 100) + GetPopPerkBool(pop, 'likesWater') * 25.00;
	desire[7].id = 'running';
	desire[7].value = energy / 2.00 + GetPopPerkBool(pop, 'hyperactive') * 25.00;
	desire[8].id = 'group_join';
	desire[8].value = needsSocial - (PopIsInGroup(pop) ? 1000 : 0) - GetPopPerkBool(pop, 'asocial') * 25.00;
	desire[9].id = 'group_leave';
	desire[9].value = 80 - needsSocial * 2 - (PopIsInGroup(pop) ? 0 : 1000) + GetPopPerkBool(pop, 'asocial') * 25.00;
	desire[10].id = 'goto_unload';
	desire[10].value = itemCount * 10;
	desire[11].id = 'crying_lonely';
	desire[11].value = needsSocial / 3 - (PopIsInGroup(pop) ? 1000 : 0) + GetPopPerkBool(pop, 'lonely') * 25.00;
	desire[12].id = 'playing';
	desire[12].value = needsSocial + GetPopPerkBool(pop, 'hyperactive') * 15.00 + GetPopPerkBool(pop, 'playful') * 15.00;

	// Apply cooldowns and group size requirements
	for (var i = 0; i < desire.length; i++) {
		if (desire[i].id != undefined) {
			desire[i].value -= GetPopActivityCooldown(pop, desire[i].id);
			desire[i].value -= (PopGetGroupSize(pop) >= activities[desire[i].id].social ? 0 : 1000);
		}
	}

	// Sort the list
	desire.sort(function(a, b) {
		if (a.value > b.value) { return -1; }
		if (a.value < b.value) { return 1; }
		return 0;
	});
	// Set new desire
	population[pop].desire = desire[0].id;
	population[pop].desireList = desire;
	if (population[pop].desire != oldDesire) {
		population[pop].desireString = ApplyLocale("desire", population[pop].desire, pop);
	}
}