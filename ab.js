class AnimeBox extends HTMLElement {
	#style = "";
	#class = "anime-box-class";
	
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
		flag = false;
		switch (name) {
			case 'width':
				flag = true
			case 'height':
				if (oldValue || newValue) {
					if (flag) {
						this.#delSize(flag);
					} else if (newValue) {
						this.#genSize(flag, newValue);
					} else if (oldValue !== newValue) {
						this.#setSize(flag, newValue);
					}
					this.#appSize(this.animeBoxBordering, this.animeInputTargeting);
				}
				break;
			case 'anime-coloring':
				flag = true;
			case 'anime-input-targeting':
				if (oldValue || newValue) {
					if ((!oldValue) && newValue) {
						this.#changeStyle(flag, true);
					} else if ((!newValue) && oldValue) {
						this.#changeStyle(flag, false);
					}
					this.#changeStyle(null, this.BoxBordering);
				}
				break;
			case 'anime-box-bordering':
				if ((!oldValue) && newValue) {
					this.#animeBoxBordering(true);
				} else if ((!newValue) && oldValue) {
					this.#animeBoxBordering(false);
				}
				break;
		}
	}
}

customElements.define('anime-box', AnimeBox);

const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));