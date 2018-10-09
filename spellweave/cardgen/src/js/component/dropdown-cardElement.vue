<template>
	<dropdown :id="id" :items="items" zIndex="40" :selectedValue="selectedType" :onSelect="onSelect">Element</dropdown>
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
					return this.$store.state.cardState.cardElement;
				},
				set(value) {
					this.$store.commit('cardState/setCardElement', value);
				}
			},
			items() {
				return [
					{
						title: 'Generic',
						icon: 'fa-link',
						value: Element.GENERIC,
					},
					{
						title: 'Damage',
						icon: 'fa-fire color-damage',
						value: Element.DAMAGE,
					},
					{
						title: 'Healing',
						icon: 'fa-ankh color-healing',
						value: Element.HEALING,
					},
					{
						title: 'Alteration',
						icon: 'fa-seedling color-alteration',
						value: Element.ALTERATION,
					},
					{
						title: 'Summoning',
						icon: 'fa-paw color-summoning',
						value: Element.SUMMONING,
					},
					{
						title: 'Control',
						icon: 'fa-chess-knight color-control',
						value: Element.CONTROL,
					},
					{
						title: 'Sacrifice',
						icon: 'fa-skull color-sacrifice',
						value: Element.SACRIFICE,
					},
				]
			}
		}
	}
</script>