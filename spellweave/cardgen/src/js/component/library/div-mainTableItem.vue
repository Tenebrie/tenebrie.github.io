<template>
	<div class='library-item' @click='onClick(item.id)' v-longpress='onLongpress'>
		<div v-if='$parent.isInSelectState' class='library-item-checkbox'>
			<is-selected :isSelected='isSelected'></is-selected>
		</div>
		<div class='library-item-value library-item-name'>
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

<style lang='scss' scoped>
	@import 'Style/variables.scss';

	.library-item {
		width: 100%;
		color: $inactive-color;
		border-bottom: 1px solid $inactive-color;
		height: 40px;
		transition: all $transition-duration;
		cursor: pointer;
		user-select: none;
		display: flex;
		vertical-align: middle;
		padding-left: 20px;

		.library-item-checkbox {
			flex-basis: 30px;
			padding-top: 7px;
		}

		.library-item-value {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			flex-basis: 50%;
			margin-right: 20px;
			line-height: 40px;

		}
		.library-item-name {
			flex-basis: 70%;
		}

		div {
			display: inline-block;
		}

		&:hover {
			color: $primary-color;
			border-bottom-color: $primary-color;
		}

		&:active {
			color: $accent-color;
			border-bottom-color: $accent-color;
			transition: all .0s;
		}
	}
</style>