export async function loadbus() {
    try {
        Object.assign(window, await import('https://xunr3.github.io/bus.mjs'));
    } catch (error) {
        console.error('faild to load bus.js', error);
    }
}

export const originalLog = console.log.bind(console);
export const originalAlert = window.alert.bind(window);

export const swap = () => {
    window.console.log = originalAlert;
    window.alert = originalLog;
};

export const rollback = () => {
    window.console.log = originalLog;
    window.alert = originalAlert;
};

export const log2alert = (f => {swap(); f(); alert();});

export class DevEzbus extends HTMLElement {
          static #isFrameworkLoaded = false;
          #break_orderd = true;

          constructor() {
                    super();
                    if (DevEzbus.#isFrameworkLoaded) {
                              throw new Error("[DevEzbus Error] <dev-ezbus> component can loaded only once.");
                    }
                    DevEzbus.#isFrameworkLoaded = true;
                    this.#break_orderd = false;
          }

          connectedCallback() {
                    if (this.#break_orderd) return;
                    loadbus();
                    this.innerHTML = `
<bus-init></bus-init>
<style>
    @import url("https://xunr3.github.io/bugc_underclock_style.css");
    @layer usingBugc{
  	  dev-ezbus {
		    display: block !important;
		    width: 0 !important;
		    height: 0 !important;
	  	  overflow: hidden !important;
		    visibility: hidden !important;
	  	  pointer-events: none !important;
		    user-select: none !important;
  	  }
    }
</style>
                    `;
                    
                    class EzbusBox extends HTMLElement {
                        #box = null;
                        #ALLOWattributeChangedCallback = null;
                        
                        connectedCallback() {
                            setTimeout(() => {
                            	this.#box = Object.assign(document.createElement('anime-box'), {innerHTML: this.innerHTML});
                            	this.innerHTML = "";
                	            this.appendChild(this.#box);
                            	this.#box = this.querySelector('anime-box');
                            	(async () => {
                              	    while (!this.#box.available) await new Promise(resolve => requestAnimationFrame(resolve));
                            	    this.#compileAttribute();
                            	    this.#ALLOWattributeChangedCallback = true;
                            	})();
                            }, 0);
                        }
                        
                        static get observedAttributes() {
                            return ['width', 'height', 'non-checkbox', 'detecter-on', 'debug-mode'];
                        }
                        
                        get nonCheckbox() {
                            return this.hasAttribute('non-checkbox');
                        }
                        
                        set nonCheckbox(val)  {
                            if (val) {
                                this.setAttribute('non-checkbox', '');
                            } else {
                                this.removeAttribute('non-checkbox');
                            }
                        }
                        
                        get detecterOn() {
                            return this.hasAttribute('detecter-on');
                        }
                        
                        set detecterOn(val)  {
                            if (val) {
                                this.setAttribute('detecter-on', '');
                            } else {
                                this.removeAttribute('detecter-on');
                            }
                        }
                        
                        get debugMode() {
                            return this.hasAttribute('debug-mode');
                        }
                        
                        set debugMode(val)  {
                            if (val) {
                                this.setAttribute('debug-mode', '');
                            } else {
                                this.removeAttribute('debug-mode');
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
                        
                        #compileAttribute() {
                            if (this.#ALLOWattributeChangedCallback === null) {
                                if (this.width) {
                                    this.#setupWidth();
                                } else {
                                    this.#removeWidth();
                                }
                                if (this.height) {
                                    this.#setupHeight();
                                } else {
                                    this.#removeHeight();
                                }
                                this.#setupNonCheckbox();
                                if (this.debugMode) {
                                     this.#setupDetecterOn(true);
                                } else {
                                    this.#setupDetecterOn(this.detecterOn);
                                }
							} else if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                if (this.width) {
                                    this.#setupWidth();
                                } else {
                                    this.#removeWidth();
                                }
                                if (this.height) {
                                    this.#setupHeight();
                                } else {
                                    this.#removeHeight();
                                }
                                this.#setupNonCheckbox();
                                if (this.debugMode) {
                                     this.#setupDetecterOn(true);
                                } else {
                                    this.#setupDetecterOn(this.detecterOn);
                                }
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }
                        
                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback !== null) this.#compileAttribute();
                        }
                        
                        #setupWidth() {
                            this.#box.width = this.width;
                        }
                        
                        #removeWidth() {
                        	if (this.#box.hasAttribute("width")) this.#box.removeAttribute("width");
                        }
                        
                        #setupHeight() {
                            this.#box.height = this.height;
                        }
                        
                        #removeHeight() {
                        	if (this.#box.hasAttribute("height")) this.#box.removeAttribute("height");
                        }
                        
                        #setupNonCheckbox() {
                            this.#box.animeInputTargeting = this.nonCheckbox;
                        }
                        
                        #setupDetecterOn(isDetecterOn) {
                            this.#box.animeBoxBordering = isDetecterOn;
                            this.#box.animeColoring = isDetecterOn;
                        }
                    }
                    
                    customElements.define('dev-ezbus-box', EzbusBox);
                    
                    const alerters = [["devezbus", "devezbus_webcode", "devezbus_shortcode"], ["bugc", "bugc_webcode", "bugc_shortcode"], ["bus", "bus_webcode", "bus_shortcode"], ["ab", "ab_webcode", "ab_shortcode"], ["af", "af_webcode", "af_shortcode"]];
                    
                    for (const name of alerters) {
                        customElements.define(`dev-ezbus-alert-${name[0]}`, class extends HTMLElement {
                            #name1 = name[1];
                            #name2 = name[2];
                            
                            connectedCallback() {
                                this.innerHTML = `<button onclick="log2alert(${this.#name1})"> click to alert about ${this.#name1} </button><button onclick="log2alert(${this.#name2})"> click to alert about ${this.#name2} </button>`;
                            }
                        });
                    }
                    
                    class EzbusInfo extends HTMLElement {
                        connectedCallback() {
                            this.innerHTML = `
<details>
    <summary> ℹ️ how 2 load it? </summary>
    <ol>
        <li>
            <details open>
                <summary> bus </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tag </summary>
                            <ul>
                                <li> <div class="bus-src"></div> </li>
                                <li> <div class="bus-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="bus-import-src"></div> </li>
                                <li> <div class="bus-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>

        <li>
            <details open>
                <summary> bugc </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tags </summary>
                            <ul>
                                <li> <div class="bugc-src"></div> </li>
                                <li> <div class="bugc-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                            <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="bugc-import-src"></div> </li>
                                <li> <div class="bugc-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>

        <li>
            <details open>
                <summary> busccore </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tag </summary>
                            <ul>
                                <li> <div class="bugccore-src"></div> </li>
                                <li> <div class="bus-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="bugccore-import-src"></div> </li>
                                <li> <div class="bugccore-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>

        <li>
            <details open>
                <summary> nand </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tag </summary>
                            <ul>
                                <li> <div class="nand-src"></div> </li>
                                <li> <div class="nand-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="nand-import-src"></div> </li>
                                <li> <div class="nand-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>

        <li>
            <details open>
                <summary> wps </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tag </summary>
                            <ul>
                                <li> <div class="wps-src"></div> </li>
                                <li> <div class="wps-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="wps-import-src"></div> </li>
                                <li> <div class="wps-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>

        <li>
            <details open>
                <summary> css-of-ab </summary>
                <ul>
                    <li>
                        <details open>
                            <summary> tag </summary>
                            <ul>
                                <li> <div class="css-of-ab-src"></div> </li>
                                <li> <div class="css-of-ab-short-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary> src </summary>
                            <ul>
                                <li> <div class="css-of-ab-import-src"></div> </li>
                                <li> <div class="css-of-ab-short-import-src"></div> </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        
        <li>
            <details>
                <summary> ℹ️ the devezbus enviroment </summary>
                <dev-ezbus-alert-devezbus></dev-ezbus-alert-devezbus>
            </details>
        </li>
        
        <li>
            <details>
                <summary> ℹ️ &lt;bugc-init&gt; defining extension </summary>
                <dev-ezbus-alert-bugc></dev-ezbus-alert-bugc>
            </details>
        </li>
        
        <li>
            <details>
                <summary> ℹ️ &lt;bus-init&gt; defining extension </summary>
                <dev-ezbus-alert-bus></dev-ezbus-alert-bus>
            </details>
        </li>
        
        <li>
            <details>
                <summary> ℹ️ anime fw box extension </summary>
                <dev-ezbus-alert-ab></dev-ezbus-alert-ab>
            </details>
        </li>
        
        <li>
            <details>
                <summary> ℹ️ anime fw </summary>
                <dev-ezbus-alert-af></dev-ezbus-alert-...>
            </details>
        </li>
    </ol>
</details>
                            `;
                        }
                    }
                    
                    customElements.define('dev-ezbus-info', EzbusInfo);

                    class EzbusNand extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNand(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNand();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNand() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("nand-gate"))) this.setAttribute("class", classv?`${classv} nand-gate`:"nand-gate");
                            
                            let i0 = this.dataI0?` ${this.dataI0}`:'';
                            let i1 = this.dataI1?` ${this.dataI1}`:'';
                            let o = this.dataO?` ${this.dataO}`:'';
                            
                            i0 = `<anime-input class="nand-gate-i0${i0}"></anime-input>`;
                            i1 = `<anime-input class="nand-gate-i1${i1}"></anime-input>`;
                            o = `<anime-input class="nand-gate-o${o}"></anime-input>`;

                            this.innerHTML = `${i0}${i1}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nand', EzbusNand);

                    class EzbusNot extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i', 'data-o'];
                        }
                        
                        get dataI() {
                            if (!this.hasAttribute('data-i')) return;
                            return this.getAttribute('data-i');
                        }
                        
                        set dataI(val) {
                            this.setAttribute('data-i', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNot(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNot();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNot() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("nand-gate"))) this.setAttribute("class", classv?`${classv} nand-gate`:"nand-gate");
                            
                            let i = this.dataI?` data-i0=${this.dataI} data-i1=${this.dataI}`:'';
                            let o = this.dataO?` data-o=${this.dataO}`:'';

                            this.innerHTML = `<dev-ezbus-nand${i}${o}></dev-ezbus-nand>`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-not', EzbusNot);

                    class EzbusAnd extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupAnd(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupAnd();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupAnd() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            let i0 = this.dataI0?` data-i0=${this.dataI0}`:'';
                            let i1 = this.dataI1?` data-i1=${this.dataI1}`:'';
                            let o = this.dataO?` data-o=${this.dataO}`:'';

                            this.innerHTML = `<dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"></dev-ezbus-nand><dev-ezbus-not data-i="wps-w15-o15"${o}></dev-ezbus-not>`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-and', EzbusAnd);

                    class EzbusOr extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupOr(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupOr();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupOr() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?`<dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not>';
                            const i1 = this.dataI1?`<dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i14"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i14"></dev-ezbus-not>';
                            const o = this.dataO?`<dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14" data-o="${this.dataO}"></dev-ezbus-nand>`:'<dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14"></dev-ezbus-nand>';

                            this.innerHTML = `${i0}${i1}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-or', EzbusOr);

                    class EzbusNor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNor(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNor() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?`<dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not>';
                            const i1 = this.dataI1?`<dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i14"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i14"></dev-ezbus-not>';
                            const o = this.dataO?`<dev-ezbus-not data-i="wps-w15-o13" data-o="${this.dataO}"></dev-ezbus-not>`:'<dev-ezbus-not data-i="wps-w15-o13"></dev-ezbus-not>';

                            this.innerHTML = `${i0}${i1}<dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14" data-o="wps-w15-i13"></dev-ezbus-nand>${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nor', EzbusNor);

                    class EzbusXor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupXor(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupXor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupXor() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13" data-o="${this.dataO}"></dev-ezbus-nand>`:'<dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13"></dev-ezbus-nand>';

                            this.innerHTML = `<dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"></dev-ezbus-nand><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"></dev-ezbus-nand><dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="wps-w15-i13"></dev-ezbus-nand>${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-xor', EzbusXor);

                    class EzbusNxor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNxor(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNxor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNxor() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<dev-ezbus-not data-i="wps-w15-o12" data-o="${this.dataO}"></dev-ezbus-not>`:'<dev-ezbus-not data-i="wps-w15-o12"></dev-ezbus-not>';
                            
                            this.innerHTML = `<dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"></dev-ezbus-nand><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"></dev-ezbus-nand><dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="wps-w15-i13"></dev-ezbus-nand><dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13" data-o="wps-w15-i12"></dev-ezbus-nand>${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nxor', EzbusNxor);

                    class EzbusNormalForm1011 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNormalForm1011(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm1011();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm1011() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?`<dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i15"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not>';
                            const o = this.dataO?`<dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="${this.dataO}"></dev-ezbus-nand>`:`<dev-ezbus-nand${i0} data-i1="wps-w15-o15"></dev-ezbus-nand>`;

                            this.innerHTML = `${i1}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-1011', EzbusNormalForm1011);

                    class EzbusNormalForm1101 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNormalForm1101(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm1101();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm1101() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?`<dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not>';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="${this.dataO}"></dev-ezbus-nand>`:`<dev-ezbus-nand data-i0="wps-w15-o15"${i1}></dev-ezbus-nand>`;

                            this.innerHTML = `${i0}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-1101', EzbusNormalForm1101);

                    class EzbusNormalForm0010 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNormalForm0010(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm0010();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm0010() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?`<dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"></dev-ezbus-not>`:'<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not>';
                            const i1 = this.dataI1?`<dev-ezbus-nand data-i0="wps-w15-o15" data-i1="${this.dataI1}" data-o="wps-w15-i14"></dev-ezbus-nand> `:'<dev-ezbus-nand data-i0="wps-w15-o15" data-o="wps-w15-i14"></dev-ezbus-nand>';
                            const o = this.dataO?`<dev-ezbus-not data-i="wps-w15-o14" data-o="${this.dataO}"></data-ezbus-not>`:'<dev-ezbus-not data-i="wps-w15-o14"></data-ezbus-not>';

                            this.innerHTML = `${i0}${i1}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-0010', EzbusNormalForm0010);

                    class EzbusNormalForm0100 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o'];
                        }
                        
                        get dataI0() {
                            if (!this.hasAttribute('data-i0')) return;
                            return this.getAttribute('data-i0');
                        }
                        
                        set dataI0(val) {
                            this.setAttribute('data-i0', val);
                        }
                        
                        get dataI1() {
                            if (!this.hasAttribute('data-i1')) return;
                            return this.getAttribute('data-i1');
                        }
                        
                        set dataI1(val) {
                            this.setAttribute('data-i1', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupNormalForm0100(), 0);
                            this.#ALLOWattributeChangedCallback = true;
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm0100();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm0100() {
                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?`<dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i15"></dev-ezbus-not><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"></dev-ezbus-nand>`:`<dev-ezbus-not data-o="wps-w15-i15"></dev-ezbus-not><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"></dev-ezbus-nand>`;
                            const o = this.dataO?`<dev-ezbus-not data-i="wps-w15-o14" data-o="${this.dataO}></dev-ezbus-not>`:'<dev-ezbus-not data-i="wps-w15-o14"></dev-ezbus-not>'

                            this.innerHTML = `${i1}${o}`;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-0100', EzbusNormalForm0100);
			  
                    /*class Ezbus extends HTMLElement {
                    	//pass
                    }
                    
                    customElements.define('dev-ezbus', Ezbus);*/
          }
}

customElements.define('dev-ezbus', DevEzbus);

export const devezbus_webcode = (_ => console.log('<script src="https://xunr3.github.io/devezbus.js" fetchpriority="high"></script>'));
export const devezbus_shortcode = (_ => console.log('IT CANNOT HAVE AN SHORTCODE SORRY. MAYBE IT CAN BE UPDATED SOON.....'));
