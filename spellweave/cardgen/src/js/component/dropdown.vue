<template>
	<div class="dropdown-wrapper">
		<div class="card-drop">
			<button @click='onTopClick' class='button-top'>
				<i :class="'fas ' + activeItem.icon"></i>
				<span class='label-active'>{{ activeItem.title }} </span>
				<span class='caret-down'>&nbsp;<i class="fas fa-caret-down"></i>&nbsp;</span>
			</button>
			<ul>
				<li v-for='item in items' :class="item === activeItem ? 'active' : '' ">
					<button @click='onItemClick(item)'><i :class="'fas ' + item.icon"></i> {{ item.title }}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id', 'items', 'selectedValue', 'onSelect', 'zIndex'],
		data: function() {
			return {
				state: 'closed',
				cards: null,
				dropdown: null,
				links: null,
				li: null,
				elementCount: 0,
				activeItemData: this.defaultItem,
			}
		},
		computed: {
			zIndexInt() {
				return parseInt(this.zIndex);
			},
			defaultItem() {
				let items = this.items;
				for (let i = 0; i < items.length; i++) {
					if (items[i].value === this.selectedValue) {
						return items[i];
					}
				}
				return {};
			},
			activeItem: {
				get() {
					if (this.activeItemData === undefined) {
						this.activeItemData = this.defaultItem;
					}
					return this.activeItemData;
				},
				set(value) {
					if (this.onSelect !== undefined) {
						this.onSelect(value.value);
					}
					this.activeItemData = value;
				}
			},
		},
		methods: {
			open: function() {
				this.state = 'active';
				this.dropdown.addClass("active");
				this.li.removeClass('closed');
				this.li.each(function(index) {
					$(this).css("top" , $(this).height() * (index + 1));
				});
			},
			close: function() {
				this.state = 'closed';
				this.dropdown.removeClass("active");
				this.li.addClass('closed');
				this.li.each(function(){
					$(this).css("top" , 0);
				});
			},
			onTopClick: function() {
				if (this.state === 'active') {
					this.close();
				} else {
					this.open();
				}
			},
			onItemClick: function(item) {
				let items = this.items;
				for (let i = 0; i < items.length; i++) {
					if (items[i] === item) {
						this.activeItem = item;
					}
				}

				this.close();
			}
		},
		mounted: function() {
			this.cards = $(this.$el).find(".card-drop");
			this.dropdown = this.cards.find(".button-top");
			this.links = this.cards.find("ul>li>button");
			this.li = this.links.parent('li');
			this.elementCount = this.links.length;

			let zIndex = this.zIndexInt;
			let elementCount = this.elementCount;
			this.dropdown.css("z-index", zIndex + elementCount + 1);
			this.li.each(function(i) {
				$(this).css("z-index" , zIndex + elementCount - i);
			});

			this.close();


		},
	}
</script>