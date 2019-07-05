<template>
	<transition name="slide">
		<div class="toolbar-tab tab-texts">
			<custom-art-file-selector />
		</div>
	</transition>
</template>

<script>
	import CustomArtFileSelector from "../components/CustomArtFileSelector.vue";

	export default {
		components: {
			CustomArtFileSelector,
		}
	}
</script>