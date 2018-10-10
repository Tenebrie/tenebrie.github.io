<template>
	<div id="main-container">
		<div :class="'sidebar-container' + ' ' + (isSidebarOpen ? 'open' : '') ">
			<sidebar :isOpen="isSidebarOpen"></sidebar>
		</div>
		<div :class="'minibar-container' + ' ' + (isMinibarOpen ? 'open' : '') ">
			<minibar :isOpen="isMinibarOpen"></minibar>
		</div>
		<sidebar-toggle :onClick='onSidebarToggle' :isOpen='isSidebarOpen'></sidebar-toggle>

		<div class="card-container">
			<preview-canvas></preview-canvas>
		</div>

		<div class="toolbar">
			<div class="tabs-container">
				<router-link class="tab one" to='/features'>Features</router-link><!--
			 --><router-link class="tab two" to='/texts'>Texts</router-link><!--
			 --><router-link class="tab three" to='/junk'>Junk</router-link><!--
			 --><router-link class="tab four" to='/library'>Library</router-link>
				<hr />
			</div>

			<div class='router-view-container'>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import minibar from 'Component/sidebar/div-minibar.vue';
	import sidebar from 'Component/sidebar/div-sidebar.vue';
	import sidebarToggle from 'Component/sidebar/button-sidebarToggle.vue'
	import previewCanvas from 'Component/canvas-cardPreview.vue';

	export default {
		components: {
			minibar,
			sidebar,
			sidebarToggle,
			previewCanvas,
		},
		data() {
			return {
				isSidebarOpen: false,
			}
		},
		computed: {
			isMinibarOpen() {
				return !this.isSidebarOpen;
			}
		},
		methods: {
			onSidebarToggle: function() {
				this.isSidebarOpen = !this.isSidebarOpen;
			}
		},
	}
</script>

<style lang='scss'>
	@import 'Style/variables.scss';

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		overflow: hidden;
	}

	.slide-leave-active,
	.slide-enter-active {
		transition: 1s ease;
	}
	.slide-enter {
		transform: translate(100%, 0);
	}
	.slide-leave-to {
		transform: translate(-100%, 0);
	}

	//======================================================================
	#main-container {
		height: 100%;
		color: $primary-color;
		font-family: "Roboto", sans-serif;
		background: linear-gradient(to right bottom, #1b1b1e, #333);
		display: flex;
		flex-direction: row;

		.sidebar-container {
			width: $sidebar-width;
			min-width: $sidebar-width;
			margin-left: -$sidebar-width;
			transition: all $transition-duration ease;
			&.open {
				margin-left: 0;
			}
		}

		.minibar-container {
			width: $minibar-width;
			min-width: $minibar-width;
			margin-left: -$minibar-width;
			transition: all $transition-duration ease;
			&.open {
				margin-left: 0;
			}
		}

		.card-container {
			position: relative;
			flex-grow: 1;
			background: white url("~Res/bg-alpha.png") repeat fixed center;

		}

		.toolbar {
			overflow: hidden;
			position: relative;
			flex-grow: 1;
			flex-basis: 70%;
			min-width: 300px;

			.tabs-container {
				display: block;
				width: 100%;
				margin: 0 auto;
				font-family: "K2D", sans-serif;
				background-color: $smoke-screen-color;

				a {
					color: $inactive-color;
					display: inline-block;
					width: 25%;
					padding: .75rem 0;
					margin: 0;
					text-decoration: none;
					text-align: center;
					transition: color $transition-duration;
					&:hover, &.router-link-active {
						color: $primary-color;
					}
					&:active {
						color: $accent-color;
						transition: color 0s;
					}
				}

				.one.router-link-active {
					& ~ hr {
						margin-left: 0%
					}
				}

				.two.router-link-active {
					& ~ hr {
						margin-left: 25%
					}
				}

				.three.router-link-active {
					& ~ hr {
						margin-left: 50%
					}
				}

				.four.router-link-active {
					& ~ hr {
						margin-left: 75%
					}
				}

				.one:hover ~ hr {
					margin-left: 0%;
				}

				.two:hover ~ hr {
					margin-left: 25%;
				}

				.three:hover ~ hr {
					margin-left: 50%;
				}

				.four:hover ~ hr {
					margin-left: 75%;
				}

				hr {
					height: .25rem;
					width: 25%;
					margin: 0;
					background: $accent-color;
					border: none;
					transition: .3s ease-out;
				}

			}

			.toolbar-tab {
				position: absolute;
				width: 100%;
				height: calc(100% - 49px);
				padding: 10px;

				.toolbar-tab-content {
					height: 100%;
					display: flex;
					flex-direction: column;
				}
			}
		}
	}

	button {
		display: inline-block;
		padding: 0.35em 1.2em;
		border: 1px solid $inactive-color;
		margin: 0.6em 0.3em;
		border-radius: 0.12em;
		box-sizing: border-box;
		text-decoration: none;
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
		color: $inactive-color;
		background-color: transparent;
		text-align: center;
		transition: all $transition-duration;
		cursor: pointer;
		outline: none;

		&:focus, &:hover {
			color: $primary-color;
			border: 1px solid $primary-color;
			background-color: $button-background-color;
			transition: all 0s;
		}

		&:active {
			color: $accent-color;
			border: 1px solid $accent-color;
			background-color: $button-background-color;
			transition: all 0s;
		}

		&.btn-red {
			color: lighten(red, 15%);
			border-color: lighten(red, 15%);

			&:focus, &:hover {
				color: red;
				border-color: red;
			}

			&:active {
				color: darken(red, 20%);
				border-color: darken(red, 20%);
			}
		}
	}

	@media all and (max-width: 30em) {
		button {
			display: block;
			margin: 0.4em auto;
		}
	}

</style>