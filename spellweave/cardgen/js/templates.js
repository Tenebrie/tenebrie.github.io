const templates = {
	vueCheckbox: `
		<div>
			<input :id='id' v-model='checked' type='checkbox' />
			<label :for='id'>
				<span></span>
				<slot></slot>
			</label>
		</div>
	`,
};