<template>
	<custom-button text='Save as image' icon='fa-download' :onClick='onClick' :isIconOnly='isIconOnly' ></custom-button>
</template>

<script>
	import customButton from 'Component/button.vue';

	export default {
		props: ['isIconOnly'],
		components: {
			customButton,
		},
		methods: {
			onClick: function () {
				this.$root.$emit(Event.SAVE_CARD_AS_IMAGE);
			}
		},
	}
</script>