
// Variable for the player's hero
var playerHero = null;
var playerInventory = new Inventory();

// Variables to describe enemies the player's hero is engaged with
var engagedEnemies = [];
var combatTurnTimer = 0;

// Variables to save the generated combat loot
var storedLootExp = 0;
var storedLootItems = [];

// Timestamp value for the main game logic
var advanceGameTimestamp = Date.now();