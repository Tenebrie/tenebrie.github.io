<template>
	<button v-on:click='onClick'><i :class='iconClass'></i>   {{ buttonText }}</button>
</template>

<script>
	export default {
		props: ['text', 'onClick', 'icon', 'isIconOnly'],
		computed: {
			buttonText() {
				if (this.isIconOnly) {
					return '';
				}
				return this.text;
			},
			iconClass() {
				if (this.icon) {
					return 'fas ' + this.icon;
				}
				return 'hidden';
			}
		}
	}
</script>

<style lang='scss' scoped>
	.hidden {
		display: none;
	}
	i {
		margin-right: 3px;
	}
</style>