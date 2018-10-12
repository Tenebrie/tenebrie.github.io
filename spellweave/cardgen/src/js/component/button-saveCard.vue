<template>
	<custom-button text='Save to Library' icon='fa-save' :onClick='onClick' :isIconOnly='isIconOnly' ></custom-button>
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
				let item = this.$store.state.cardState;
				this.$store.commit('cardLibrary/push', item);
			}
		},
	}
</script>