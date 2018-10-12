<template>
	<div>
		WAAT
		<label v-html='parsedData'></label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tempData: "[3 Mana Damage Path] Test Item: +2 Damage; Free Build",
			}
		},
		computed: {
			parsedData() {
				let line = this.tempData;

				let lineRegex = /\[([a-zA-Z0-9\s]+)]\s*(?:([a-zA-Z.,\s]+):)?\s*(.+)$/;
				let results = lineRegex.exec(line);
				let attributes = results[1].split(' ');
				let name = results[2];
				let description = results[3];
				description = description.replace(/;\s/g, ';\n');

				let argumentStack = [];
				for (let i = 0; i < attributes.length; i++) {
					let attribute = attributes[i].toLowerCase();

					let numberRegex = /^[0-9]+$/;
					results = numberRegex.exec(attribute);
					if (results !== null) {
						argumentStack.push(results[0]);
						return;
					}

					if (attribute === 'mana') {
						let arg = argumentStack.pop();
						this.$store.commit('cardState/setManaCost', arg);
					}
				}

				return "Attributes: '" + attributes + "', Name: '" + name + "', Description: '" + description + "'";
			}
		}
	}
</script>