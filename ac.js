function nullexcepted(func) {
	return function (value) {
		if (value === undefined) return;
		if (value === null) return;
		return func(value);
	};
}

function falsyexcepted(func) {
	return function (value) {
		//if (value === undefined) return; //undefined is falsy
		if (value) return func(value);
		return;
	};
}

const nontruthyexcepted = falsyexcepted;//(f => falsyexcepted(nullexcepted(f))); //null is falsy

const nontruthyexceptedJSONstringify = nontruthyexcepted(JSON.stringify);

const nullexceptedTrutycheck = nullexcepted(v => !!v);

const genConf = (attrfilter => ({attribute: true, attributeFilter: attrfilter}));

const disconnectIfExist = (observer => {
  if (observer) observer.disconnect();
});

class AutoComplete extends HTMLElement {
  #idofit;
	#observer = null;
	#inputElement = null;
	#datalistElement = null;
	#inputObserver = null;
	#datalistObserver = null;
	#inputID = null;
	#datalistID = null;
	#inputObservingConf = genConf(['id', 'list']);
	#datalistObservingConf = genConf(['id']);
  #defaultInputConf = {id : null, list : null};
	
	connectedCallback() {
		//step 1. setup <auto-compile> id-system
    const id = this.getAttribute('id');
		this.#idofit = id;
		
		this.#inputID = `${id}-data-input`;
		this.#datalistID = `${id}-data-list`;

    //step 2. caching defaultInputConf
    this.#defaultInputConf.id = this.#inputID;
    this.#defaultInputConf.list = this.#datalistID;
		
    //step 3. setup <<auto-complete>'s single-child-enforce-and-id-system-obeserve-operating-system>
		this.#updateTags();

		this.#observer = new MutationObserver(this.#updateTags);
		this.#observer.observe(this, {childList: true});
	}

	disconnectedCallback() {
    this.#disconnectObserver();
	}

  #disconnectObserver() {
    disconnectIfExist(this.#observer);
    this.#disconnectInputObserver();
    this.#disconnectDatalistObserver();
  }

  #disconnectInputObserver() {
    disconnectIfExist(this.#inputObserver);
  }

