<template>
	<transition name="slide">
		<div class="toolbar-tab tab-features">
			<card-name></card-name>
			<card-description></card-description>
			<card-tribe></card-tribe>
			<is-free-build></is-free-build>
			<is-free-draw></is-free-draw>
			<is-free-move></is-free-move>
			<is-permanent></is-permanent>
			<div style='display: flex; flex-direction: row; flex-wrap: wrap'>
				<card-type></card-type>
				<card-path-type v-if='isPathTypeVisible'></card-path-type>
				<card-element></card-element>
				<card-gold-cost></card-gold-cost>
				<card-mana-cost></card-mana-cost>
			</div>
		</div>
	</transition>
</template>

<script>
	import cardName from '../components/FeaturesCardNameTextbox.vue';
	import cardDescription from '../components/FeaturesCardDescriptionTextbox.vue';
	import cardTribe from '../components/FeaturesCardTribeTextbox.vue';
	import isFreeBuild from '../components/FeaturesIsFreeBuildCheckbox.vue';
	import isFreeDraw from '../components/FeaturesIsFreeDrawCheckbox.vue';
	import isFreeMove from '../components/FeaturesIsFreeMoveCheckbox.vue';
	import isPermanent from '../components/FeaturesIsPermanentCheckbox.vue';
	import cardType from '../components/FeaturesCardTypeDropdown.vue';
	import cardPathType from '../components/FeaturesCardPathTypeDropdown.vue';
	import cardElement from '../components/FeaturesCardElementDropdown.vue';
	import cardGoldCost from '../components/FeaturesCardGoldCostDropdown.vue';
	import cardManaCost from '../components/FeaturesCardManaCostDropdown.vue';
	import {Type} from "../util/constant";

	export default {
		components: {
			cardName,
			cardDescription,
			cardTribe,
			isFreeBuild,
			isFreeDraw,
			isFreeMove,
			isPermanent,
			cardType,
			cardPathType,
			cardElement,
			cardGoldCost,
			cardManaCost,
		},
		computed: {
			isPathTypeVisible() {
				return this.$store.state.cardState.cardType === Type.PATH;
			}
		}
	}
</script>
