class AnimeFramework extends HTMLElement {
	static #isAnimeFrameworkLoaded = false;
	#break_orderd = true;
	
	constructor() {
		super();
		if (AnimeFramework.#isAnimeFrameworkLoaded) {
			throw new Error("[AnimeFramework Error] <anime-framework> component can loaded only once.");
		}
		AnimeFramework.#isAnimeFrameworkLoaded = true;
		this.#break_orderd = false;
	}
	
	connectedCallback() {
		if (this.#break_orderd) return;
		this.innerHTML = `
<style>
	@import url("data:text/css;base64,QGtleWZyYW1lcyBtYWtlQ2hlY2t7MCV7ei1pbmRleDoxO30xMDAle3otaW5kZXg6MTt9fUBrZXlmcmFtZXMgbWFrZVVuY2hlY2t7MCV7ei1pbmRleDoxO30xMDAle3otaW5kZXg6MTt9fQ==");

	anime-framework {
		display: block !important;
		width: 0 !important;
		height: 0 !important;
		overflow: hidden !important;
		visibility: hidden !important;
		pointer-events: none !important;
		user-select: none !important;
	}
</style>
		`;
		
		class AnimeInput extends HTMLElement {
			connectedCallback() {
				this.addEventListener('animationstart', (event) => {
					if (event.animationName === "makeCheck") {
						this.checked = true;
					} else if (event.animationName === "makeUncheck") {
						this.checked = false;
					}
				});
			}
			
			get checked() {
				return this.hasAttribute('checked');
			}
			
			set checked(value) {
				if (value) {
					this.setAttribute('checked', '');
				} else {
					this.removeAttribute('checked');
				}
			}
		}
		
		customElements.define('anime-input', AnimeInput);
	}
}

customElements.define('anime-framework', AnimeFramework);