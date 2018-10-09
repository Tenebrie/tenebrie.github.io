<template>
	<textbox :defaultValue='text' rows='3' :onInput='onInput' placeholder="A description of the card's effect">Card description</textbox>
</template>

<script>
	import textbox from 'Component/textbox.vue'

	export default {
		components: {
			textbox,
		},
		methods: {
			onInput: function(value) {
				this.text = value;
			},
		},
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