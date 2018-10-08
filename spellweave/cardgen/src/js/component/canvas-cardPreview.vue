<template>
	<canvas></canvas>
</template>

<script>
	export default {
		data: function() {
			return {
				previewContext: null,
				canvasRenderDebounceTimer: null,
			}
		},
		mounted: function() {
			let canvas = this.$el;
			let dpr = window.devicePixelRatio || 1;
			let rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			let ctx = canvas.getContext('2d');
			ctx.scale(dpr, dpr);
			this.previewContext = ctx;

			this.$root.$on(Event.SAVE_CARD_AS_IMAGE, () => {
				this.saveCanvasToFile();
			});

			this.$root.$on(Event.CARD_STATE_UPDATED, () => {
				this.renderCanvas();
			});

			this.$root.$on(Event.CARD_TEXT_UPDATED, () => {
				this.renderCanvas();
			});

			this.renderCanvasAfterDelay();
			window.addEventListener('resize', () => {
				this.renderCanvasAfterDelay();
			});
		},
		methods: {
			renderCanvasAfterDelay: function() {
				if (this.canvasRenderDebounceTimer === null) {
					this.canvasRenderDebounceTimer = setTimeout(this.renderCanvas, 20);
				}
			},

			clearCanvasRenderThrottleTimer: function() {
				this.canvasRenderDebounceTimer = null;
			},

			renderCanvas: function() {
				let backgroundImg = new Image();
				let ctx = this.previewContext;
				backgroundImg.onload = function() {
					ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
					let sourceWidth = backgroundImg.width;
					let sourceHeight = backgroundImg.height;
					let realWidth = ctx.canvas.offsetWidth;
					let targetHeight = sourceWidth / (sourceWidth / sourceHeight);
					let parent = $(this.$el).parent();
					$(this.$el).attr("width", sourceWidth).attr("height", targetHeight);
					$(this.$el).css('height', targetHeight);
					$(this.$el).css('max-width', sourceWidth);
					$(this.$el).css('margin-top', parent.height() / 2 - targetHeight / 2);
					$(this.$el).parent().css('min-width', sourceWidth);
					this.drawImage(ctx, backgroundImg);

					if (this.$store.state.cardState.isFreeBuild || this.$store.state.cardState.isFreeDraw) {
						this.drawImageFromFile(ctx, 'res/bg_attribute.png');
					}

					let cardName = this.$store.state.cardState.cardName;
					let cardDescription = this.$store.state.cardState.cardDescription;

					this.drawImageFromFile(ctx, 'res/bg_name.png', () => {
						if (cardName !== '') {
							this.renderText(ctx, '24px K2D', 'black', cardName, realWidth / 2, 140, 24, 270);
						}
					});
					this.renderText(ctx, '18px K2D', Color.DEFAULT_CARD_TEXT, cardDescription, realWidth / 2, 350, 16, realWidth - 50, 200, 200);

				}.bind(this);
				backgroundImg.src = 'res/bg_path.png';
				this.clearCanvasRenderThrottleTimer();
			},

			renderText: function(ctx, font, color, text, targetX, targetY, lineHeight, maxWidth, maxHeight) {
				if (text === null || text.length === 0) {
					return;
				}
				if (maxWidth === undefined) {
					maxWidth = targetX * 2;
				}
				if (maxHeight === undefined) {
					maxHeight = 0;
				}

				ctx.font = font;
				ctx.fillStyle = color;

				const maximumLineY = targetY + maxHeight;

				let paragraphs = text.split('\n');
				let currentLineY = targetY;

				while (paragraphs.length > 0) {
					let words = paragraphs[0].split(' ');
					let currentLineText = null, currentTextCandidate = null;

					while (words.length > 0) {
						currentTextCandidate = words[0];
						if (currentLineText !== null) {
							currentTextCandidate = currentLineText + ' ' + currentTextCandidate;
						}
						let width = ctx.measureText(this.stripMarkup(currentTextCandidate)).width;
						if (width < maxWidth) {
							currentLineText = currentTextCandidate;
							words.splice(0, 1);
						} else if (currentLineText != null) {
							if (currentLineY + lineHeight > maximumLineY) {
								currentLineText += '...';
								break;
							}
							this.renderTextLine(ctx, color, currentLineText, targetX, currentLineY);
							currentLineY += lineHeight;
							currentLineText = null;
						} else {
							currentLineText = currentTextCandidate;
							break;
						}
					}

					paragraphs.splice(0, 1);
					this.renderTextLine(ctx, color, currentLineText, targetX, currentLineY);
					currentLineY += lineHeight * 1.2;
				}
			},

			renderTextLine: function(ctx, defaultColor, text, targetX, targetY) {
				if (text === null) {
					throw 'Unable to render null text';
				}

				let cleanText = this.stripMarkup(text);
				let width = ctx.measureText(cleanText).width;
				let renderTargetX = targetX - width / 2;

				const colorTagPairPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>.+<\/color>$/g;
				const openingColorTagPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>.+$/g;
				const inversedColorTagPairPattern = /<\/color>.+<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g;
				const closingColorTagPattern = /.+<\/color>$/g;
				const firstClosingColorTagPattern = /<\/color>.+$/g;
				const lastOpeningColorTagPattern = /.+<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g;
				const nakedOpeningColorTagPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g;
				const nakedClosingColorTagPattern = /<\/color>$/g;
				let results;
				let currentLineX = renderTargetX;

				let words = text.split(' ');

				while (words.length > 0) {
					let word = words[0];
					let cleanWord = this.stripMarkup(word);
					if (words.length > 1) {
						cleanWord += ' ';
					}

					results = colorTagPairPattern.exec(word);
					if (results !== null) {
						ctx.fillStyle = results[1];
						ctx.fillText(cleanWord, currentLineX, targetY);
						ctx.fillStyle = defaultColor;
					}

					if (results === null) {
						results = inversedColorTagPairPattern.exec(word);
						if (results !== null) {
							ctx.fillStyle = defaultColor;
							ctx.fillText(cleanWord, currentLineX, targetY);
							ctx.fillStyle = results[1];
						}
					}

					if (results === null) {
						results = openingColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillStyle = results[1];
							ctx.fillText(cleanWord, currentLineX, targetY);
						}
					}

					if (results === null) {
						results = closingColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillText(cleanWord, currentLineX, targetY);
							ctx.fillStyle = defaultColor;
						}
					}

					if (results === null) {
						results = firstClosingColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillStyle = color;
							ctx.fillText(cleanWord, currentLineX, targetY);
						}
					}

					if (results === null) {
						results = lastOpeningColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillText(cleanWord, currentLineX, targetY);
							ctx.fillStyle = results[1];
						}
					}

					if (results === null) {
						results = nakedOpeningColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillStyle = results[1];
						}
					}

					if (results === null) {
						results = nakedClosingColorTagPattern.exec(word);
						if (results !== null) {
							ctx.fillStyle = defaultColor;
						}
					}

					if (results === null) {
						ctx.fillText(cleanWord, currentLineX, targetY);
					}

					words.splice(0, 1);
					currentLineX += ctx.measureText(cleanWord).width;

					colorTagPairPattern.lastIndex = 0;
					openingColorTagPattern.lastIndex = 0;
					inversedColorTagPairPattern.lastIndex = 0;
					closingColorTagPattern.lastIndex = 0;
					firstClosingColorTagPattern.lastIndex = 0;
					lastOpeningColorTagPattern.lastIndex = 0;
					nakedOpeningColorTagPattern.lastIndex = 0;
					nakedClosingColorTagPattern.lastIndex = 0;
				}
			},

			stripMarkup: function(text) {
				const htmlTagPattern = /<[^>]+>/g;
				return text.replace(htmlTagPattern, '');
			},

			drawImage: function(ctx, image) {
				ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
			},

			drawImageFromFile: function(ctx, filePath, callback) {
				let image = new Image();
				image.onload = function() {
					this.drawImage(ctx, image);
					if (typeof callback !== 'undefined') {
						callback();
					}
				}.bind(this);
				image.src = filePath;
			},

			getCardFileName: function() {
				let enteredName = this.$store.state.cardState.cardName;
				if (enteredName.length === 0) {
					return 'sw-unnamedCard.png';
				} else {
					let formattedName = enteredName.trim();
					formattedName = formattedName.substring(0, 1).toLowerCase() + formattedName.substring(1);
					formattedName = formattedName.replace(/\s/g, '');
					return 'sw-' + formattedName + '.png';
				}
			},

			saveCanvasToFile: function() {
				let image = this.previewContext.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

				let anchorTag = document.createElement("a");
				document.body.appendChild(anchorTag);
				anchorTag.setAttribute('href', image);
				anchorTag.setAttribute('download', this.getCardFileName());
				anchorTag.click();
				setTimeout(function() {
					document.body.removeChild(anchorTag);
				}, 0);
			},
		},
	}
</script>