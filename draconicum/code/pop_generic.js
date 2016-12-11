
//=====================================================================
// Convert id into pop
//=====================================================================
function PopFromId(id) {
	for (var i = 0; i < population.length; i++) {
		if (population[i].id == id) { return i; }
	}
	return undefined;
}

//=====================================================================
// Check if pop has perk
//=====================================================================
function GetPopPerkBool(pop, id) {
	for (var i = 0; i < population[pop].perks.length; i++) {
		if (population[pop].perks[i] == id) {
			return true;
		}
	}
	return false;
}

//=====================================================================
// Get pop's desire index in the list
//=====================================================================
function GetPopDesireIndex(pop, activity) {
	for (var i = 0; i < population[pop].desireList.length; i++) {
		if (population[pop].desireList[i] == activity) {
			return i;
		}
	}
	return -1;
}