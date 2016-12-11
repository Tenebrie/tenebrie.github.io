
class SocialGroup {
	constructor() {
		this.members = [];
		this.activity = "";
		this.activityTimer = -1;
		this.desire = "";
		this.desireList = [];
		this.location;
	}
	AddPop(id) {
		if (this.HasPop(id) == false) {
			this.members.push(id);
		}
	}
	HasPop(id) {
		for (var i = 0; i < this.members.length; i++) {
			if (this.members[i] == id) { return true; }
		}
		return false;
	}
	RemovePop(id) {
		for (var i = 0; i < this.members.length; i++) {
			if (this.members[i] == id) { this.members.splice(i, 1); }
		}
	}
}