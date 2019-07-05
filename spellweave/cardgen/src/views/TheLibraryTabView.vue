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
	import newCard from '../components/SidebarNewCardButton.vue';
	import renderCard from '../components/SidebarRenderCardButton.vue';
	import saveCard from '../components/SidebarSaveCardButton.vue';
	import mainTable from '../components/TheLibraryContentList.vue';

	export default {
		components: {
			newCard,
			renderCard,
			saveCard,
			mainTable,
		}
	}
</script>