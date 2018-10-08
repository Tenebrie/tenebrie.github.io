<template>
	<div class='library-item' @click='onClick(item.id)' v-longpress='onLongpress'>
		<div v-if='$parent.isInSelectState' class='library-item-checkbox'>
			<is-selected :item='item' :isSelected='isSelected'></is-selected>
		</div>
		<div class='library-item-value'>
			{{ item.displayName }}
		</div>
		<div class='library-item-value'>
			{{ item.timestamp }}
		</div>
	</div>
</template>

<script>
	import isSelected from 'Component/library/checkbox-isSelected.vue';

	export default {
		props: ['item'],
		components: {
			isSelected,
		},
		data: function() {
			return {
				isSelected: false,
			}
		},
		mounted: function() {
			this.$root.$on(Event.SELECT_ALL_LIBRARY, () => {
				this.isSelected = true;
			});
			this.$root.$on(Event.UNSELECT_ALL_LIBRARY, () => {
				this.isSelected = false;
			});
			this.$root.$on(Event.DELETE_FROM_LIBRARY, () => {
				if (this.isSelected) {
					this.$store.commit('cardLibrary/delete', this.$store.getters['cardLibrary/getCardById'](this.item.id));
				}
			});
		},
		methods: {
			onClick: function(cardId) {
				if (!this.$parent.isInSelectState) {
					this.$store.commit('cardState/load', this.$store.getters['cardLibrary/getCardById'](cardId));
				} else {
					this.isSelected = !this.isSelected;
				}
			},

			onLongpress: function() {
				if (!this.$parent.isInSelectState) {
					this.$parent.isInSelectState = true;
				}
			}
		},
	}
</script>
