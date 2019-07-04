<script>
	import { app } from 'Application';

	export default {
		namespaced: true,
		state: {
			isFreeDraw: false,
			isFreeBuild: false,
			isFreeMove: false,
			isPermanent: false,
			cardName: '',
			cardDescription: '',
			cardTribe: '',
			cardType: Type.PATH,
			cardPathType: PathType.NORMAL,
			cardElement: Element.GENERIC,
			cardGoldCost: 0,
			cardManaCost: 1,
            customImageData: '',
		},
		mutations: {
			load(state, value) {
				state.cardName = value.cardName;
				state.cardDescription = value.cardDescription;
				state.cardTribe = value.cardTribe;
				state.isFreeDraw = value.isFreeDraw;
				state.isFreeBuild = value.isFreeBuild;
				state.isFreeMove = value.isFreeMove;
				state.isPermanent = value.isPermanent;
				state.cardType = value.cardType;
				state.cardPathType = value.cardPathType;
				state.cardElement = value.cardElement;
				state.cardGoldCost = value.cardGoldCost;
				state.cardManaCost = value.cardManaCost;
				state.customImageData = value.customImageData;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			clear(state) {
				state.cardName = '';
				state.cardDescription = '';
				state.cardTribe = '';
				state.isFreeDraw = false;
				state.isFreeBuild = false;
				state.isFreeMove = false;
				state.isPermanent = false;
				state.cardType = Type.PATH;
				state.cardPathType = PathType.NORMAL;
				state.cardElement = Element.GENERIC;
				state.cardGoldCost = 0;
				state.cardManaCost = 1;
				state.customImageData = '';
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
			setFreeMove(state, value) {
				state.isFreeMove = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setPermanent(state, value) {
				state.isPermanent = value;
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
			setCardTribe(state, value) {
				state.cardTribe = value;
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
			setCardGoldCost(state, value) {
				state.cardGoldCost = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
			setCardManaCost(state, value) {
				state.cardManaCost = value;
				app.$emit(Event.CARD_STATE_UPDATED);
			},
            setCustomImageData(state, value) {
			    state.customImageData = value;
                app.$emit(Event.CARD_STATE_UPDATED);
            },
		},
	};
</script>