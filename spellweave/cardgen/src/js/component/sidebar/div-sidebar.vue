<template>
	<div class='sidebar'>
		<div class='file-buttons'>
			<new-card></new-card>
			<divider></divider>
			<render-card></render-card>
			<divider></divider>
			<save-card></save-card>
		</div>
	</div>
</template>

<script>
	import newCard from 'Component/button-newCard.vue';
	import renderCard from 'Component/button-renderCard.vue';
	import saveCard from 'Component/button-saveCard.vue';
	import divider from 'Component/sidebar/div-listDivider.vue';

	export default {
		components: {
			newCard,
			renderCard,
			saveCard,
			divider,
		}
	}
</script>

<style lang='scss' scoped>
	.sidebar {
		margin-top: 50px;

		button {
			border: none;
			min-width: 100%;
			margin: 0;
			padding: 10px 0;
		}
	}
</style>