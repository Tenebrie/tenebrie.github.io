let storageKey = 'cardLibrary';
let backupKey = 'cardLibraryBackup';
let api = {
	load: function () {
		let json = window.localStorage.getItem(storageKey) || JSON.stringify('');
		return JSON.parse(json)
	},
	save: function(content) {
		window.localStorage.setItem(storageKey, JSON.stringify(content));
	},
	saveBackup: function(content) {
		window.localStorage.setItem(backupKey, JSON.stringify(content));
	},
};

let autosaverPlugin = function (store) {
	store.commit('cardLibrary/load', api.load());

	store.subscribe(function (mutation, state) {
		if (mutation.type === 'cardLibrary/push' || mutation.type === 'cardLibrary/delete') {
			api.save(store.state.cardLibrary.data);
		}
		if (mutation.type === 'cardLibrary/push') {
			api.saveBackup(store.state.cardLibrary.data);
		}
	})
};