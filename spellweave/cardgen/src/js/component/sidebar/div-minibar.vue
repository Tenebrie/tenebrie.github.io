<template>
	<div class='minibar'>
		<div class='file-buttons'>
			<new-card :isIconOnly='true'></new-card>
			<divider></divider>
			<save-card :isIconOnly='true'></save-card>
			<divider></divider>
			<render-card :isIconOnly='true'></render-card>
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
	.minibar {
		margin-top: 50px;

		button {
			border: none;
			min-width: 100%;
			margin: 0;
			padding: 10px 0;
			min-height: 36px;
			background: transparent;
		}
	}
</style>