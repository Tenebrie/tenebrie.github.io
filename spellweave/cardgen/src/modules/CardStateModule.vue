<script>
	import { Element, PathType, Type } from "../util/constant";

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
			},
			setFreeBuild(state, value) {
				state.isFreeBuild = value;
			},
			setFreeDraw(state, value) {
				state.isFreeDraw = value;
			},
			setFreeMove(state, value) {
				state.isFreeMove = value;
			},
			setPermanent(state, value) {
				state.isPermanent = value;
			},
			setCardName(state, value) {
				state.cardName = value;
			},
			setCardDescription(state, value) {
				state.cardDescription = value;
			},
			setCardTribe(state, value) {
				state.cardTribe = value;
			},
			setCardType(state, value) {
				state.cardType = value;
			},
			setCardPathType(state, value) {
				state.cardPathType = value;
			},
			setCardElement(state, value) {
				state.cardElement = value;
			},
			setCardGoldCost(state, value) {
				state.cardGoldCost = value;
			},
			setCardManaCost(state, value) {
				state.cardManaCost = value;
			},
            setCustomImageData(state, value) {
			    state.customImageData = value;
            },
		},
	};
</script>