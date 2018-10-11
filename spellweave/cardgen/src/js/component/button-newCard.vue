<template>
	<custom-button text='New file' icon='fa-file' :onClick='onClick' :isIconOnly='isIconOnly' ></custom-button>
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
				this.$store.commit('cardState/clear');
			}
		},
	}
</script>