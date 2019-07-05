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
			<div class="dropdowns">
				<card-type></card-type>
				<card-element></card-element>
				<card-attack-dropdown />
				<card-health-dropdown />
				<card-initiative-textbox />
			</div>
		</div>
	</transition>
</template>

<script>
	import {Type} from "../util/constant";
	import cardName from '../components/FeaturesCardNameTextbox.vue';
	import cardType from '../components/FeaturesCardTypeDropdown.vue';
	import cardTribe from '../components/FeaturesCardTribeTextbox.vue';
	import isFreeDraw from '../components/FeaturesIsFreeDrawCheckbox.vue';
	import isFreeMove from '../components/FeaturesIsFreeMoveCheckbox.vue';
	import isFreeBuild from '../components/FeaturesIsFreeBuildCheckbox.vue';
	import isPermanent from '../components/FeaturesIsPermanentCheckbox.vue';
	import cardElement from '../components/FeaturesCardElementDropdown.vue';
	import cardPathType from '../components/FeaturesCardPathTypeDropdown.vue';
	import cardGoldCost from '../components/FeaturesCardGoldCostDropdown.vue';
	import cardManaCost from '../components/FeaturesCardManaCostDropdown.vue';
	import cardDescription from '../components/FeaturesCardDescriptionTextbox.vue';
	import CardAttackDropdown from "../components/CardAttackDropdown";
	import CardHealthDropdown from "../components/CardHealthDropdown";
	import CardInitiativeTextbox from "../components/CardInitiativeTextbox";

	export default {
		components: {
			CardInitiativeTextbox,
			CardAttackDropdown,
			CardHealthDropdown,
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

<style lang="scss" scoped>
	.tab-features {
		.dropdowns {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}
</style>