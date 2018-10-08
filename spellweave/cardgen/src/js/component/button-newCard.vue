<template>
	<button v-on:click='onClick'>New card</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				this.$store.commit('cardState/clear');
			}
		},
	}
</script>