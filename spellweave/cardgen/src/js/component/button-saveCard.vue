<template>
	<button v-on:click='onClick'>Save to Library</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				let item = JSON.parse(JSON.stringify(this.$store.state.cardState));
				item.timestamp = formatDateTime(new Date());

				item.version = 0;
				let library = this.$store.state.cardLibrary.data;
				for (let i = 0; i < library.length; i++) {
					if (library[i].cardName === item.cardName) {
						item.version += 1;
					}
				}
				item.displayName = item.cardName;
				if (item.cardName === '') {
					item.displayName = 'Unnamed';
				}
				if (item.version > 0) {
					item.displayName += ' (' + item.version + ')';
				}

				item.id = uuidv4();

				this.$store.commit('cardLibrary/push', item);
			}
		},
	}
</script>