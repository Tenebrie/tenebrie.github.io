<template>
	<button v-on:click='onClick'><i class="fas fa-ban"></i> Cancel</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				this.$root.$emit(Event.UNSELECT_ALL_LIBRARY);
				this.$root.$emit(Event.CANCEL_LIBRARY_SELECTION);
			}
		},
	}
</script>