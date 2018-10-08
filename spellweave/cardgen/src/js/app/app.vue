<template>
	<div id="main-container">
		<div class="card-container">
			<div class="canvas-container">
				<preview-canvas></preview-canvas>
			</div>
		</div>

		<div class="toolbar">
			<div class="tabs-container">
				<router-link class="tab one" to='/features'>Features</router-link><!--
			 --><router-link class="tab two" to='/texts'>Texts</router-link><!--
			 --><router-link class="tab three" to='/junk'>Junk</router-link><!--
			 --><router-link class="tab four" to='/output'>Output</router-link>
				<hr />
			</div>

			<div class='router-view-container'>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import previewCanvas from 'Component/canvas-cardPreview.vue';

	export default {
		components: {
			previewCanvas,
		}
	}
</script>