<template>
	<button v-on:click='onClick'>Save as image</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				this.$root.$emit(Event.SAVE_CARD_AS_IMAGE);
			}
		},
	}
</script>