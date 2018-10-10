<script>
	export default {
		namespaced: true,
		state: {
			data: [],
		},
		getters: {
			getCardById: state => id => {
				for (let i = 0; i < state.data.length; i++) {
					if (state.data[i].id === id) {
						return state.data[i];
					}
				}
				return null;
			},
		},
		mutations: {
			push(state, value) {
				state.data.push(value);
			},
			delete(state, value) {
				let index = state.data.indexOf(value);
				if (index !== -1) {
					state.data.splice(state.data.indexOf(value), 1);
				}
			},
			load(state, value) {
				for (let i = 0; i < value.length; i++) {
					state.data.push(value[i]);
				}
			},
		},
	};
</script>