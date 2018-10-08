let storageKey = 'cardLibrary';
let api = {
	load: function () {
		let json = window.localStorage.getItem(storageKey) || JSON.stringify('');
		return JSON.parse(json)
	},
	save: function(content, callback) {
		window.localStorage.setItem(storageKey, JSON.stringify(content));
		callback();
	},
};

let autosaverPlugin = function (store) {
	store.commit('cardLibrary/load', api.load());

	store.subscribe(function (mutation, state) {
		if (mutation.type === 'cardLibrary/push' || mutation.type === 'cardLibrary/delete') {
			api.save(store.state.cardLibrary.data, function () {
				// This callback doesn't need to do anything yet
			});
		}
	})
};