<template>
	<dropdown :items="items" zIndex="20" :selectedValue="selectedManaCost" :onSelect="onSelect">Traverse cost</dropdown>
</template>

<script>
	import dropdown from './BaseDropdown.vue';

	export default {
		components: {
			dropdown,
		},
		methods: {
			onSelect: function(value) {
				this.selectedManaCost = value;
			}
		},
		computed: {
			selectedManaCost: {
				get() {
					return this.$store.state.cardState.cardManaCost;
				},
				set(value) {
					this.$store.commit('cardState/setAttackValue', value);
				}
			},
			items() {
				let data = [];
				data.push({
					title: '- No Value -',
					value: -1,
				});
				for (let i = 0; i <= 12; i++) {
					data.push({
						title: i + ' Attack',
						icon: 'fa-gripfire',
						value: i,
					});
				}
				return data;
			}
		}
	}
</script>