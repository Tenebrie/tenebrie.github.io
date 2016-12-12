
class Inventory {
	// Constructor
	constructor() {
		this.list = [];
	}
	// Add an extra item
	AddItem(id, count) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				this.list[i].count += count;
				return;
			}
		}
		var newItem = new Object();
		newItem.id = id;
		newItem.count = count;
		this.list.push(newItem);
	}
	// Remove an item
	RemoveItem(id, count) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				this.list[i].count -= count;
				if (this.list[i].count <= 0.00) {
					this.list.splice(i, 1);
				}
				return;
			}
		}
	}
	// Unload some items to the nest storage
	UnloadItemsToNest(count) {
		if (this.list.length > 0) {
			var item = this.list[0];
			var toDrop = Math.min(count, this.list[0].count);
			if (item.id == "meat_raw") { nestFood += toDrop; this.RemoveItem(item.id, toDrop); }
			return true;
		}
		return false;
	}
	// Remove decimals from the item counts
	DropDecimals() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].count = Math.floor(this.list[i].count);
		}
	}
	// Return the amount of different items in the inventory
	Count() {
		return this.list.length;
	}
	// Return the total amount of items in the inventory
	CountTotal() {
		var count = 0;
		for (var i = 0; i < this.list.length; i++) {
			count += this.list[i].count;
		}
		return count;
	}
}