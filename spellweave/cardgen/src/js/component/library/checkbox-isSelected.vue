<template>
	<checkbox :isChecked='checked'>&nbsp;</checkbox>
</template>

<script>
	import checkbox from 'Component/checkbox.vue';

	export default {
		props: ['isSelected'],
		components: {
			checkbox,
		},
		computed: {
			checked: {
				get() {
					return this.isSelected;
				},
			}
		},
	}
</script>
