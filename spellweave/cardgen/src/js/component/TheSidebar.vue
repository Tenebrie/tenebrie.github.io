<template>
	<div class='sidebar'>
		<div class='file-buttons'>
			<new-card></new-card>
			<divider></divider>
			<save-card></save-card>
			<divider></divider>
			<render-card></render-card>
		</div>
	</div>
</template>

<script>
	import newCard from 'Component/SidebarNewCardButton.vue';
	import renderCard from 'Component/SidebarRenderCardButton.vue';
	import saveCard from 'Component/SidebarSaveCardButton.vue';
	import divider from 'Component/SidebarDivider.vue';

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
			min-height: 36px;
			background: transparent;
		}
	}
</style>