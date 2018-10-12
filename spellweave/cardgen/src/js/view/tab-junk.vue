<template>
	<transition name="slide">
		<div class="toolbar-tab tab-features">
			<div class='import-controls'>
				<import-from-list></import-from-list>
			</div>
		</div>
	</transition>
</template>

<script>
	import importFromList from 'Component/library/textbox-importFromList.vue';

	export default {
		components: {
			importFromList,
		}
	}
</script>
