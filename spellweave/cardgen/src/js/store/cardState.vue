<script>
	import { app } from 'Application';

	export default {
		namespaced: true,
		state: {
			isFreeBuild: false,
			isFreeDraw: false,
			cardName: '',
			cardDescription: '',
			cardType: Type.PATH,
			cardPathType: PathType.NORMAL,
			cardElement: Element.GENERIC,
			cardManaCost: 1,
		},
		mutations: {
			load(state, value) {
				state.cardName = value.cardName;
				state.cardDescription = value.cardDescription;
				state.isFreeBuild = value.isFreeBuild;
				state.isFreeDraw = value.isFreeDraw;
				state.cardType = value.cardType;
				state.cardPathType = value.cardPathType;
				state.cardElement = value.cardElement;
				state.cardManaCost = value.cardManaCost;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			clear(state) {
				state.cardName = '';
				state.cardDescription = '';
				state.isFreeBuild = false;
				state.isFreeDraw = false;
				state.cardType = Type.PATH;
				state.cardPathType = PathType.NORMAL;
				state.cardElement = Element.DAMAGE;
				state.cardManaCost = 1;
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
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardDescription(state, value) {
				state.cardDescription = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardType(state, value) {
				state.cardType = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardPathType(state, value) {
				state.cardPathType = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardElement(state, value) {
				state.cardElement = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardManaCost(state, value) {
				state.cardManaCost = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
		},
	};
</script>