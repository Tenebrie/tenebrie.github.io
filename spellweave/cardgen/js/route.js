const tabFeatures = {
	template: `
		<transition name="slide">
			<div class="toolbar-tab tab-features">
				<vue-cb-isFreeBuild id='cb-isFreeBuild'>Free Build</vue-cb-isFreeBuild>
				<vue-cb-isFreeDraw id='cb-isFreeDraw'>Free Draw</vue-cb-isFreeDraw>
				<vue-dropdown-manacost></vue-dropdown-manacost>
			</div>
		</transition>
	`
};

const tabTexts = {
	template: `
		<transition name="slide">
			<div class="toolbar-tab tab-texts">
				<vue-textarea-cardName></vue-textarea-cardName>
				<vue-textarea-cardText></vue-textarea-cardText>
			</div>
		</transition>
	`
};

const tabJunk = {
	template: `<transition name="slide"></transition>`
};

const tabOutput = {
	template: `
		<transition name="slide">
			<div class="toolbar-tab tab-output">
				<div class='toolbar-tab-content'>
					<div class='file-buttons'>
						<vue-btn-newCard></vue-btn-newCard>
						<vue-btn-renderCard></vue-btn-renderCard>
						<vue-btn-saveCard></vue-btn-saveCard>
					</div>
					<vue-table-cardLibrary></vue-table-cardLibrary>
				</div>
			</div>
		</transition>
	`
};

const vueRouter = new VueRouter({
	routes: [
		{ path: '/features', component: tabFeatures },
		{ path: '/texts', component: tabTexts },
		{ path: '/junk', component: tabJunk },
		{ path: '/output', component: tabOutput },
	]
});