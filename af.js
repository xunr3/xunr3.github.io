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
	@import url("QGxheWVyIGRlZmluZUFmQ2hlY2ssdXNpbmdBZkNoZWNrO0BsYXllciBkZWZpbmVBZkNoZWNre0BrZXlmcmFtZXMgbWFrZUNoZWNrezAle3otaW5kZXg6MTt9MTAwJXt6LWluZGV4OjE7fX1Aa2V5ZnJhbWVzIG1ha2VVbmNoZWNrezAle3otaW5kZXg6MTt9MTAwJXt6LWluZGV4OjE7fX19");

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

const af_webcode = (_ => console.log('<script src="https://xunr3.github.io/af.js" fetchpriority="high"></script>'));
const af_shortcode = (_ => console.log('<script src="data:text/javascript;base64,Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbmltZS1mcmFtZXdvcmsnLGNsYXNzIGEgZXh0ZW5kcyBIVE1MRWxlbWVudHtzdGF0aWMgI2IgPSBmYWxzZTsjYyA9IGZhbHNlO2NvbnN0cnVjdG9yKCl7c3VwZXIoKTthLiNiJiYoXz0+e3Rocm93IG5ldyBFcnJvcigiW0FuaW1lRnJhbWV3b3JrIEVycm9yXSA8YW5pbWUtZnJhbWV3b3JrPiBjb21wb25lbnQgY2FuIGxvYWRlZCBvbmx5IG9uY2UuIik7fSkoKTthLiNiPXRydWU7dGhpcy4jYz10cnVlO31jb25uZWN0ZWRDYWxsYmFjaygpe3RoaXMuI2MmJihfPT57dGhpcy5pbm5lckhUTUw9JzxzdHlsZT5AaW1wb3J0IHVybCgiUUd4aGVXVnlJR1JsWm1sdVpVRm1RMmhsWTJzc2RYTnBibWRCWmtOb1pXTnJPMEJzWVhsbGNpQmtaV1pwYm1WQlprTm9aV05yZTBCclpYbG1jbUZ0WlhNZ2JXRnJaVU5vWldOcmV6QWxlM290YVc1a1pYZzZNVHQ5TVRBd0pYdDZMV2x1WkdWNE9qRTdmWDFBYTJWNVpuSmhiV1Z6SUcxaGEyVlZibU5vWldOcmV6QWxlM290YVc1a1pYZzZNVHQ5TVRBd0pYdDZMV2x1WkdWNE9qRTdmWDE5Iik7YW5pbWUtZnJhbWV3b3Jre2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3dpZHRoOjAhaW1wb3J0YW50O2hlaWdodDowIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3Zpc2liaWxpdHk6aGlkZGVuIWltcG9ydGFudDtwb2ludGVyLWV2ZW50czpub25lIWltcG9ydGFudDt1c2VyLXNlbGVjdDpub25lIWltcG9ydGFudDt9PC9zdHlsZT4nO2N1c3RvbUVsZW1lbnRzLmRlZmluZSgnYW5pbWUtaW5wdXQnLGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnR7Y29ubmVjdGVkQ2FsbGJhY2soKXt0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbnN0YXJ0JywoZSk9PihlLmFuaW1hdGlvbk5hbWU9PT0ibWFrZUNoZWNrIik/dGhpcy5jaGVja2VkPXRydWU6KGUuYW5pbWF0aW9uTmFtZT09PSJtYWtlVW5jaGVjayIpP3RoaXMuY2hlY2tlZD1mYWxzZTp1bmRlZmluZWQpO31nZXQgY2hlY2tlZCgpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO31zZXQgY2hlY2tlZCh2KXt2P3RoaXMuIHNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJycpOnRoaXMucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7fX0pO30pKCl9fSk7" fetchpriority="high"></script>'));
