<template>
	<transition name="slide">
		<div class="toolbar-tab tab-features">
			<is-free-build id='cb-isFreeBuild'>Free Build</is-free-build>
			<is-free-draw id='cb-isFreeDraw'>Free Draw</is-free-draw>
			<card-type></card-type>
			<card-element></card-element>
			<card-mana-cost></card-mana-cost>
		</div>
	</transition>
</template>

<script>
	import isFreeBuild from 'Component/checkbox-isFreeBuild.vue';
	import isFreeDraw from 'Component/checkbox-isFreeDraw.vue';
	import cardType from 'Component/dropdown-cardType.vue';
	import cardElement from 'Component/dropdown-cardElement.vue';
	import cardManaCost from 'Component/dropdown-cardManaCost.vue';

	export default {
		components: {
			isFreeBuild,
			isFreeDraw,
			cardType,
			cardElement,
			cardManaCost,
		}
	}
</script>
