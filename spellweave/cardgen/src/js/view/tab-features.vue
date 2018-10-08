<template>
	<transition name="slide">
		<div class="toolbar-tab tab-features">
			<isFreeBuild id='cb-isFreeBuild'>Free Build</isFreeBuild>
			<isFreeDraw id='cb-isFreeDraw'>Free Draw</isFreeDraw>
			<cardType></cardType>
		</div>
	</transition>
</template>

<script>
	import isFreeBuild from 'Component/checkbox-isFreeBuild.vue';
	import isFreeDraw from 'Component/checkbox-isFreeDraw.vue';
	import cardType from 'Component/dropdown-cardType.vue';

	export default {
		components: {
			isFreeBuild,
			isFreeDraw,
			cardType,
		}
	}
</script>
