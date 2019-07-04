
import TheFeaturesTabView from 'View/TheFeaturesTabView.vue';
import TheTextsTabView from 'View/TheTextsTabView.vue';
import TheImportTabView from 'View/TheImportTabView.vue';
import TheLibraryTabView from 'View/TheLibraryTabView.vue';

const vueRouter = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: { name: 'FeaturesTab' },
		},
		{
			name: 'FeaturesTab',
			path: '/features',
			component: TheFeaturesTabView,
		},
		{
			name: 'TextsTab',
			path: '/texts',
			component: TheTextsTabView
		},
		{
			name: 'ImportTab',
			path: '/import',
			component: TheImportTabView
		},
		{
			name: 'LibraryTab',
			path: '/library',
			component: TheLibraryTabView
		},
	]
});




import storeCardState from 'Store/CardStateModule.vue';
import storeCardLibrary from 'Store/CardLibraryModule.vue';
import storeCardImporter from 'Store/CardImporterModule.vue';

export const vueStore = new Vuex.Store({
	strict: true,
	modules: {
		cardState: storeCardState,
		cardLibrary: storeCardLibrary,
		cardImporter: storeCardImporter,
	},
	plugins: [ autosaverPlugin, undoRedoPlugin ],
});




import application from './app.vue';

export const app = new Vue({
	el: '#app',
	render: function(createElement) {
		return createElement(application);
	},
	store: vueStore,
	router: vueRouter,
});