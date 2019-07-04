<template>
	<button class='btn-red' v-on:click='onClick'><i class="fas fa-trash-alt"></i> Delete</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				this.$root.$emit(Event.DELETE_FROM_LIBRARY);
			}
		},
	}
</script>