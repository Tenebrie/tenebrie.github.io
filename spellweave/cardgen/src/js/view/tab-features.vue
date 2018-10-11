<template>
	<transition name="slide">
		<div class="toolbar-tab tab-features">
			<card-name></card-name>
			<card-description></card-description>
			<is-free-build id='cb-isFreeBuild'>Free Build</is-free-build>
			<is-free-draw id='cb-isFreeDraw'>Free Draw</is-free-draw>
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
	import cardName from 'Component/textbox-cardName.vue';
	import cardDescription from 'Component/textbox-cardDescription.vue';
	import isFreeBuild from 'Component/checkbox-isFreeBuild.vue';
	import isFreeDraw from 'Component/checkbox-isFreeDraw.vue';
	import cardType from 'Component/dropdown-cardType.vue';
	import cardPathType from 'Component/dropdown-cardPathType.vue';
	import cardElement from 'Component/dropdown-cardElement.vue';
	import cardGoldCost from 'Component/dropdown-cardGoldCost.vue';
	import cardManaCost from 'Component/dropdown-cardManaCost.vue';

	export default {
		components: {
			cardName,
			cardDescription,
			isFreeBuild,
			isFreeDraw,
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
