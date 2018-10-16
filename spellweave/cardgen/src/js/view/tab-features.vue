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
	import cardName from 'Component/textbox-cardName.vue';
	import cardDescription from 'Component/textbox-cardDescription.vue';
	import cardTribe from 'Component/textbox-cardTribe.vue';
	import isFreeBuild from 'Component/checkbox-isFreeBuild.vue';
	import isFreeDraw from 'Component/checkbox-isFreeDraw.vue';
	import isFreeMove from 'Component/checkbox-isFreeMove.vue';
	import isPermanent from 'Component/checkbox-isPermanent.vue';
	import cardType from 'Component/dropdown-cardType.vue';
	import cardPathType from 'Component/dropdown-cardPathType.vue';
	import cardElement from 'Component/dropdown-cardElement.vue';
	import cardGoldCost from 'Component/dropdown-cardGoldCost.vue';
	import cardManaCost from 'Component/dropdown-cardManaCost.vue';

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
