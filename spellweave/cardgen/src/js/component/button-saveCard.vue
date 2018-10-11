<template>
	<button v-on:click='onClick'>Save to Library</button>
</template>

<script>
	export default {
		methods: {
			onClick: function () {
				let item = JSON.parse(JSON.stringify(this.$store.state.cardState));
				item.timestamp = formatDateTime(new Date());

				item.displayName = '';
				if (item.cardName === '') {
					item.displayName = 'Unnamed';
				} else {
					item.displayName = stripMarkup(item.cardName);
				}

				if (item.cardDescription !== '') {
					item.displayName += ': ' + stripMarkup(item.cardDescription);
				}

				let prefix = capitalize(item.cardType);
				if (item.cardElement !== Element.GENERIC) {
					prefix = capitalize(item.cardElement) + ' ' + prefix;
				}
				if (item.cardManaCost > 0) {
					prefix = item.cardManaCost + ' Mana ' + prefix;
				}
				prefix = '[' + prefix + ']';
				item.displayName = prefix + ' ' + item.displayName;

				item.version = 0;
				let library = this.$store.state.cardLibrary.data;
				for (let i = 0; i < library.length; i++) {
					if (library[i].cardName === item.cardName && library[i].version >= item.version) {
						item.version = library[i].version + 1;
					}
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