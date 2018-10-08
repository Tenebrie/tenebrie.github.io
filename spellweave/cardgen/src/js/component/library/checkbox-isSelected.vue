<template>
	<div>
		<input :id='id' v-model='checked' type='checkbox' />
		<label :for='id'>
			<span></span>&nbsp
		</label>
	</div>
</template>

<script>
	export default {
		props: ['item', 'isSelected'],
		computed: {
			id: {
				get() {
					return this.item.id;
				}
			},
			checked: {
				get() {
					return this.isSelected;
				},
			}
		},
	}
</script>