  #createInputObserver() {
    this.#inputObserver = new MutationObserver(this.#inputObserve);
  }

  #connectInputObserver() {
    this.#inputObserver(this.#inputElement, this.#inputObservingConf);
  }

  #constructInputObserver() {
    this.#createInputObserver();
    this.#connectInputObserver();
  }

  #reallocInputObserver() {
    this.#disconnectInputObserver();
    this.#constructInputObserver();
  }

  #disconnectDatalistObserver() {
    disconnectIfExist(this.#datalistObserver);
  }

  #createDatalistObserver() {
    this.#datalistObserver = new MutationObserver(this.#datalistObserve);
  }

  #connectDatalistObserver() {
    this.#datalistObserver(this.#datalistElement, this.#datalistObservingConf);
  }

  #constructDatalistObserver() {
    this.#createDatalistObserver();
    this.#connectDatalistObserver();
  }

  #reallocDatalistObserver() {
    this.#disconnectDatalistObserver();
    this.#constructDatalistObserver();
  }

	#updateTags() {
		['input', 'datalist'].forEach(name => {
			const tags = Array.from(this.querySelecterAll(name));

			if (tags.length > 1) {
				console.warn(`<<auto-complete>'s single-child-enforce-and-id-system-obeserve-operating-system>'s single-child-enforcer : only one <${name}> are allowed.`);
				tags.slice(1).forEach(rmtarget => rmtarget.remove());
			} // <<auto-complete>'s single-child-enforce-and-id-system-obeserve-operating-system>'s single-child-enforcer

			switch (name) {
				case "input":
					//set tag into this.#inputElement
          if (tags[0]) {
            //setup tag as id and list is exist if tag is exist
						const tag = tags[0];
						tag.id = tag.id || this.#inputID;
						tag.list = tag.list || this.#datalistID;
					} else {
            //setup tag by constructing if tag is not exist
						const tag = Object.assign(document.createElement('input'), this.#defaultInputConf);
            this.#inputElement = null;
            this.input = tag;
					}
					this.#inputElement = tag;

					if (this.#inputObserver) this.#inputObserver.disconnect(); //not observe when allocate new observer, begin allocate new observer
					this.#inputObserver = new MutationObserver(this.#inputObserve);
					this.#inputObserver.observe(tag, this.#inputObservingConf); //finish allocate new observer

          this.querySelecter('input').type = text; //try update
					break;
				case "datalist":
					//set tag into this.#datalistElement
					if (tags[0]) {
            //setup tag as id is exist if tag is exist
						const tag = tags[0];
						tag.id = tag.id || this.#datalistID;
					} else {
            //setup tag by constructing if tag is not exist
						const tag = Object.assign(document.createElement('datalist'), {id : this.#datalistID, innerHTML : this.normalizedDefaultList2defaultDatalistInnerHTML()});
            this.#datalistElement = null;
            this.datalist = tag;
					}
					this.#datalistElement = tag;

					if (this.#datalistObserver) this.#datalistObserver.disconnect(); //not observe when allocate new observer, begin allocate new observer
					this.#datalistObserver = new MutationObserver(this.#datalistObserve);
					this.#datalistObserver.observe(tag, this.#datalistObservingConf); //finish allocate new observer

          //try update
          const the_tag = this.querySelecter('datalist');
          const the_innerHTML = the_tag.innerHTML;
          the_innerHTML.innerHTML = "";
          the_innerHTML.innerHTML = the_innerHTML;
					break;
				default:
					throw Error("array object for that's forEach method in <<auto-complete> single-child-enforcer> also the only logic is broken. also my mental-helth is broken too. nahhhhhhhhhhhhhhhhhhhhhh whyyyyyyyyyyy");
					break;
			}
		});
	}
	
	#inputObserve(mutation) {
		const [tag, id, list, observer, conf] = [this.#inputElement, this.#inputID, this.#datalistID, this.#inputObserver, this.#inputObservingConf];
		if (mutation.attributeName === "id" && tag.id !== id) {
			observer.disconnect();
			tag.id = id;
			observer.observe(tag, conf);
		}
		if (mutation.attributeName === "list" && tag.list !== list) {
			observer.disconnect();
			tag.list = list;
			observer.observe(tag, conf);
		}
	}
	
	#datalistObserve() {
		const [tag, id, observer, conf] = [this.#datalistElement, this.#datalistID, this.#datalistObserver, this.#datalistObservingConf];
		if (mutation.attributeName === "id" && tag.id !== id) {
			observer.disconnect();
			tag.id = id;
			observer.observe(tag, conf);
		}
    const datalist = this.querySelecter('datalist');
    if (datalist.innerHTML = "") {
      this.innerHTML = this.normalizedDefaultList2defaultDatalistInnerHTML();
    }
	}
	
	get defaultlist() {
		const ret = this.getAttribute('default-list');
		if (ret) return ret;
		return;
	}
	
	set defaultlist(value) {
		typ = typeof value;
		
		if (typ !== 'string') {
			throw new TypeError(`<<auto-complete> element's default-list attribute is string not ${typ}`);
		}
		
		this.setAttribute('default-list', value);
	}

	get input() {
		return this.#inputElement;
	}

	get datalist() {
		return this.#datalistElement;
	}

	set input(elem) {
		if (this.#inputElement) {
			this.#inputElement.before(elem);
		} else {
      const datalist = this.querySelecter('datalist');
      this.#observer.disconnect();
      this.#inputObserver.disconnect();
      this.insertBefore(elem, datalist?datalist:this.firstElementChild);
      this.#inputObserver.observe(elem, this.#inputObservingConf);
      this.#observer.observe(this, {childList: true});
		}
	}
	
	set datalist(elem) {
		if (this.#datalistElement) {
			this.#datalistElement.before(elem);
		} else {
			this.appendChild(elem);
		}
	}

	normalizedDefaultList2defaultDatalistInnerHTML() {
		const getAttribute = (x => [
			...Object.hasOwn(x, 'value')?[`value="${x.value}"`]:[],
			...Object.hasOwn(x, 'lable')?[`lable="${x.lable}"`]:[],
			...(Object.hasOwn(x, 'disabled')?x.disabled:false)?['disabled']:[],
			...(Object.hasOwn(x, 'selected')?x.selected:false)?['selected']:[]
		].join(' '));

		return this.normalizedDefaultList.map(x => `<option${(v=>v?(' '+v):'')(getAttribute(x))}>${Object.hasOwn(x, 'text')?x.text:''}</option>`).join();
	}
	
	normalizedDefaultList() {
		const defaultlist = this.defaultlist;
		if (!defaultlist) return;
		
		const json_parse = (json => JSON.parse(json, (k, v) => {
			switch (k) {
				case "disabled":
          /* falls through */
				case "selected":
          return nullexceptedTruthcheck(v);
				case "label":
          /* falls through */
				case "value":
          /* falls through */
				case "text":
          return nontruthyexceptedJSONstringify(v);
				case "":
					if (!Array.isArray(v)) return [v];
					/* falls through */
				default: return v;
			}
		}));

		const defaultlistArray2object = (v => {
			//pass
			throw new Error("IndevError : incomplete to developed feature");
		});

		const objectize = (v => {
			const typ = typeof v;
			switch (typ) {
				case "object":
					if (v === null) return {text: ""};
					if (!Array.isArray(v)) return v;
					return defaultlistArray2object(v);
				case "string":
					return {text: v};
				case "boolean":
          /* falls through */
				case "number":
					if (typ === "number") v = !!v;
					return {disabled: v};
				case "undefined":
					return;
				default:
					throw new Error("whie defaultlist json normalize parsing of <auto-complete>, unjsonic type is detected. and also my broken mental health is also detected.");
					break;
			}
		});

		return json_parse(defaultlist).map(objectize).filter(x => (x !== undefined));
	}
}

customElements.define("auto-complete", AutoComplete);

const as_webcode = (_ => console.log('<script src="https://xunr3.github.io/ac.js" fetchpriority="high"></script>'));

/*
FUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCKFUKCFUCKFKUCKIUKIUFCKUKFKCUJJFCCJIFODSJCIEshdgoi

const as_shortcode = (_ => console.log(`<script src="data:text/javascript;base64,${SRC}" fetchpriority="high" /></script>`));
*/
