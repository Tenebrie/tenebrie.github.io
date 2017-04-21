
var databasePrefixList = [];
var databaseSuffixList = [];
function databaseCreatePrefixes() {
	var affix;
	affix = new Affix();
	affix.id = 'basic';
	affix.text = 'Basic';
	databasePrefixList.push(affix);

	affix = new Affix();
	affix.id = 'plain';
	affix.text = 'Plain';
	databasePrefixList.push(affix);

	affix = new Affix();
	affix.id = 'simple';
	affix.text = 'Simple';
	databasePrefixList.push(affix);

	affix = new Affix();
	affix.id = 'strong';
	affix.text = 'Strong';
	affix.extraArmor = new Interval(2000, 4000);
	databasePrefixList.push(affix);
}

function databaseCreateSuffixes() {
	var affix;
	affix = new Affix();
	affix.id = 'strong';
	affix.text = 'Strong';
	
	//databaseSuffixList.push(affix);
}

function databaseFindPrefix(id) {
	for (var i = 0; i < databasePrefixList.length; i++) {
		if (databasePrefixList[i].id == id) {
			return databasePrefixList[i];
		}
	}
	return undefined;
}

function databaseFindSuffix(id) {
	for (var i = 0; i < databaseSuffixList.length; i++) {
		if (databaseSuffixList[i].id == id) {
			return databaseSuffixList[i];
		}
	}
	return undefined;
}