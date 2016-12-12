
//=====================================================================
// Start a new social group
//=====================================================================
function PopStartSocialGroup(pop) {
	var group = new SocialGroup();
	group.AddPop(population[pop].id);
	group.location = population[pop].location;
	socialGroups.push(group);
}

//=====================================================================
// Add a newbie to the owner's group
//=====================================================================
function PopsAddToGroup(owner, newbie) {
	for (var i = 0; i < socialGroups.length; i++) {
		if (socialGroups[i].HasPop(population[owner].id)) {
			socialGroups[i].AddPop(population[newbie].id);
		}
	}
}

//=====================================================================
// Is pop in any social group
//=====================================================================
function PopIsInGroup(pop) {
	if (population[pop] == undefined)
		return false;

	for (var i = 0; i < socialGroups.length; i++) {
		if (socialGroups[i].HasPop(population[pop].id)) {
			return true;
		}
	}
	return false;
}

//=====================================================================
// Are two pops in the same group
//=====================================================================
function PopsAreInGroup(pop_a, pop_b) {
	for (var i = 0; i < socialGroups.length; i++) {
		if (socialGroups[i].HasPop(population[pop_a].id) && socialGroups[i].HasPop(population[pop_b].id)) {
			return true;
		}
	}
	return false;
}

//=====================================================================
// Get a pop's social group
//=====================================================================
function PopGetGroup(pop) {
	if (population[pop] == undefined)
		return undefined;

	for (var i = 0; i < socialGroups.length; i++) {
		if (socialGroups[i].HasPop(population[pop].id)) {
			return i;
		}
	}
	return undefined;
}

//=====================================================================
// Get amount of members of pop's social group
//=====================================================================
function PopGetGroupSize(pop) {
	if (population[pop] == undefined)
		return 0;
	var group = socialGroups[PopGetGroup(pop)];
	if (group == undefined)
		return 1;
	return group.members.length;
}

//=====================================================================
// Remove a pop from a social group (and destroy it, if needed)
//=====================================================================
function PopRemoveFromGroup(pop) {
	for (var i = 0; i < socialGroups.length; i++) {
		if (socialGroups[i].HasPop(population[pop].id)) {
			socialGroups[i].RemovePop(population[pop].id);
			// Destroy groups with a single pop
			if (socialGroups[i].members.length <= 1) { socialGroups.splice(i, 1); }
		}
	}
}

//=====================================================================
// Find some group or create a new one
//=====================================================================
function PopLookForGroup(pop) {
	// Check if there is already a suitable group
	var groups = [];
	for (var i = 0; i < socialGroups.length; i++) {
		if (population[pop].location == socialGroups[i].location) {
			//groups.push(i);
			socialGroups[i].AddPop(pop);
			return;
		}
	}
	// Find somebody else
	var mates = [];
	for (var i = 0; i < population.length; i++) {
		if (population[i].id != population[pop].id && population[i].location == population[pop].location && PopIsInGroup(i) == false) {
			//var wantsToSocialize = (GetPopDesireIndex(i, 'group_join') <= 2);
			var wantsToSocialize = (population[i].activity == 'group_join');
			if (wantsToSocialize) {
				mates.push(i);
			}
		}
	}
	// Push everyone to group
	if (mates.length > 0) {
		PopStartSocialGroup(pop);
		for (var i = 0; i < mates.length; i++) {
			PopsAddToGroup(pop, mates[i]);
			population[mates[i]].activityTimer = 0;
		}
		//console.log("Group " + socialGroups.length + " size: " + socialGroups[socialGroups.length - 1].members.length);
	}
	// Be sad
	else {
		population[pop].socializeFailTimer = 100;
	}
}