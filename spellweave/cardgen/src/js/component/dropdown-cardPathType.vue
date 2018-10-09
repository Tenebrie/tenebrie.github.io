<template>
	<dropdown :id="id" :items="items" zIndex="60" :selectedValue="selectedType" :onSelect="onSelect">Path type</dropdown>
</template>

<script>
	import dropdown from 'Component/dropdown.vue';

	export default {
		props: ['id'],
		components: {
			dropdown,
		},
		methods: {
			onSelect: function(value) {
				this.selectedType = value;
			}
		},
		computed: {
			selectedType: {
				get() {
					return this.$store.state.cardState.cardPathType;
				},
				set(value) {
					this.$store.commit('cardState/setCardPathType', value);
				}
			},
			items() {
				return [
					{
						title: 'Normal',
						icon: 'fa-long-arrow-alt-right',
						value: PathType.NORMAL,
					},
					{
						title: 'Fork',
						icon: 'fa-expand-arrows-alt',
						value: PathType.FORK,
					},
				]
			}
		}
	}
</script>