<template>
	<div class='text-input'>
		<label>Card title</label>
		<input class='card-title' type='text' placeholder="Title" v-model='text'/>
	</div>
</template>

<script>
	export default {
		computed: {
			text: {
				get() {
					return this.$store.state.cardState.cardName;
				},
				set(value) {
					this.$store.commit('cardState/setCardName', value);
				}
			}
		},
	}
</script>