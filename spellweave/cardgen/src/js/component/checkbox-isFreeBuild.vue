<template>
	<checkbox :isChecked='checked' :onChecked='onChecked'>Free Build</checkbox>
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
					return this.$store.state.cardState.isFreeBuild;
				},
				set(value) {
					this.$store.commit('cardState/setFreeBuild', value);
				}
			}
		},
	}
</script>
