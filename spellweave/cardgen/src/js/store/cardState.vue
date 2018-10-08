<script>
	import { app } from 'Application';

	export default {
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
</script>