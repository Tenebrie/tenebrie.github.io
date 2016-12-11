
popIdGen = 0;
class Pop {
	constructor(race) {
		this.id = popIdGen++;
		this.name = Name.Generate(race);
		this.race = race;
		this.age = 0;
		this.role = "none";
		this.activity = "idle";
		this.activityString = "";
		this.activityTimer = -1;
		this.activityQueue = [];

		this.desire = "idle";
		this.desireList = [];
		this.desireString = "";
		this.energy = 100;	// [0; 100]
		this.needsFood = 0;
		this.needsWater = 0;
		this.needsSleep = 0;
		this.needsShower = 20;
		this.needsSocial = 50;

		this.location = "nest";
		this.items = new Inventory();
		this.huntingTimer = 0;
		this.patienceTimer = 0;
		this.socializeFailTimer = 0;

		this.statsSize = GetRandom(0.70, 1.30);
		this.statsSpeed = GetRandom(0.80, 1.20);
		this.statsActivity = GetRandom(0.75, 1.25);
		this.statsPatienceVal = GetRandom(20, 50);
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
		perkDataBank[5].id = 'asocial';
		perkDataBank[5].chance = 0.25;
		perkDataBank[6].id = 'lonely';
		perkDataBank[6].chance = 0.25;

		for (var i = 0; i < perkDataBank.length; i++) {
			if (GetRandom(0.00, 1.00) <= perkDataBank[i].chance) {
				resultList.push(perkDataBank[i].id);
			}
		}
		return resultList;
	}
}