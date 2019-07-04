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
	import cardName from 'Component/FeaturesCardNameTextbox.vue';
	import cardDescription from 'Component/FeaturesCardDescriptionTextbox.vue';
	import cardTribe from 'Component/FeaturesCardTribeTextbox.vue';
	import isFreeBuild from 'Component/FeaturesIsFreeBuildCheckbox.vue';
	import isFreeDraw from 'Component/FeaturesIsFreeDrawCheckbox.vue';
	import isFreeMove from 'Component/FeaturesIsFreeMoveCheckbox.vue';
	import isPermanent from 'Component/FeaturesIsPermanentCheckbox.vue';
	import cardType from 'Component/FeaturesCardTypeDropdown.vue';
	import cardPathType from 'Component/FeaturesCardPathTypeDropdown.vue';
	import cardElement from 'Component/FeaturesCardElementDropdown.vue';
	import cardGoldCost from 'Component/FeaturesCardGoldCostDropdown.vue';
	import cardManaCost from 'Component/FeaturesCardManaCostDropdown.vue';

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
