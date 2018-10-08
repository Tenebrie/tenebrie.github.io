<template>
	<div class='text-input'>
		<label>Card description</label>
		<textarea class='card-description' rows='5' placeholder="A description of the card's effect" v-model='text'></textarea>
	</div>
</template>

<script>
	export default {
		computed: {
			text: {
				get() {
					return this.$store.state.cardState.cardDescription;
				},
				set(value) {
					this.$store.commit('cardState/setCardDescription', value);
				}
			}
		},
	}
</script>