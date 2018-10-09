<template>
	<dropdown :id="id" :items="items" zIndex="80" :selectedValue="selectedType" :onSelect="onSelect">Type</dropdown>
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
					return this.$store.state.cardState.cardType;
				},
				set(value) {
					this.$store.commit('cardState/setCardType', value);
				}
			},
			items() {
				return [
					{
						title: 'Preparation',
						icon: 'fa-signature',
						value: Type.PREPARATION,
					},
					{
						title: 'Action',
						icon: 'fa-hand-spock',
						value: Type.ACTION,
					},
					{
						title: 'Path',
						icon: 'fa-arrow-right',
						value: Type.PATH,
					},
					{
						title: 'State',
						icon: 'fa-pause-circle',
						value: Type.STATE,
					},
					{
						title: 'Release',
						icon: 'fa-certificate',
						value: Type.RELEASE,
					},
				]
			}
		}
	}
</script>