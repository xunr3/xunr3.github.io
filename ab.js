class AnimeBox extends HTMLElement {
        #style = "";
        #class = "anime-box-class anime-box-input-target";
    #width = null;
    #height = null;

    connectedCallback() {
        if (this.width) this.#setSize(true, this.width);
        if (this.height) this.#setSize(false, this.height);
        if (this.animeColoring) this.#changeStyle(true, true);
        if (this.animeInputTargeting) this.#changeStyle(false, true);
        this.#changeStyle(null, false);
        this.#appSize(false);
        if (this.#animeBoxBordering) this.#animeBoxBordering(true);
    }

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
                                        this.#appSize(this.animeBoxBordering);
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
                                        this.#changeStyle(null, this.animeBoxBordering);
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

    #animeBoxBordering(dose_it) {
        //pass
    }

    #changeStyle(mode, argument) {
        if (mode === null) {
            if (argument) {
                //pass;
            } else {
                //pass;
            }
        } else if (mode) { //it's doColoring mode bool
            if (argument) {
                this.#class += " anime-coloring"
            } else {
                this.#class = this.#class.replace(" anime-coloring", "")
            }
        } else {
            if (argument) {
                this.#class = this.#class.replace("anime-box-input-target", "anime-box-anime-input-target");
            } else {
                this.#class = this.#class.replace("anime-box-anime-input-target", "anime-box-input-target");
            }
        }
    }



    #delSize(is_width) {
        if (is_width) {
            this.#style = this.#style.replace(`--anime-box-width: ${this.#width};`, "");
            this.#width = null;
        } else {
            this.#style = this.#style.replace(`--anime-box-height: ${this.#height};`, "");
            this.#height = null;
        }
    }

    #genSize(is_width, value) {
        if (is_width) {
            this.#style += `--anime-box-width: ${value};`;
            this.#width = value;
        } else {
            this.#style += `--anime-box-height: ${value};`;
            this.#width = value;
        }
    }

    #setSize(is_width, value) {
        if (is_width) {
            this.#style = this.#style.replace(`th: ${this.#width}`, `th: ${value}`);
            this.#width = value;
        } else {
            this.#style = this.#style.replace(`ht: ${this.#height}`, `ht: ${value}`);
            this.#height = value;
        }
    }

    #appSize(isBoxBordered) {
        if (this.#style) {
            if (isBoxBordered) {
                //pass;
            } else {
                //pass;
            }
        }
    }
}

customElements.define('anime-box', AnimeBox);

const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));