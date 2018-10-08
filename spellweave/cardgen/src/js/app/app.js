
import tabFeatures from 'View/tab-features.vue';
import tabTexts from 'View/tab-texts.vue';
import tabJunk from 'View/tab-junk.vue';
import tabOutput from 'View/tab-output.vue';

const vueRouter = new VueRouter({
	routes: [
		{ path: '/features', component: tabFeatures },
		{ path: '/texts', component: tabTexts },
		{ path: '/junk', component: tabJunk },
		{ path: '/output', component: tabOutput },
	]
});

import storeCardState from 'Store/cardState.vue';
import storeCardLibrary from 'Store/cardLibrary.vue';

export const vueStore = new Vuex.Store({
	modules: {
		cardState: storeCardState,
		cardLibrary: storeCardLibrary,
	},
	plugins: [ autosaverPlugin ],
});

import app from './app.vue';
export const application = new Vue({
	el: '#app',
	render: function(createElement) {
		return createElement(app);
	},
	mounted: function() {
	},
	store: vueStore,
	router: vueRouter,
});