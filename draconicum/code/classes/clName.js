
class Name {
	static Generate(race) {
		// Static names:
			// Лення'Лян
		// Dynamic names:
		var name = "";
		var left = ['Нар', 'Зер', 'Кин', 'Лен', 'Ван', 'Тар'];
		var center = ['ра', 'ну', 'ма', 'кро', 'ня'];
		var right = ["'Тер", "'Зер", "'Мин", "'Лян", "'Сур", "'Аир"]
		var veryRight = ['то', 'ру', 'ра', 'на', 'так'];
		name = left[Math.floor(GetRandom(0, left.length))];
		name += center[Math.floor(GetRandom(0, center.length))];
		name += right[Math.floor(GetRandom(0, right.length))];
		if (GetRandom(0, 1) <= 0.70)
			name += veryRight[Math.floor(GetRandom(0, veryRight.length))];

		return name;
	}
}