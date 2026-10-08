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

const af_shortcode = (_ => console.log('<script src="data:text/javascript;base64,Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbmltZS1mcmFtZXdvcmsnLGNsYXNzIHggZXh0ZW5kcyBIVE1MRWxlbWVudHtzdGF0aWMgI3A9ZmFsc2U7I3E9ZmFsc2U7Y29uc3RydWN0b3IoKXtzdXBlcigpO3guI3AmJihfPT57dGhyb3cgbmV3IEVycm9yKCJbQW5pbWVGcmFtZXdvcmsgRXJyb3JdIDxhbmltZS1mcmFtZXdvcms+IGNvbXBvbmVudCBjYW4gbG9hZGVkIG9ubHkgb25jZS4iKTt9KSgpO3guI3A9dHJ1ZTt0aGlzLiNxPXRydWU7fWNvbm5lY3RlZENhbGxiYWNrKCl7dGhpcy4jcSYmKF89Pnt0aGlzLmlubmVySFRNTD0nPHN0eWxlPkBpbXBvcnQgdXJsKCJkYXRhOnRleHQvY3NzO2Jhc2U2NCxRR3RsZVdaeVlXMWxjeUJ0WVd0bFEyaGxZMnQ3TUNWN2VpMXBibVJsZURveE8zMHhNREFsZTNvdGFXNWtaWGc2TVR0OWZVQnJaWGxtY21GdFpYTWdiV0ZyWlZWdVkyaGxZMnQ3TUNWN2VpMXBibVJsZURveE8zMHhNREFsZTNvdGFXNWtaWGc2TVR0OWZRPT0iKTthbmltZS1mcmFtZXdvcmt7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7d2lkdGg6MCFpbXBvcnRhbnQ7aGVpZ2h0OjAhaW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7dmlzaWJpbGl0eTpoaWRkZW4haW1wb3J0YW50O3BvaW50ZXItZXZlbnRzOm5vbmUhaW1wb3J0YW50O3VzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50O308L3N0eWxlPic7Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbmltZS1pbnB1dCcsY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudHtjb25uZWN0ZWRDYWxsYmFjaygpe3RoaXMuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uc3RhcnQnLGU9PntpZihlLmFuaW1hdGlvbk5hbWU9PT0ibWFrZUNoZWNrIil0aGlzLmNoZWNrZWQ9dHJ1ZTtlbHNlIGlmKGUuYW5pbWF0aW9uTmFtZT09PSJtYWtlVW5jaGVjayIpdGhpcy5jaGVja2VkPWZhbHNlO30pO31nZXQgY2hlY2tlZCgpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO31zZXQgY2hlY2tlZCh2KXt2Pyh0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJycpKToodGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKSk7fX0pO30pKCk7fX0pOw==" fetchpriority="high" />'))