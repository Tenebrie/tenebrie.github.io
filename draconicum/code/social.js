
//=====================================================================
// Count amount of pops with the given role
//=====================================================================
function GetRoleCount(role) {
	var count = 0;
	for (var i = 0; i < population.length; i++) {
		if (population[i].currentRole == role) {
			count += 1;
		}
	}
	return count;
}

//=====================================================================
// Get the total demand for food
//=====================================================================
function GetFoodDemand() {
	var value = 0;
	for (var i = 0; i < population.length; i++) {
		value += population[i].needsFood;
	}
	return Math.min(value, 100);
}