
const cardState = {
	namespaced: true,
	state: {
		isFreeBuild: false,
		isFreeDraw: false,
		cardName: '',
		cardDescription: '',
	},
	getters: {
		// isFreeBuild: () => state => {
		// 	return state.isFreeBuild;
		// },
		// isFreeDraw: () => state => {
		// 	return state.isFreeDraw;
		// },
		// cardName: () => state => {
		// 	return state.cardName;
		// },
		// cardDescription: () => state => {
		// 	return state.cardDescription;
		// },
	},

	mutations: {
		load(state, value) {
			state.cardName = value.cardName;
			state.cardDescription = value.cardDescription;
			state.isFreeBuild = value.isFreeBuild;
			state.isFreeDraw = value.isFreeDraw;
			app.$emit(Event.CARD_STATE_UPDATED);
		},
		clear(state) {
			state.cardName = '';
			state.cardDescription = '';
			state.isFreeBuild = false;
			state.isFreeDraw = false;
			app.$emit(Event.CARD_STATE_UPDATED);
		},
		setFreeBuild(state, value) {
			state.isFreeBuild = value;
			app.$emit(Event.CARD_STATE_UPDATED);
		},
		setFreeDraw(state, value) {
			state.isFreeDraw = value;
			app.$emit(Event.CARD_STATE_UPDATED);
		},
		setCardName(state, value) {
			state.cardName = value;
			app.$emit(Event.CARD_TEXT_UPDATED);
		},
		setCardDescription(state, value) {
			state.cardDescription = value;
			app.$emit(Event.CARD_TEXT_UPDATED);
		},
	},
};

const cardLibrary = {
	namespaced: true,
	state: {
		data: [],
	},
	getters: {
		getCardById: state => id => {
			for (let i = 0; i < state.data.length; i++) {
				if (state.data[i].id === id) {
					return state.data[i];
				}
			}
			return null;
		},
	},
	mutations: {
		push(state, value) {
			state.data.push(value);
		},
		delete(state, value) {
			state.data.splice(state.data.indexOf(value), 1);
		},
		load(state, value) {
			for (let i = 0; i < value.length; i++) {
				state.data.push(value[i]);
			}
		},
	},
};

const vueStore = new Vuex.Store({
	modules: {
		cardState: cardState,
		cardLibrary: cardLibrary,
	},
	plugins: [ autosaverPlugin ],
});