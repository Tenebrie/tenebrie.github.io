<template>
	<div id="wrapper">
		<div class="card-drop">
			<button class='button-top'>
				<i class='fas fa-arrow-right'></i>
				<span class='label-active'>Path </span>
				<span class='caret-down'>&nbsp;<i class="fas fa-caret-down"></i>&nbsp;</span>
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
</template>

<script>
	export default {
		props: ['id'],
		data: function() {
			return {
				icon: '',
			}
		},
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
				this.icon = $this.children("i").attr("class");

				li.removeClass('active');
				if($this.parent("li").is("active")){
					$this.parent('li').removeClass("active");
				}else{
					$this.parent("li").addClass("active");
				}
				dropdown.children(".label-active").text(label);
				dropdown.children("i").removeClass().addClass(this.icon);
				setClosed();
				e.preventDefault();
			});
		},
	}
</script>