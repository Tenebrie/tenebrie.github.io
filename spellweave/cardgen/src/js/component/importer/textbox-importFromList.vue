<template>
	<div>
		<label v-html='parsedData'></label>
		<textbox :value='buffer' rows='20' :onInput='onInput' placeholder="Insert text here">Text to parse</textbox>
		<import-type></import-type>
		<button v-on:click='doImport'>Import</button>
	</div>
</template>

<script>
	import textbox from 'Component/textbox.vue';
	import importType from 'Component/importer/dropdown-importType.vue';

	export default {
		components: {
			textbox,
			importType,
		},
		data() {
			return {
				buffer: '',
				parsedData: '',
			}
		},
		methods: {
			onInput(value) {
				this.buffer = value;
			},
			doImport() {
				let lineRegex = /\[([a-zA-Z0-9\s]+)]\s*(?:([a-zA-Z.…,\s]+):)?\s*(.+)$/;
				let lines = this.buffer.split('\n');

				for (let l = 0; l < lines.length; l++) {
					let line = lines[l];
					let results = lineRegex.exec(line);
					if (!results) {
						continue;
					}

					this.$store.commit('cardState/setCardManaCost', 0);
					this.$store.commit('cardState/setCardGoldCost', 0);
					this.$store.commit('cardState/setCardPathType', PathType.NORMAL);
					this.$store.commit('cardState/setCardElement', Element.GENERIC);
					let attributes = results[1].split(' ');
					let name = results[2] || '';
					let description = results[3] || '';
					description = description.replace(/;\s/g, ';\n');

					let argumentStack = [];
					for (let i = 0; i < attributes.length; i++) {
						let attribute = attributes[i].toLowerCase();

						let numberRegex = /^[0-9]+$/;
						results = numberRegex.exec(attribute);
						if (results) {
							argumentStack.push(results[0]);
							continue;
						}

						if (attribute === 'mana') {
							let arg = argumentStack.pop();
							this.$store.commit('cardState/setCardManaCost', arg);
						}

						if (attribute === 'gold') {
							let arg = argumentStack.pop();
							this.$store.commit('cardState/setCardGoldCost', arg);
						}

						Object.keys(Type).forEach((key) => {
							if (attribute.toLowerCase() === Type[key]) {
								this.$store.commit('cardState/setCardType', Type[key]);
							}
						});

						Object.keys(PathType).forEach((key) => {
							if (attribute.toLowerCase() === PathType[key]) {
								this.$store.commit('cardState/setCardPathType', PathType[key]);
							}
						});

						Object.keys(Element).forEach((key) => {
							if (attribute.toLowerCase() === Element[key]) {
								this.$store.commit('cardState/setCardElement', Element[key]);
							}
						});
					}

					if (name) {
						this.$store.commit('cardState/setCardName', name);
					}

					if (description) {
						this.$store.commit('cardState/setCardDescription', description);
					}

					let importMethod = this.$store.state.cardImporter.importMethod;
					if (importMethod === ImportMethod.SAVE) {
						this.$store.commit('cardLibrary/push', this.$store.state.cardState);
					} else if (importMethod === ImportMethod.DOWNLOAD) {
						this.$root.$emit(Event.SAVE_CARD_AS_IMAGE);
					} else if (importMethod === ImportMethod.SAVE_AND_DOWNLOAD) {
						this.$store.commit('cardLibrary/push', this.$store.state.cardState);
						this.$root.$emit(Event.SAVE_CARD_AS_IMAGE);
					}
				}
			}
		},
	}
</script>