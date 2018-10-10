<template>
	<div class='sidebar-toggle'>
		<button @click='onClick' :class="isOpen ? 'expanded' : ''"><i class='fas fa-bars'></i></button>
	</div>
</template>

<script>
	export default {
		props: ['onClick', 'isOpen'],
	}
</script>

<style lang='scss' scoped>
	@import 'Style/variables.scss';

	.sidebar-toggle {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: $smoke-screen-color;
		transition: all $transition-duration ease;

		button {
			font-size: 20px;
			margin: 0;
			border: none;
			padding: 10px 0;
			transition: all $transition-duration ease;
			min-width: $minibar-width;
			&.expanded {
				min-width: $sidebar-width;
			}
		}
	}
</style>