<template>
	<checkbox :isChecked='checked' :onChecked='onChecked'>Free Draw</checkbox>
</template>

<script>
	import checkbox from 'Component/checkbox.vue';

	export default {
		components: {
			checkbox,
		},
		methods: {
			onChecked: function(value) {
				this.checked = value;
			},
		},
		computed: {
			checked: {
				get() {
					return this.$store.state.cardState.isFreeDraw;
				},
				set(value) {
					this.$store.commit('cardState/setFreeDraw', value);
				}
			}
		},
	}
</script>
