Vue.component('vue-cb-isFreeBuild', {
	props: ['id'],
	computed: {
		checked: {
			get() {
				return this.$store.state.cardState.isFreeBuild;
			},
			set(value) {
				this.$store.commit('cardState/setFreeBuild', value);
			}
		}
	},
	template: templates.vueCheckbox,
});

Vue.component('vue-cb-isFreeDraw', {
	props: ['id'],
	computed: {
		checked: {
			get() {
				return this.$store.state.cardState.isFreeDraw;
			},
			set(value) {
				this.$store.commit('cardState/setFreeDraw', value);
			}
		}
	},
	template: templates.vueCheckbox,
});

Vue.component('vue-dropdown-manacost', {
	props: ['id'],
	computed: {
		selectedValue: {
			get() {
				return 'test';
			},
			set(value) {
				console.log(value);
			}
		}
	},
	mounted: function(){
		let cards = $(".card-drop"),
			dropdown = cards.find(".button-top"),
			links = cards.find("ul>li>button"),
			li = links.parent('li'),
			count = links.length;

		//set z-Index of drop Items
		links.parent("li").each(function(i){
			$(this).css("z-index" , count - i); //invert the index values
		});

		function setClosed(){
			li.each(function(){
				$(this).css("top" , 0);
			});
			li.addClass('closed');
			dropdown.removeClass("active");
		}
		setClosed();

		dropdown.on("mousedown" , function() {
			let $this = $(this);
			if ($this.is(".active")){
				setClosed();
			} else {
				$this.addClass("active");
				li.removeClass('closed');
				li.each(function(index){
					$(this).css("top" , $(this).height() * (index + 1));
				});
			}
		});

		/* -------------------------------------------------------- */
		/*	Links Click handler
		/* -------------------------------------------------------- */
		links.on("click" , function(e){
			let $this = $(this),
				label = $this.data("label");
			icon = $this.children("i").attr("class");

			li.removeClass('active');
			if($this.parent("li").is("active")){
				$this.parent('li').removeClass("active");
			}else{
				$this.parent("li").addClass("active");
			}
			dropdown.children(".label-active").text(label);
			dropdown.children("i").removeClass().addClass(icon);
			setClosed();
			e.preventDefault();
		});
	},
	template: `
		<div id="wrapper">
			<div class="card-drop">
				<button class='button-top'>
					<i class='fas fa-arrow-right'></i> 
					<span class='label-active'>Path </span>
					<span class='caret-down'>&nbsp<i class="fas fa-caret-down"></i>&nbsp</span>
				</button>
				<ul>
					<li>
						<button data-label="Action"><i class='fas fa-hand-spock'></i> Action</button>
					</li>
					<li class='active'>
						<button data-label="Path"><i class='fas fa-arrow-right'></i> Path</button>
					</li>
					<li >
						<button data-label="Release"><i class='fas fa-certificate'></i> Release</button>
					</li>
				</ul>
			</div>
		</div>
	`,
});

Vue.component('vue-btn-newCard', {
	methods: {
		onClick: function () {
			this.$store.commit('cardState/clear');
		}
	},
	template: `<button v-on:click='onClick'>New card</button>`
});

Vue.component('vue-btn-renderCard', {
	methods: {
		onClick: function () {
			this.$root.$emit(EVENT.SAVE_CARD_AS_IMAGE);
		}
	},
	template: `<button v-on:click='onClick'>Save as image</button>`
});

Vue.component('vue-btn-saveCard', {
	methods: {
		onClick: function () {
			let item = JSON.parse(JSON.stringify(this.$store.state.cardState));
			item.timestamp = formatDateTime(new Date());

			item.version = 0;
			let library = this.$store.state.cardLibrary.data;
			for (let i = 0; i < library.length; i++) {
				if (library[i].cardName === item.cardName) {
					item.version += 1;
				}
			}
			item.displayName = item.cardName;
			if (item.cardName === '') {
				item.displayName = 'Unnamed';
			}
			if (item.version > 0) {
				item.displayName += ' (' + item.version + ')';
			}

			item.id = uuidv4();

			this.$store.commit('cardLibrary/push', item);
			this.$root.$emit(EVENT.UNSELECT_ALL_LIBRARY);
		}
	},
	template: `<button v-on:click='onClick'>Save to Library</button>`
});

Vue.component('vue-textarea-cardName', {
	computed: {
		text: {
			get() {
				return this.$store.state.cardState.cardName;
			},
			set(value) {
				this.$store.commit('cardState/setCardName', value);
			}
		}
	},
	template: `
		<div class='text-input'>
			<label>Card title</label>
			<input class='card-title' type='text' placeholder="Title" v-model='text'/>
		</div>
	`
});

Vue.component('vue-textarea-cardText', {
	computed: {
		text: {
			get() {
				return this.$store.state.cardState.cardDescription;
			},
			set(value) {
				this.$store.commit('cardState/setCardDescription', value);
			}
		}
	},
	template: `
		<div class='text-input'>
			<label>Card description</label>
			<textarea class='card-description' rows='5' placeholder="A description of the card's effect" v-model='text'/>
		</div>
	`
});