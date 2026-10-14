class AnimeBox extends HTMLElement {
	static get observedAttributes() {
		return ['width', 'height', 'anime-input-targeting', 'anime-box-bordering', 'anime-coloring'];
	}
	
	get animeInputTargeting() {
		return this.hasAttribute('anime-input-targeting');
	}
	
	set animeInputTargeting(val)  {
		if (val) {
			this.setAttribute('anime-input-targeting', '');
		} else {
			this.removeAttribute('anime-input-targeting');
		}
	}
	
	get animeBoxBordering() {
		return this.hasAttribute('anime-box-bordering');
	}
	
	set animeBoxBordering(val)  {
		if (val) {
			this.setAttribute('anime-box-bordering', '');
		} else {
			this.removeAttribute('anime-box-bordering');
		}
	}
	
	get animeColoring() {
		return this.hasAttribute('anime-coloring');
	}
	
	set animeColoring(val)  {
		if (val) {
			this.setAttribute('anime-coloring', '');
		} else {
			this.removeAttribute('anime-coloring');
		}
	}
	
	get width() {
		if (!this.hasAttribute('width')) return;
		return this.getAttribute('width');
	}
	
	set width(value) {
		this.setAttribute('width', value);
	}
	
	get height() {
		if (!this.hasAttribute('height')) return;
		return this.getAttribute('height');
	}
	
	set height(value) {
		this.setAttribute('height', value);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'width':
				if (this.animeBoxing) {
					if (!(oldValue && newValue)) {
						//pass
					} else if (oldValue) {
						//pass
					} else if (newValue) {
						//pass
					} else if (oldValue !== newValue) {
						//pass
					}
				} else {
					if (!(oldValue && newValue)) {
						//pass
					} else if (oldValue) {
						//pass
					} else if (newValue) {
						//pass
					} else if (oldValue !== newValue) {
						//pass
					}
				}
				break;
			case 'height':
				if (this.animeBoxing) {
					if (!(oldValue && newValue)) {
						//pass
					} else if (oldValue) {
						//pass
					} else if (newValue) {
						//pass
					} else if (oldValue !== newValue) {
						//pass
					}
				} else {
					if (!(oldValue && newValue)) {
						//pass
					} else if (oldValue) {
						//pass
					} else if (newValue) {
						//pass
					} else if (oldValue !== newValue) {
						//pass
					}
				}
				break;
			case 'anime-coloring':
				if ((!oldValue) && newValue) {
					//pass
				} else if ((!newValue) && oldValue) {
					//pass
				}
				break;
			case 'anime-input-targeting':
				if ((!oldValue) && newValue) {
					//pass
				} else if ((!newValue) && oldValue) {
					//pass
				}
				break;
			case 'anime-box-bordering':
				if ((!oldValue) && newValue) {
					//pass
				} else if ((!newValue) && oldValue) {
					//pass
				}
				break;
		}
	}
}

customElements.define('anime-box', AnimeBox);

const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));