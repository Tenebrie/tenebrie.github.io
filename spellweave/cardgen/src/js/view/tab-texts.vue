<template>
	<transition name="slide">
		<div class="toolbar-tab tab-texts">
			<card-name></card-name>
			<card-description></card-description>
		</div>
	</transition>
</template>

<script>
	import cardName from 'Component/textbox-cardName.vue';
	import cardDescription from 'Component/textbox-cardDescription.vue';

	export default {
		components: {
			cardName,
			cardDescription,
		}
	}
</script>