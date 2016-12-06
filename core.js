
//=====================================================================
// Class declarations
//=====================================================================
class Level
{
	constructor(Name, PointStartValue, PointValue, PointMultiplier)
	{
		var PointsEndValue = PointStartValue + PointValue * 4 * PointMultiplier;
		var PointsHalfValue = Math.floor(PointsEndValue / 2);
		var PointsIncrement = Math.round(Math.floor(PointsEndValue / 2) / 4);
		this.Name = Name;
		this.Points = [0, 0, 0, 0, 0];
		for (var i = 0; i < 5; i += 1)
		{
			this.Points[i] = PointsHalfValue + PointsIncrement * i;
		}
		this.Points[4] += 1;
	}
}

class Upgrade
{
	// Create new upgrade
	constructor(Id, Name, Description, Cost, ParentId, Class)
	{
		this.Id = Id;
		this.Name = Name;
		this.Description = Description;
		this.Cost = Cost;
		this.ParentId = ParentId;
		this.Class = Class;
		this.Purchased = false;
	}
	// [Internal use]
	// Get index of an upgrade in the array
	static GetIndexOf(Id)
	{
		for (var i = 0; i < GlobalUpgrades.length; i++)
		{
			if (GlobalUpgrades[i].Id == Id)
			{
				return i;
			}
		}
		return -1;
	}
	// Is the upgrade visible on the list (i.e. can be purchased)
	static IsVisible(Id)
	{
		var Index = Upgrade.GetIndexOf(Id);
		// No upgrade found or already purchased - hide
		if (Index == -1 || GlobalUpgrades[Index].Purchased == true)
			return false;
		// Special conditions
		if (Id == "cheat_extraLife" && TotalExamsFailed == 0) { return false; }
		// No parent (and not purchased yet) - show
		if (GlobalUpgrades[Index].ParentId == null)
			return true;
		// Else look for parent
		for (var i = 0; i < GlobalUpgrades.length; i++)
		{
			if (GlobalUpgrades[i].Id == GlobalUpgrades[Index].ParentId)
			{
				if (Upgrade.IsPurchased(GlobalUpgrades[i].Id) == true) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		return false;
	}
	// Is the upgrade already purchased
	static IsPurchased(Id)
	{
		var Index = Upgrade.GetIndexOf(Id);
		if (Index == -1)
			return false;
		return GlobalUpgrades[Index].Purchased;
	}
	// Is the upgrade a part of a class
	static IsClassified(Id, Class)
	{
		var Index = Upgrade.GetIndexOf(Id);
		if (Index == -1)
			return false;
		return (GlobalUpgrades[Index].Class.indexOf(Class) != -1)
	}
	// Buy the upgrade
	static Buy(Id)
	{
		var Index = Upgrade.GetIndexOf(Id);
		var Cost = GlobalUpgrades[Index].Cost;
		if (CurrencyUnits >= Cost)
		{
			Stats_TotalUpgrades += 1;
			// Cheat check
			if (Upgrade.IsClassified(Id, "cheat"))
			{
				if (Math.random() <= CheatFailChance) {
					// You've been caught
					TotalCheatsFound = 1;
					ShowHome();
					return;
				}
				else {
					CheatFailChance += 0.05;
				}
				Stats_TotalCheats += 1;
			}
			// Check check passed, use the money
			CurrencyUnits -= Cost;
			GlobalUpgrades[Index].Purchased = true;
			// Special upgrades
			if (Id == "cheat_extraLife") { TotalExamsFailed -= 1; }
			if (Id == "cheat_twin") { NextExam_OnClick(); ExamPoints = GlobalLevels[CurrentExamOrdinal].Points[Math.round(Math.random() * 5)]; EndExam_OnClick(); }
			if (Id == "time_travel") { Stats_TimeTravels += 1; CurrentExamOrdinal = 0; TotalExamsPassed = 0; TotalExamsFailed = 0; CheatFailChance = 0.00; }
			// Resettable
			if (Upgrade.IsClassified(Id, "repeatable")) { GlobalUpgrades[Index].Purchased = false; }
			// Update
			UpdateHome();
		}
	}
}

//=====================================================================
// Global scope variables
//=====================================================================
var CurrentExamOrdinal = 0;
var TotalExamsPassed = 0;
var TotalExamsFailed = 0;
var TotalCheatsFound = 0;
var GlobalLevels = [];
var GlobalUpgrades = [];
var ExamPoints = 0;
var CurrencyUnits = 100;
var LastExamPassed = true;
var DebugMode = false;
var CheatFailChance = 0.00;

var Stats_Timestamp = 0;
var Stats_TotalClicks = 0;
var Stats_TotalExams = 0;
var Stats_TotalUpgrades = 0;
var Stats_TotalCheats = 0;
var Stats_TotalMoney = 0;
var Stats_TimeTravels = 0;

//=====================================================================
// Initialization
//=====================================================================
function Initialization()
{
	Stats_Timestamp = new Date();
	Stats_TotalMoney += CurrencyUnits;
	// Push levels
	// Note: The levels will appear in that order. Point counts are independant from the level names and setup below.
	// You can change the names here if you wish, but be careful with formatting.
	var LevelNames =
	[
		"Admission Exam || August, Year 1",
		"Orientation Week Exam || September, Year 1",
		"Teachers' Names Exam || October, Year 1",
		"Basics of Clicking Exam || November, Year 1",
		"Christmas Celebration Exam || December, Year 1",
		"Timetable Fundamentals Exam || January, Year 1",
		"Advanced Clicking Exam || February, Year 1",
		"Clicking on Linux Exam || March, Year 1",
		"Clicking the Kernel Exam || April, Year 1",
		"First Year Comprehensive Exam || May, Year 1",
		"Summer Holiday Exam || September, Year 2",
		"Teachers' Family Names Exam || October, Year 2",
		"Psychology of the Click Exam || November, Year 2",
		"Advanced Christmas Exam || December, Year 2",
		"Professional Clicking Exam || January, Year 2",
		"Time Management Exam || February, Year 2",
		"History of Clicking Exam || March, Year 2",
		"Clicker Heroes Practice Exam || April, Year 2",
		"Second Year Comprehensive Exam || May, Year 2",
		"Mouse Structure Exam || September, Year 3",
		"Gamepad Clicking Exam || October, Year 3",
		"Theory of Inspiration Exam || November, Year 3",
		"Basics of Cheating Exam || December, Year 3",
		"Determination Exam || January, Year 3",
		"Clicker Game Design Exam || February, Year 3",
		"Clicker Game Programming Exam || March, Year 3",
		"Clicker Game Gaming Exam || April, Year 3",
		"What Am I Doing With My Life Exam || May, Year 3",
		"Basics of Clicker Thesis || September, Year 4",
		"Advanced Cheating Exam || October, Year 4",
		"Cheat Management Exam || November, Year 4",
		"Time Travel For Dummies Exam || December, Year 4",
		"Click The Thesis Exam || January, Year 4",
		"Classmates' Names Exam || February, Year 4",
		"Preliminary Comprehensive Clicking Exam || March, Year 4",
		"Final Comprehensive Clicking Exam || April, Year 4",
		"Thesis Seminar || May, Year 4",
	];
	// Points setup
	var StartValue = 10;
	var PointValue = 2;
	var PointMultiplier = 1;
	var i = 0;
	while(LevelNames.length > 0)
	{
		var Name = LevelNames.shift();
		GlobalLevels.push(new Level(Name, StartValue, PointValue, PointMultiplier));
		StartValue += 5;
		PointValue += 1;
		if (i % 10 == 0)
		{
			StartValue -= 5;
			PointMultiplier += 1;
		}
		// Year incrementer
		if (i == 10 || i == 19 || i == 28) { PointMultiplier += 1; }
		i += 1;
	}

	// Push upgrades
	// Note: If you wish to change the priority in the upgrade list, change the order here (move the whole string up or down).
	// GlobalUpgrades.push(new Upgrade(id, DisplayedName, Description, Cost, ParentId, Classification))
	GlobalUpgrades.push(new Upgrade("click01", "Enthusiasm", "Each click now gives you 2 points.", 3, null, ""));
	GlobalUpgrades.push(new Upgrade("click02", "Courage", "Each click now gives you 3 points.", 4, "click01", ""));
	GlobalUpgrades.push(new Upgrade("click03", "Persistence", "Each click now gives you 4 points.", 5, "click02", ""));
	GlobalUpgrades.push(new Upgrade("click04", "Dedication", "Each click now gives you 5 points.", 6, "click03", ""));
	GlobalUpgrades.push(new Upgrade("click05", "Determination", "Each click now gives you 10 points.", 7, "click04", ""));
	GlobalUpgrades.push(new Upgrade("speed01", "Time Management, Introductory course", "Your clicks are now 50% faster.", 3, null, ""));
	GlobalUpgrades.push(new Upgrade("speed02", "Time Management, Advanced course", "Your clicks are now 2 times faster.", 4, "speed01", ""));
	GlobalUpgrades.push(new Upgrade("speed03", "Time Management, Professional course", "Your clicks are now 3 times faster.", 5, "speed02", ""));
	GlobalUpgrades.push(new Upgrade("speed04", "Time Management, Scientific course", "Your clicks are now 4 times faster.", 6, "speed03", ""));
	GlobalUpgrades.push(new Upgrade("time01", "Alarm Clock", "You get slightly more time for an exam.", 1, null, ""));
	GlobalUpgrades.push(new Upgrade("time02", "Redundant Alarm Clocks", "You get even more time for an exam.", 2, "time01", ""));
	GlobalUpgrades.push(new Upgrade("time03", "Overclocked Alarm Clock", "You get all the time in the world for an exam.", 3, "time02", ""));
	GlobalUpgrades.push(new Upgrade("time_travel", "Time Travel Machine", "You return to the first exam with all your knowledge!", 5, "time03", "consumable&reset"));
	GlobalUpgrades.push(new Upgrade("speed_jacobs", "Time Management, Jacobs course", "Fires as fast as you can pull down the trigger.", 7, "speed04", ""));
	GlobalUpgrades.push(new Upgrade("crit", "Sudden Inspiration", "You have a 5% chance to get inspired and double your points for a click.", 3, "click01", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage01", "Massive Inspiration, Level 1", "Inspiration now gives you 2.5x points.", 3, "crit", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage02", "Massive Inspiration, Level 2", "Inspiration now gives you 3.0x points.", 3, "crit_damage01", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage03", "Massive Inspiration, Level 3", "Inspiration now gives you 3.5x points.", 3, "crit_damage02", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage04", "Massive Inspiration, Level 4", "Inspiration now gives you 4.0x points.", 4, "crit_damage03", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage05", "Massive Inspiration, Level 5", "Inspiration now gives you 4.5x points.", 4, "crit_damage04", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage06", "Massive Inspiration, Level 6", "Inspiration now gives you 5.0x points.", 4, "crit_damage05", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage07", "Massive Inspiration, Level 7", "Inspiration now gives you 5.5x points.", 5, "crit_damage06", ""));
	GlobalUpgrades.push(new Upgrade("crit_damage08", "Massive Inspiration, Level 8", "Inspiration now gives you 6.0x points.", 5, "crit_damage07", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance01", "Reliable Inspiration, Level 1", "Inspiration now has 10% chance to occur.", 3, "crit", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance02", "Reliable Inspiration, Level 2", "Inspiration now has 15% chance to occur.", 3, "crit_chance01", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance03", "Reliable Inspiration, Level 3", "Inspiration now has 20% chance to occur.", 3, "crit_chance02", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance04", "Reliable Inspiration, Level 4", "Inspiration now has 25% chance to occur.", 4, "crit_chance03", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance05", "Reliable Inspiration, Level 5", "Inspiration now has 30% chance to occur.", 4, "crit_chance04", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance06", "Reliable Inspiration, Level 6", "Inspiration now has 35% chance to occur.", 4, "crit_chance05", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance07", "Reliable Inspiration, Level 7", "Inspiration now has 40% chance to occur.", 5, "crit_chance06", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance08", "Reliable Inspiration, Level 8", "Inspiration now has 45% chance to occur.", 5, "crit_chance07", ""));
	GlobalUpgrades.push(new Upgrade("crit_chance09", "Reliable Inspiration, Level 9", "Inspiration now has 50% chance to occur.", 5, "crit_chance08", ""));
	GlobalUpgrades.push(new Upgrade("cheat_base", "Cheating", "Unlock the cheats. Be careful with those though.", 3, null, ""));
	GlobalUpgrades.push(new Upgrade("cheat_extraLife", "Extra Life", "Let's pretend that one failed exam didn't happen, ok?", 1, "cheat_base", "cheat&repeatable"));
	GlobalUpgrades.push(new Upgrade("cheat_twin", "Find a Twin", "You ask your twin to come to the next exam instead of you.", 2, "cheat_base", "cheat&repeatable"));
	GlobalUpgrades.push(new Upgrade("cheat_fakePaper", "Fake Paper", "You start the next exam with some amount of points.", 1, "cheat_base", "cheat&consumable"));
	GlobalUpgrades.push(new Upgrade("cheat_bribe", "Bribe a Teacher", "Your time for the next exam is doubled.", 1, "cheat_base", "cheat&consumable"));
	//GlobalUpgrades.push(new Upgrade("crit_double01", "Inspiration Overflow", "Inspiration now can happen one extra time.", 5, "crit_damage08"));
	//GlobalUpgrades.push(new Upgrade("crit_double02", "Inspiration Overflow", "Inspiration now can happen one extra time.", 5, "crit_chance09"));
	// Debug stuff
	if (DebugMode == true) {
		CurrencyUnits += 100;
		GlobalUpgrades[Upgrade.GetIndexOf("speed_jacobs")].Purchased = true;
	}
	// Show starting UI
	ShowTitle();
}

//=====================================================================
// Event handlers
//=====================================================================
function StartGame_OnClick()
{
	Exam_Timer();
	ShowExam();
}

function WorkHard_OnClick()
{
	Stats_TotalClicks += 1;
	if (ExamPoints < GlobalLevels[CurrentExamOrdinal].Points[4])
	{
		// Start timer
		if (Upgrade.IsPurchased("speed_jacobs") == false)
		{
			WorkHard_Timer();
			document.getElementById("ExamWorkHard").disabled = true;
		}
		// Insta-finish timer
		else
		{
			WorkHard_TimerEnd();
		}
	}
}

function WorkHard_TimerEnd()
{
	// Add the points				
	ExamPoints += GetExamPointsPerClick();
	// Update points
	var Goal = GetCurrentExamPointsGoal();
	if (ExamPoints > Goal) { ExamPoints = Goal; }
	UpdateExamPoints();
}

function EndExam_OnClick()
{
	// Update the stats
	var Grade = GetCurrentExamGrade();
	Stats_TotalExams += 1;
	if (Grade == 0 && DebugMode == false) {
		LastExamPassed = false;
		TotalExamsFailed += 1;
	}
	else {
		LastExamPassed = true;
		TotalExamsPassed += 1;
	}
	CurrencyUnits += Grade;
	Stats_TotalMoney += Grade;
	// Clear consumables
	for (var i = 0; i < GlobalUpgrades.length; i++) {
		if (Upgrade.IsClassified(GlobalUpgrades[i].Id, "consumable")) {
			GlobalUpgrades[i].Purchased = false;
		}
	}

	window.clearInterval(ExamTimerId);
	ShowHome();
}

function NextExam_OnClick()
{
	if (CurrentExamOrdinal < GlobalLevels.length - 1)
	{
		Exam_Timer();
		ExamPoints = 0;
		if (LastExamPassed == true && Upgrade.IsPurchased("time_travel") == false) {
			CurrentExamOrdinal += 1;
		}
		// Use consumables
		if (Upgrade.IsPurchased("cheat_fakePaper")) { ExamPoints = Math.round(Math.random() * GlobalLevels[CurrentExamOrdinal].Points[2]); }
		ShowExam();
	}
}

function BuyUpgrade_OnClick(ButtonId)
{
	var UpgradeId = ButtonId.substring(7);
	Upgrade.Buy(UpgradeId);
}

//=====================================================================
// Supplementary functions
//=====================================================================
function GetExamPointsPerClick()
{
	var PointsToAdd = 1;
	// Vanilla points
	if (Upgrade.IsPurchased("click01")) { PointsToAdd = 2; } 
	if (Upgrade.IsPurchased("click02")) { PointsToAdd = 3; } 
	if (Upgrade.IsPurchased("click03")) { PointsToAdd = 4; } 
	if (Upgrade.IsPurchased("click04")) { PointsToAdd = 5; } 
	if (Upgrade.IsPurchased("click05")) { PointsToAdd = 10; } 
	// Inspiration
	if (Upgrade.IsPurchased("crit"))
	{
		// Calculate the chance
		var CritChance = 0.05;
		if (Upgrade.IsPurchased("crit_chance01")) { CritChance = 0.10; }
		if (Upgrade.IsPurchased("crit_chance02")) { CritChance = 0.15; }
		if (Upgrade.IsPurchased("crit_chance03")) { CritChance = 0.20; }
		if (Upgrade.IsPurchased("crit_chance04")) { CritChance = 0.25; }
		if (Upgrade.IsPurchased("crit_chance05")) { CritChance = 0.30; }
		if (Upgrade.IsPurchased("crit_chance06")) { CritChance = 0.35; }
		if (Upgrade.IsPurchased("crit_chance07")) { CritChance = 0.40; }
		if (Upgrade.IsPurchased("crit_chance08")) { CritChance = 0.45; }
		if (Upgrade.IsPurchased("crit_chance09")) { CritChance = 0.50; }
		var CritFactor = 2;
		if (Upgrade.IsPurchased("crit_damage01")) { CritFactor = 2.5; }
		if (Upgrade.IsPurchased("crit_damage02")) { CritFactor = 3.0; }
		if (Upgrade.IsPurchased("crit_damage03")) { CritFactor = 3.5; }
		if (Upgrade.IsPurchased("crit_damage04")) { CritFactor = 4.0; }
		if (Upgrade.IsPurchased("crit_damage05")) { CritFactor = 4.5; }
		if (Upgrade.IsPurchased("crit_damage06")) { CritFactor = 5.0; }
		if (Upgrade.IsPurchased("crit_damage07")) { CritFactor = 5.5; }
		if (Upgrade.IsPurchased("crit_damage08")) { CritFactor = 6.0; }
		// Apply critical(s)
		var CritRolls = 1;
		if (Upgrade.IsPurchased("crit_double01")) { CritRolls += 1; }
		if (Upgrade.IsPurchased("crit_double02")) { CritRolls += 1; }
		for (var i = 0; i < CritRolls; i++)
		{
			var Roll = Math.random();
			if (Roll < CritChance) { PointsToAdd *= CritFactor; }
			else { break; }
		}
	}
	return Math.floor(PointsToAdd);
}

function GetWorkHardTimeModifier()
{
	var SpeedModifier = 1.0;
	if (Upgrade.IsPurchased("speed01")) { SpeedModifier = 1.5; }
	if (Upgrade.IsPurchased("speed02")) { SpeedModifier = 2.0; }
	if (Upgrade.IsPurchased("speed03")) { SpeedModifier = 3.0; }
	if (Upgrade.IsPurchased("speed04")) { SpeedModifier = 4.0; }
	return SpeedModifier;
}

function GetCurrentExamGrade()
{
	var Grade = 5;
	for (var i = 0; i < 5; i++) {
		if (ExamPoints < GlobalLevels[CurrentExamOrdinal].Points[i]) {
			Grade = i;
			break;
		}
	}
	return Grade;
}

function GetCurrentExamPointsGoal()
{
	return GlobalLevels[CurrentExamOrdinal].Points[4];
	// The following code returns the next goal value depending on the current grade.
	/*var Goal = GlobalLevels[CurrentExamOrdinal].Points[4];
	for (var i = 0; i < 5; i++) {
		if (ExamPoints < GlobalLevels[CurrentExamOrdinal].Points[i]) {
			Goal = GlobalLevels[CurrentExamOrdinal].Points[i];
			break;
		}
	}
	return Goal;*/
}

function ShowHome()
{
	// Display home
	document.getElementById("Title").style.display = "none";
	document.getElementById("Exam").style.display = "none";
	document.getElementById("Home").style.display = "block";
	document.getElementById("HomeGameOver").style.display = "none";
	// Game over conditions
	var ShowStatistics = false;
	if (CurrentExamOrdinal >= GlobalLevels.length - 1)
	{
		ShowStatistics = true;
		document.getElementById("HomeContinue").style.display = "none";
		document.getElementById("HomeGameOver").style.display = "block";
		document.getElementById("HomeGameOver_Win").style.display = "block";
		document.getElementById("HomeGameOver_Fail").style.display = "none";
		document.getElementById("HomeGameOver_Cheat").style.display = "none";
		document.getElementById("NextExamBtn").style.display = "none";
	}
	else if (TotalExamsFailed == 3)
	{
		ShowStatistics = true;
		document.getElementById("HomeContinue").style.display = "none";
		document.getElementById("HomeGameOver").style.display = "block";
		document.getElementById("HomeGameOver_Win").style.display = "none";
		document.getElementById("HomeGameOver_Fail").style.display = "block";
		document.getElementById("HomeGameOver_Cheat").style.display = "none";
		document.getElementById("NextExamBtn").style.display = "none";
	}
	else if (TotalCheatsFound == 1)
	{
		ShowStatistics = true;
		document.getElementById("HomeContinue").style.display = "none";
		document.getElementById("HomeGameOver").style.display = "block";
		document.getElementById("HomeGameOver_Win").style.display = "none";
		document.getElementById("HomeGameOver_Fail").style.display = "none";
		document.getElementById("HomeGameOver_Cheat").style.display = "block";
		document.getElementById("NextExamBtn").style.display = "none";
	}
	// Summarize statistics
	if (ShowStatistics == true)
	{
		var Timestamp = new Date();
		var SecondsRaw = Math.floor((Timestamp - Stats_Timestamp) / 1000);
		// Calculate values
		var Hours = Math.floor(SecondsRaw / 3600);
		var Minutes = Math.floor(SecondsRaw / 60) - Hours * 60;
		var Seconds = SecondsRaw - Minutes * 60 - Hours * 60;
		// Display values
		var Stats_TimeTaken = "";
		if (Hours < 10) { Stats_TimeTaken += "0"; }
		Stats_TimeTaken += Hours + ":";
		if (Minutes < 10) { Stats_TimeTaken += "0"; }
		Stats_TimeTaken += Minutes + ":";
		if (Seconds < 10) { Stats_TimeTaken += "0"; }
		Stats_TimeTaken += Seconds;
		document.getElementById("Stats_TimeTaken").innerHTML = Stats_TimeTaken;
		document.getElementById("Stats_TotalClicks").innerHTML = Stats_TotalClicks;
		document.getElementById("Stats_TotalExams").innerHTML = Stats_TotalExams;
		document.getElementById("Stats_TotalUpgrades").innerHTML = Stats_TotalUpgrades;
		document.getElementById("Stats_TotalCheats").innerHTML = Stats_TotalCheats;
		document.getElementById("Stats_TotalMoney").innerHTML = Stats_TotalMoney;
		document.getElementById("Stats_TimeTravels").innerHTML = Stats_TimeTravels;
	}
	// Update the UI
	UpdateHome();
}

function ShowExam()
{
	document.getElementById("Title").style.display = "none";
	document.getElementById("Home").style.display = "none";
	document.getElementById("Exam").style.display = "block";
	UpdateExamPoints();
	UpdateExamOrdinal();
}

function ShowTitle()
{
	document.getElementById("Title").style.display = "block";
	document.getElementById("Home").style.display = "none";
	document.getElementById("Exam").style.display = "none";
}

function WorkHard_Timer()
{
	var TimerId = window.setInterval(WorkHard_OnProgressUpdate, 20);
	var Timestamp = new Date();
	var Value = 1000;
	var MaxValue = 1000;

	function WorkHard_OnProgressUpdate()
	{
		if (Value >= MaxValue)
		{
			Value = 0;
		}
		else
		{
			var NewTimestamp = new Date();
			Value += (NewTimestamp - Timestamp) * GetWorkHardTimeModifier();
			Timestamp = NewTimestamp;
			if (Value >= MaxValue)
			{
				window.clearInterval(TimerId);
				document.getElementById("ExamWorkHard").disabled = false;
				WorkHard_TimerEnd();
			}
		}
		var Progress = document.getElementById("ExamWorkProgress");
		if (Progress != null) {
			// Normal
			Progress.max = MaxValue;
			Progress.value = Value;
		}
		else {
			// Bootstrap
			var Progress = document.getElementById("ExamWorkProgressNew");
			if (Value == 0) {
				Progress.style.transition = '0s';
				Progress.style.width = '0%';
			}
			else {
				var TimeNeeded = 1 / GetWorkHardTimeModifier();
				Progress.style.transition = TimeNeeded + 's';
				Progress.style.width = '100%';
			}
			//Progress.style.width = (Value / 10) + '%';
		}
	}
}

var ExamTimerId;
function Exam_Timer()
{
	ExamTimerId = window.setInterval(Exam_OnTimerUpdate, 1000);
	var TimerData = 61;
	if (Upgrade.IsPurchased("time01")) { TimerData += 15; }
	if (Upgrade.IsPurchased("time02")) { TimerData += 30; }
	if (Upgrade.IsPurchased("time03")) { TimerData += 45; }
	if (Upgrade.IsPurchased("cheat_bribe")) { TimerData *= 2; TimerData -= 1; }
	Exam_OnTimerUpdate();

	function Exam_OnTimerUpdate()
	{
		TimerData -= 1;
		// Get label
		var Label = document.getElementById("ExamTimeProgress");
		// Calculate values
		var Minutes = Math.floor(TimerData / 60);
		var Seconds = TimerData - Minutes * 60;
		// Display values
		var LabelText = "";
		if (Minutes < 10)
		{
			LabelText += "0";
		}
		LabelText += Minutes + ":";
		if (Seconds < 10)
		{
			LabelText += "0";
		}
		LabelText += Seconds;
		Label.innerHTML = LabelText;

		if (TimerData == -1)
		{
			EndExam_OnClick();
		}
	}
}

//=====================================================================
// UI update functions
//=====================================================================
function UpdateExamPoints()
{
	// Calculate the goal and grade
	var Grade = GetCurrentExamGrade();
	var PointsGoal = GetCurrentExamPointsGoal();
	// Update the UI
	document.getElementById("ExamPointsCurrent").innerHTML = ExamPoints;
	document.getElementById("ExamPointsMax").innerHTML = PointsGoal;
	document.getElementById("ExamGradeValue").innerHTML = Grade;
	// Grade color code
	if (Grade == 0) {
		document.getElementById("ExamGradeValue").style.color = "red";
	}
	else if (Grade < 5) {
		document.getElementById("ExamGradeValue").style.color = "orange";
	}
	else if (Grade == 5) {
		document.getElementById("ExamGradeValue").style.color = "green";
	}
}

function UpdateExamOrdinal()
{
	if (document.getElementById("ExamDate") == null) {
		// Normal
		document.getElementById("ExamName").innerHTML = GlobalLevels[CurrentExamOrdinal].Name;
	}
	else {
		// Bootstrap
		var ExamName = GlobalLevels[CurrentExamOrdinal].Name.substring(0, GlobalLevels[CurrentExamOrdinal].Name.indexOf("||") - 1);
		var ExamDate = GlobalLevels[CurrentExamOrdinal].Name.substring(GlobalLevels[CurrentExamOrdinal].Name.indexOf("||") + 3);
		document.getElementById("ExamName").innerHTML = ExamName;
		document.getElementById("ExamDate").innerHTML = ExamDate;
	}
}

function UpdateHome()
{
	var Grade = GetCurrentExamGrade();
	// Determine the outcome message
	var ExamStatus;
	if (Upgrade.IsPurchased("time_travel")) { ExamStatus = "<span class='exam_success'>Welcome to the Clicker University!</span>"; }
	else if (Grade == 0 && DebugMode == false) { ExamStatus = "<span class='exam_failed'>You have failed the exam!</span>"; }
	else if (Grade == 0 && DebugMode == true) { ExamStatus = "<span class='exam_failed'>You have failed the exam! But it's debug mode so it's all k.</span>"; }
	else { ExamStatus = "<span class='exam_success'>Congratulations! <br>You have passed the exam with grade " + Grade; + "</span>"}
	// Update elements
	document.getElementById("HomeExamStatus").innerHTML = ExamStatus;
	document.getElementById("HomeCurrencyUnits").innerHTML = "Upgrade money: " + CurrencyUnits;
	document.getElementById("HomeExamsPassed").innerHTML = "- Exams passed: " + TotalExamsPassed;
	document.getElementById("HomeExamsFailed").innerHTML = "- Exams failed: " + TotalExamsFailed + " / 3";
	// Update upgrade list
	UpdateUpgradeList();
}

function UpdateUpgradeList()
{
	var Div = "";
	document.getElementById("HomeUpgrades").innerHTML = "";
	for (var i = 0; i < GlobalUpgrades.length; i++)
	{
		if (Upgrade.IsVisible(GlobalUpgrades[i].Id))
		{
			// Div tag
			Div = "<div id=\"Upg_" + GlobalUpgrades[i].Id + "\" class=\"HomeUpgradesFloater well col-md-12 col-xs-12\">";
			// Upgrade name
			Div += "<div><div>" + GlobalUpgrades[i].Name + "</div>";
			// Upgrade cost
			Div += "<p>Cost: " + GlobalUpgrades[i].Cost + "</p>";
			// Upgrade description
			Div += "<p class=\"HomeUpgradesText\">" + GlobalUpgrades[i].Description + "</p>";
			// Cheat warning
			if (Upgrade.IsClassified(GlobalUpgrades[i].Id, "cheat")) {
				Div += "<p class=\"HomeUpgradesCheatWarning\">You have a chance to be caught cheating!</p>";
			}
			// Reset warning
			if (Upgrade.IsClassified(GlobalUpgrades[i].Id, "reset")) {
				Div += "<p class=\"HomeUpgradesCheatWarning\">This will reset your progress, but keep your upgrades and currency.</p>";
			}
			Div += "</div>";
			// Button
			Div += "<button id=\"UpgBtn_" + GlobalUpgrades[i].Id + "\" class=\"HomeUpgradesButton btn btn-primary\" onclick=\"BuyUpgrade_OnClick(this.id)\"><span class=\"glyphicon glyphicon-shopping-cart\"></span> Buy</button>";
			// Div closing tag
			Div += "</div>"
			document.getElementById("HomeUpgrades").innerHTML += Div;
		}
	}
}