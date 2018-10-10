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
	import newCard from 'Component/button-newCard.vue';
	import renderCard from 'Component/button-renderCard.vue';
	import saveCard from 'Component/button-saveCard.vue';
	import mainTable from 'Component/library/div-mainTable.vue';

	export default {
		components: {
			newCard,
			renderCard,
			saveCard,
			mainTable,
		}
	}
</script>