
import tabFeatures from 'View/tab-features.vue';
import tabTexts from 'View/tab-texts.vue';
import tabJunk from 'View/tab-junk.vue';
import tabLibrary from 'View/tab-library.vue';

const vueRouter = new VueRouter({
	routes: [
		{ path: '/features', component: tabFeatures },
		{ path: '/texts', component: tabTexts },
		{ path: '/junk', component: tabJunk },
		{ path: '/library', component: tabLibrary },
	]
});




import storeCardState from 'Store/cardState.vue';
import storeCardLibrary from 'Store/cardLibrary.vue';

export const vueStore = new Vuex.Store({
	modules: {
		cardState: storeCardState,
		cardLibrary: storeCardLibrary,
	},
	plugins: [ autosaverPlugin, undoRedoPlugin ],
});




import application from './app.vue';

export const app = new Vue({
	el: '#app',
	render: function(createElement) {
		return createElement(application);
	},
	mounted: function() {

	},
	store: vueStore,
	router: vueRouter,
});