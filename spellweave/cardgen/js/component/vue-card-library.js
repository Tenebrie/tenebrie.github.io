Vue.component('vue-cb-libraryItem', {
	props: ['item', 'isSelected'],
	computed: {
		id: {
			get() {
				return this.item.id;
			}
		},
		checked: {
			get() {
				return this.isSelected;
			},
		}
	},
	template: `
		<div>
			<input :id='id' v-model='checked' type='checkbox' />
			<label :for='id'>
				<span></span>&nbsp
			</label>
		</div>
	`
});

Vue.component('vue-btn-selectAll', {
	methods: {
		onClick: function () {
			this.$root.$emit(EVENT.ENABLE_LIBRARY_SELECTION);
			this.$root.$emit(EVENT.SELECT_ALL_LIBRARY);
		}
	},
	template: `<button v-on:click='onClick'><i class="fas fa-check-square"></i> Select all</button>`
});

Vue.component('vue-btn-unselectAll', {
	methods: {
		onClick: function () {
			this.$root.$emit(EVENT.UNSELECT_ALL_LIBRARY);
		}
	},
	template: `<button v-on:click='onClick'><i class="fas fa-square"></i> Unselect all</button>`
});

Vue.component('vue-btn-cancelSelection', {
	methods: {
		onClick: function () {
			this.$root.$emit(EVENT.UNSELECT_ALL_LIBRARY);
			this.$root.$emit(EVENT.CANCEL_LIBRARY_SELECTION);
		}
	},
	template: `<button v-on:click='onClick'><i class="fas fa-ban"></i> Cancel</button>`
});

Vue.component('vue-btn-deleteFromLibrary', {
	methods: {
		onClick: function () {
			this.$root.$emit(EVENT.DELETE_FROM_LIBRARY);
		}
	},
	template: `<button class='btn-red' v-on:click='onClick'><i class="fas fa-trash-alt"></i> Delete</button>`
});

Vue.component('vue-table-cardLibrary', {
	data: function() {
		return {
			isInSelectState: false,
		}
	},
	mounted: function() {
		this.$root.$on(EVENT.ENABLE_LIBRARY_SELECTION, () => {
			this.isInSelectState = true;
		});
		this.$root.$on(EVENT.CANCEL_LIBRARY_SELECTION, () => {
			this.isInSelectState = false;
		});
		this.$root.$on(EVENT.DELETE_FROM_LIBRARY, () => {
			this.isInSelectState = false;
		});
	},
	computed: {
		library: {
			get() {
				return this.$store.state.cardLibrary.data;
			}
		},
	},
	template: `
		<div v-if='library.length > 0' class='table-card-library'>
			<div class='library-table-controls'>
				<div class='selection-controls'>
					<vue-btn-selectAll></vue-btn-selectAll>
					<span v-if='isInSelectState'>
						<vue-btn-unselectAll></vue-btn-unselectAll>
						<vue-btn-cancelSelection></vue-btn-cancelSelection>
						<vue-btn-deleteFromLibrary></vue-btn-deleteFromLibrary>
					</span>
				</div>
			</div>		
		
			<div class='library-items-container-wrapper'>
				<div class='library-items-container'>
					<div class='library-item-wrapper' v-for='item in library.slice().reverse()'>
						<vue-table-cardLibraryItem :item='item'></vue-table-cardLibraryItem>
					</div>
				</div>
			</div>
		</div>
	`
});

Vue.component('vue-table-cardLibraryItem', {
	props: ['item'],
	data: function() {
		return {
			isSelected: false,
		}
	},
	mounted: function() {
		this.$root.$on(EVENT.SELECT_ALL_LIBRARY, () => {
			this.isSelected = true;
		});
		this.$root.$on(EVENT.UNSELECT_ALL_LIBRARY, () => {
			this.isSelected = false;
		});
		this.$root.$on(EVENT.DELETE_FROM_LIBRARY, () => {
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
	template: `
		<div class='library-item' @click='onClick(item.id)' v-longpress='onLongpress'>
			<div v-if='$parent.isInSelectState' class='library-item-checkbox'>
				<vue-cb-libraryItem :item='item' :isSelected='isSelected'></vue-cb-libraryItem>
			</div>
			<div class='library-item-value'>
				{{ item.displayName }}
			</div>
			<div class='library-item-value'>
				{{ item.timestamp }}
			</div>
		</div>
	`
});