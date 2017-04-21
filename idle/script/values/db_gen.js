
var heroExpReq = [];
function heroExpReqGen() {
	for (var i = 0; i <= 70; i++) {
		heroExpReq.push(i * (100 + (i - 1) * 35));
	}
}





function databaseGenerateValues() {
	heroExpReqGen();
}