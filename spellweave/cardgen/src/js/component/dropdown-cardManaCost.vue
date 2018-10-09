<template>
	<dropdown :items="items" zIndex="20" :selectedValue="selectedManaCost" :onSelect="onSelect">Cost</dropdown>
</template>

<script>
	import dropdown from 'Component/dropdown.vue';

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
					this.$store.commit('cardState/setCardManaCost', value);
				}
			},
			items() {
				let data = [];
				data.push({
					title: '- No Mana -',
					icon: 'fa-dot-circle',
					value: 0,
				});
				for (let i = 1; i <= 12; i++) {
					data.push({
						title: i + ' Mana',
						icon: 'fa-tint',
						value: i,
					});
				}
				return data;
			}
		}
	}
</script>