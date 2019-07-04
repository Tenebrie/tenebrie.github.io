<template>
	<transition name="slide">
		<div class="toolbar-tab tab-output">
			<div class='toolbar-tab-content'>
				<main-table></main-table>
			</div>
		</div>
	</transition>
</template>

<script>
	import newCard from 'Component/SidebarNewCardButton.vue';
	import renderCard from 'Component/SidebarRenderCardButton.vue';
	import saveCard from 'Component/SidebarSaveCardButton.vue';
	import mainTable from 'Component/TheLibraryContentList.vue';

	export default {
		components: {
			newCard,
			renderCard,
			saveCard,
			mainTable,
		}
	}
</script>