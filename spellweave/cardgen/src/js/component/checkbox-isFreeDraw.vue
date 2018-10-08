<template>
	<div>
		<input :id='id' v-model='checked' type='checkbox' />
		<label :for='id'>
			<span></span>
			<slot></slot>
		</label>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		computed: {
			checked: {
				get() {
					return this.$store.state.cardState.isFreeDraw;
				},
				set(value) {
					this.$store.commit('cardState/setFreeDraw', value);
				}
			}
		},
	}
</script>