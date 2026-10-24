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
    @import url("https://xunr3.github.io/devezbus.css");
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
                <dev-ezbus-alert-af></dev-ezbus-alert-af>
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
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                let result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    if (k !== "" && typeof v !== 'string') {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target of nand is wrong format. it must be string array of json (when not nand : multidimensional array) (tip : NON-STRING)");
                                    }
                                    return v;
                                });
                                if (!Array.isArray(result)) {
                                    flag = null;
                                    console.trace();
                                    throw new Error('debug-target of nand is wrong format. it must be string array of json (when not nand : multidimensional array) (TIP : NON-ARRAY-JSON)');
                                }
                                result = {
                                    i0: result.includes("i0"),
                                    i1: result.includes("i1"),
                                    o: result.includes("o")
                                };
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target of nand is wrong format. it must be string array of json (when not nand : multidimensional array) (tip : NON-${(flag===null)?'ARRAY-JSON':flag?'STRING':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNand();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNand() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]";

                            const state = this.debugTarget || {i0: false, i1: false, o: false};
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("nand-gate"))) this.setAttribute("class", classv?`${classv} nand-gate`:"nand-gate");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            let i0 = this.dataI0?` ${this.dataI0}`:'';
                            let i1 = this.dataI1?` ${this.dataI1}`:'';
                            let o = this.dataO?` ${this.dataO}`:'';
                            
                            i0 = `<dev-ezbus-box class="devezbus-debugbox" non-checkbox${state.i0?' debug-mode':''}><p class="devezbus-debughint"> (nand) i0 : </p><anime-input class="nand-gate-i0${i0}"></anime-input></dev-ezbus-box>`;
                            i1 = `<dev-ezbus-box class="devezbus-debugbox" non-checkbox${state.i1?' debug-mode':''}><p class="devezbus-debughint"> (nand) i1 : </p><anime-input class="nand-gate-i1${i1}"></anime-input></dev-ezbus-box>`;
                            o = `<dev-ezbus-box class="devezbus-debugbox" non-checkbox${state.o?' debug-mode':''}><p class="devezbus-debughint"> (nand) o : </p><anime-input class="nand-gate-o${o}"></anime-input></dev-ezbus-box>`;
                            this.innerHTML = `<div class="debug-calm-box">${i0}${i1}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nand', EzbusNand);

                    class EzbusNot extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                return JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's not ... only 0 index is used, after one is ignored) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                	if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's not ... only 0 index is used, after one is ignored) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's not ... only 0 index is used, after one is ignored) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag==undefined)?'ARRAY-JSON':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNot();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNot() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]";
                            
                            const state = (this.debugTarget || ['[]'])[0] || '[]';
                            const isDebugMode = (state==='[]');
                            const debugtarget = isDebugMode?'':` debug-target="${state}"`;
                            const debugMarkup = isDebugMode?'':' devezbus-debugpanel-on';
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            let i = this.dataI?` data-i0="${this.dataI}" data-i1="${this.dataI}"`:'';
                            let o = this.dataO?` data-o="${this.dataO}"`:'';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup}><p  class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> not(x) = nand(x, x) : </p><dev-ezbus-nand${i}${o}${debugtarget}></dev-ezbus-nand></div></div>`; this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-not', EzbusNot);

                    class EzbusAnd extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's and ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's and ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 2) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's and ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
								}
								return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's and ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupAnd();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupAnd() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]]";
                            
                            const state = this.debugTarget || ['[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');

                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            let i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            let i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            let o = this.dataO?` data-o="${this.dataO}"`:'';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (and) wps-w15-i15 = nand(i0, i1)-o : </p><dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (and) o = not(wps-w15-o15) : </p><dev-ezbus-not data-i="wps-w15-o15"${o}${debugtarget[1]}></dev-ezbus-not></div></div>`; this. #ALLOWattributeChangedCallback = false;
                        }
                    }
                    
                    customElements.define('dev-ezbus-and', EzbusAnd);

                    class EzbusOr extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's or ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's or ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 3) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's or ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                                }
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's or ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupOr();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupOr() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]";
                            
                            const state = this.debugTarget || ['[[]]', '[[]]', '[]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');

                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (or) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (or) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`;
                            const i1 = this.dataI1?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (or) wps-w15-i14 = not(i0) : </p><dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (or) wps-w15-i14 = not(i0) : </p><dev-ezbus-not data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-not></div>`;
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (or) o = nand(wps-w15-o15, wps-w15-o14)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14" data-o="${this.dataO}"${debugtarget[2]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (or) o = nand(wps-w15-o15, wps-w15-o14)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14"${debugtarget[2]}></dev-ezbus-nand></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i0}${i1}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-or', EzbusOr);

                    class EzbusNor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's nor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's nor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 4) {
                                    flag = null;
                                    console.trace();
									throw new Error("debug-target (but isn't nand, it's nor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                                }
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's nor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNor() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]]";
                            
                            const state = this.debugTarget || ['[[]]', '[[]]', '[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`;
                            const i1 = this.dataI1?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) wps-w15-i14 = not(i1) : </p><dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) wps-w15-i14 = not(i1) : </p><dev-ezbus-not data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-not></div>`;
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) o = not(wps-w15-o13) : </p><dev-ezbus-not data-i="wps-w15-o13" data-o="${this.dataO}"${debugtarget[3]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nor) o = not(wps-w15-o13) : </p><dev-ezbus-not data-i="wps-w15-o13"${debugtarget[3]}></dev-ezbus-not></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i0}${i1}<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (not) wps-w15-i13 = nand(wps-w15-o15, wps-w15-o14)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15" data-i1="wps-w15-o14" data-o="wps-w15-i13"${debugtarget[2]}></dev-ezbus-nand></div>${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nor', EzbusNor);

                    class EzbusXor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's xor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's xor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 4) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's xor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
								}
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's xor ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupXor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupXor() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]";
                            
                            const state = this.debugTarget || ['[]', '[]', '[]', '[]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (xor) o = nand(wps-w15-o14, wps-w15-o13)-o : </p><dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13" data-o="${this.dataO}"${debugtarget[3]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (xor) o = nand(wps-w15-o14, wps-w15-o13)-o : </p><dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13"${debugtarget[3]}></dev-ezbus-nand></div>`;

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (xor) wps-w15-i15 = nand(i0, i1)-o : </p><dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (xor) wps-w15-i14 = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (xor) wps-w15-i13 = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="wps-w15-i13"${debugtarget[2]}></dev-ezbus-nand></div>${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-xor', EzbusXor);

                    class EzbusNxor extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's nxor ... length must be 5) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's nxor ... length must be 5) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 5) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's nxor ... length must be 5) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
								}
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's nxor ... length must be 5) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNxor();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNxor() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]]";
                            
                            const state = this.debugTarget || ['[]', '[]', '[]', '[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[4]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nxor) o = not(wps-w15-o12) : </p><dev-ezbus-not data-i="wps-w15-o12" data-o="${this.dataO}"${debugtarget[4]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[4]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nxor) o = not(wps-w15-o12) : </p><dev-ezbus-not data-i="wps-w15-o12"${debugtarget[4]}></dev-ezbus-not></div>`;
                            
                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nxor) wps-w15-i15 = nand(i0, i1)-o : </p><dev-ezbus-nand${i0}${i1} data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nxor) wps-w15-i14 = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nxor) wps-w15-i13 = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="wps-w15-i13"${debugtarget[2]}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nxor) wps-w15-i12 = nand(wps-w15-o13, wps-w15-o13)-o : </p><dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o13" data-o="wps-w15-i12"${debugtarget[3]}></dev-ezbus-nand>${o}</div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-nxor', EzbusNxor);

                    class EzbusNormalForm1011 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-1011 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-1011 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 2) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's normal-form-1011 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
								}
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's normal-form-1011 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm1011();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm1011() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]";
                            
                            const state = this.debugTarget || ['[[]]', '[]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf1011) wps-w15-i15 = not(i1) : </p><dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf1011) wps-w15-i15 = not(i1) : </p><dev-ezbus-not data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`;
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf1011) o = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand${i0} data-i1="wps-w15-o15" data-o="${this.dataO}"${debugtarget[1]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf1011) o = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand${i0} data-i1="wps-w15-o15"${debugtarget[1]}></dev-ezbus-nand></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i1}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-1011', EzbusNormalForm1011);

                    class EzbusNormalForm1101 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-1101 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-1101 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 2) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's normal-form-1101 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                                }
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's normal-form-1101 ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm1101();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm1101() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]";
                            
                            const state = this.debugTarget || ['[[]]', '[]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf1101) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-i="${this.dataI0}" data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf1101) wps-w15-i15 = not(i0) : </p><dev-ezbus-not data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div>`;
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf1101) o = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15"${i1} data-o="${this.dataO}"${debugtarget[1]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf1101) o = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15"${i1}${debugtarget[1]}></dev-ezbus-nand></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i0}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-1101', EzbusNormalForm1101);

                    class EzbusNormalForm0010 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-0010 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-0010 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 3) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's normal-form-0010 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                                }
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's normal-form-0010 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm0010();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm0010() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]]";
                            
                            const state = this.debugTarget || ['[[]]', '[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i1 = this.dataI1?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0010) wps-w15-i15 = not(i1) : </p><dev-ezbus-not data-i="${this.dataI1}" data-o="wps-w15-i15"${debugtarget[1]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0010) wps-w15-i15 = not(i1) : </p><dev-ezbus-not data-o="wps-w15-i15"${debugtarget[1]}></dev-ezbus-not></div>`;
                            const i0 = this.dataI0?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf0010) wps-w15-i14 = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand data-i1="wps-w15-o15" data-i0="${this.dataI0}" data-o="wps-w15-i14"${debugtarget[0]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf0010) wps-w15-i14 = nand(i0, wps-w15-o15)-o : </p><dev-ezbus-nand data-i1="wps-w15-o15" data-o="wps-w15-i14"${debugtarget[0]}></dev-ezbus-nand></div>`;
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0010) o = not(wps-w15-o14)-o : </p><dev-ezbus-not data-i="wps-w15-o14" data-o="${this.dataO}"${debugtarget[2]}></data-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0010) o = not(wps-w15-o14)-o : </p><dev-ezbus-not data-i="wps-w15-o14"${debugtarget[2]}></dev-ezbus-not></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i0}${i1}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-0010', EzbusNormalForm0010);

                    class EzbusNormalForm0100 extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-0100 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's normal-form-0100 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 3) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's normal-form-0100 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                                }
                                return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's normal-form-0100 ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupNormalForm0100();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupNormalForm0100() { this. #ALLOWattributeChangedCallback = false;
                            if (this.fullDebugMode) this.debugTarget = "[[[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]], [&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;], [[&quot;i0&quot;, &quot;i1&quot;, &quot;o&quot;]]]";
                            
                            const state = this.debugTarget || ['[[]]', '[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => isDebugMode[i]?'':' devezbus-debugpanel-on');
                            
                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w15"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0100) wps-w15-i15 = not(i0) : </p><dev-ezbus-not${i0}data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf0100) wps-w15-i14 = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15" data-i1="${i1}" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-nand></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0100) wps-w15-i15 = not(i0) : </p><dev-ezbus-not4${i0} data-o="wps-w15-i15"${debugtarget[0]}></dev-ezbus-not></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan15"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan15"> (nf0100) wps-w15-i14 = nand(wps-w15-o15, i1)-o : </p><dev-ezbus-nand data-i0="wps-w15-o15" data-o="wps-w15-i14"${debugtarget[1]}></dev-ezbus-nand></div>`;
                            const o = this.dataO?`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0100) o = not(wps-w15-o14)-o : </p><dev-ezbus-not data-i="wps-w15-o14" data-o="${this.dataO}"${debugtarget[2]}></dev-ezbus-not></div>`:`<div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan14"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan14"> (nf0100) o = not(wps-w15-o14)-o : </p><dev-ezbus-not data-i="wps-w15-o14"${debugtarget[2]}></dev-ezbus-not></div>`;

                            this.innerHTML = `<div class="debug-calm-box">${i1}${o}</div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-normal-form-0100', EzbusNormalForm0100);

                    class EzbusHalfAdder extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
    
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-carry', 'data-sum', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's half-adder ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's half-adder ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 2) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's half-adder ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                    								}
                    								return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's half-adder ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
    
                        get dataCarry() {
                            if (!this.hasAttribute('data-carry')) return;
                            return this.getAttribute('data-carry');
                        }
    
                        set dataCarry(val) {
                            this.setAttribute('data-carry', val);
                        }
    
                        get dataSum() {
                            if (!this.hasAttribute('data-sum')) return;
                            return this.getAttribute('data-sum');
                        }
    
                        set dataSum(val) {
                            this.setAttribute('data-sum', val);
                        }
    
                        connectedCallback() {
                            setTimeout(_ => this.#setupHalfAdder(), 0);
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupHalfAdder();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupHalfAdder() { this. #ALLOWattributeChangedCallback = false;
                            const optionalFullDebugString = this.fullDebugMode?" full-debug-mode":"";
        
                            const state = this.debugTarget || ['[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => ((!this.fullDebugMode) && isDebugMode[i])?'':' devezbus-debugpanel-on');

                            const classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
        
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const carry = this.dataCarry?` data-o="${this.dataCarry}"`:'';
                            const sum = this.dataSum?` data-o="${this.dataSum}"`:'';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (half adder) carry = and(i0, i1)-o : </p><dev-ezbus-and${i0}${i1}${carry}${debugtarget[0]}${optionalFullDebugString}></dev-ezbus-and></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (half adder) sum = xor(i0, i1)-o : </p><dev-ezbus-xor${i0}${i1}${sum}${debugtarget[1]}${optionalFullDebugString}></dev-ezbus-xor></div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }

                    customElements.define('dev-ezbus-half-adder', EzbusHalfAdder);

                    class EzbusFullAdder extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
    
                        static get observedAttributes() {
                            return ['data-i0', 'data-i1', 'data-i2', 'data-carry', 'data-sum', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's full-adder ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's full-adder ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 3) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's full-adder ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                    								}
                    								return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's full-adder ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
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
    
                        get dataI2() {
                            if (!this.hasAttribute('data-i2')) return;
                            return this.getAttribute('data-i2');
                        }
    
                        set dataI2(val) {
                            this.setAttribute('data-i2', val);
                        }
    
                        get dataCarry() {
                            if (!this.hasAttribute('data-carry')) return;
                            return this.getAttribute('data-carry');
                        }
    
                        set dataCarry(val) {
                            this.setAttribute('data-carry', val);
                        }
    
                        get dataSum() {
                            if (!this.hasAttribute('data-sum')) return;
                            return this.getAttribute('data-sum');
                        }
    
                        set dataSum(val) {
                            this.setAttribute('data-sum', val);
                        }
    
                        connectedCallback() {
                            setTimeout(_ => this.#setupFullAdder(), 0);
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupFullAdder();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupFullAdder() { this. #ALLOWattributeChangedCallback = false;
                            const optionalFullDebugString = this.fullDebugMode?" full-debug-mode":"";
        
                            const state = this.debugTarget || ['[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => ((!this.fullDebugMode) && isDebugMode[i])?'':' devezbus-debugpanel-on');

                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            const p = !classv.includes("wps-w14");
                            if (p) this.setAttribute("class", classv?`${classv} wps-w14`:"wps-w14");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", (p || classv)?`${classv} debug-boxed`:"debug-boxed");
        
                            const i0 = this.dataI0?` data-i0="${this.dataI0}"`:'';
                            const i1 = this.dataI1?` data-i1="${this.dataI1}"`:'';
                            const i2 = this.dataI2?` data-i1="${this.dataI2}"`:'';
                            const carry = this.dataCarry?` data-o="${this.dataCarry}"`:'';
                            const sum = this.dataSum?` data-sum="${this.dataSum}"`:'';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan12"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan12"> (full adder) wps-w14-i14 = HA(i0, i1)-carry <br> (full adder) wps-w14-i15 = HA(i0, i1)-sum : </p><dev-ezbus-half-adder${i0}${i1} data-sum="wps-w14-i15" data-carry="wps-w14-i14"${debugtarget[0]}${optionalFullDebugString}></dev-ezbus-half-adder></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan12"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan12"> (full adder) wps-w14-i13 = HA(wps-w14-o15, i2)-carry <br> (full adder) sum = HA(wps-w14-o15, i2)-sum : </p><dev-ezbus-half-adder data-i0="wps-w14-o15"${i2}${sum} data-carry="wps-w14-i13"${debugtarget[1]}${optionalFullDebugString}></dev-ezbus-half-adder></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan12"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan12"> (full adder) carry = or(wps-w14-o14, wps-w14-o13)-carry : </p><dev-ezbus-or data-i0="wps-w14-o14" data-i1="wps-w14-o13"${carry}${debugtarget[2]}${optionalFullDebugString}></dev-ezbus-or></div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }

                    customElements.define('dev-ezbus-full-adder', EzbusFullAdder);

                    class EzbusSRLatch extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-set', 'data-reset', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's SRLatch ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's SRLatch ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 2) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's SRLatch ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                    			}
                    			return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's SRLatch ... length must be 2) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
                        }
                        
                        get dataSet() {
                            if (!this.hasAttribute('data-set')) return;
                            return this.getAttribute('data-set');
                        }
                        
                        set dataSet(val) {
                            this.setAttribute('data-set', val);
                        }
                        
                        get dataReset() {
                            if (!this.hasAttribute('data-reset')) return;
                            return this.getAttribute('data-reset');
                        }
                        
                        set dataReset(val) {
                            this.setAttribute('data-reset', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupSRLatch(), 0);
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupSRLatch();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupSRLatch() { this. #ALLOWattributeChangedCallback = false;
                            const optionalFullDebugString = this.fullDebugMode?" full-debug-mode":"";

                            const state = this.debugTarget || ['[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => ((!this.fullDebugMode) && isDebugMode[i])?'':' devezbus-debugpanel-on');

                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w14"))) this.setAttribute("class", classv?`${classv} wps-w14`:"wps-w14");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const s = this.dataSet?` data-i0="${this.dataSet}"`:'';
                            const r = this.dataReset?` data-i1="${this.dataReset}"`:'';
                            const o = this.dataO?` data-o="wps-w14-i14 ${this.dataO}"`:' data-o="wps-w14-i14"';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (nor SR Latch) wps-w14-i15 = nor(set, wps-w14-o14)-o : </p><dev-ezbus-nor${s} data-i1="wps-w14-o14" data-o="wps-w14-i15"${debugtarget[0]}${optionalFullDebugString}></dev-ezbus-nor></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (nor SR Latch) o = wps-w14-i14 = nor(wps-w14-o15, reset)-o : </p><dev-ezbus-nor data-i0="wps-w14-o15"${r}${o}${debugtarget[1]}${optionalFullDebugString}></dev-ezbus-nor></div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-srlatch', EzbusSRLatch);

                    class EzbusDLatch extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-data', 'data-enable', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's SRLatch ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's D-Latch ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 4) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's D-Latch ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                    			}
                    			return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's D-Latch ... length must be 4) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
                        }
                        
                        get dataData() {
                            if (!this.hasAttribute('data-data')) return;
                            return this.getAttribute('data-data');
                        }
                        
                        set dataData(val) {
                            this.setAttribute('data-data', val);
                        }
                        
                        get dataEnable() {
                            if (!this.hasAttribute('data-enable')) return;
                            return this.getAttribute('data-enable');
                        }
                        
                        set dataEnable(val) {
                            this.setAttribute('data-enable', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupDLatch(), 0);
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupDLatch();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupDLatch() { this. #ALLOWattributeChangedCallback = false;
                            const optionalFullDebugString = this.fullDebugMode?" full-debug-mode":"";

                            const state = this.debugTarget || ['[]', '[[]]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => ((!this.fullDebugMode) && isDebugMode[i])?'':' devezbus-debugpanel-on');
                            const optionalSRstr = ((!this.fullDebugMode) && (isDebugMode[2] || isDebugMode[3]))?['', '']:[' devezbus-debugpanel-on', ' debug-target'];

                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w14"))) this.setAttribute("class", classv?`${classv} wps-w15`:"wps-w15");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const data = this.dataData?` data-i0="${this.dataData}"`:'';
                            const enable = this.dataEnable?` data-i1="${this.dataEnable}"`:'';
                            const o = this.dataO?` ${this.dataO}`:'';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> ((nand) D Latch) wps-w15-i14 = nand(data, enable)-o : </p><dev-ezbus-nand${data}${enable} data-o="wps-w15-i14"${debugtarget[0]}${optionalFullDebugString}></dev-ezbus-nand></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> ((nand) D Latch) wps-w15-i13 = nf1101(data, enable)-o : </p><dev-ezbus-normal-form-1101${data}${enable} data-o="wps-w15-i13"${debugtarget[1]}${optionalFullDebugString}></dev-ezbus-normal-form-1101></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan12"${optionalSRstr[0]}></div><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan12"> ((nand) D Latch) o = nandsrlatch(wps-w15-o14, wps-w15-o13)-o... so, bellow is nand SR Latch (I don't think that nand srlatch is srlatch. because it dosen't satisfies it's implementation. so, srlatch tag is implemented by nor. so... bellow one is not actually tag) </p><div class="debug-boxed"${optionalSRstr[1]}><div class="debug-calm-box"><div clas="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (nand SR Latch (n.b. this is not tag)) nand SR Latch's output (i.e. output of "THAT" d-latch) = wps-w15-i12 = nand(nand SR Latch's Input 0 (i.e. wps-w15-p14), wps-w15-o11)-o : </p><dev-ezbus-nand data-i0="wps-w15-o14" data-i1="wps-w15-o11" data-o="wps-w15-i12${o}"${debugtarget[2]}${optionalFullDebugString}></dev-ezbus-nand></div><div clas="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[3]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (nand SR Latch (n.b. this is not tag)) wps-w15-i11 = nand(wps-w15-i12, nand SR Latch's Input 1 (i.e. wps-w15-p13))-o : </p><dev-ezbus-nand data-i0="wps-w15-o12" data-i1="wps-w15-o13" data-o="wps-w15-i11" full-debug-mode${debugtarget[3]}${optionalFullDebugString}></dev-ezbus-nand></div></div></div></div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-dlatch', EzbusDLatch);

                    class EzbusJKLatch extends HTMLElement {
                        #ALLOWattributeChangedCallback = null;
                        
                        static get observedAttributes() {
                            return ['data-j', 'data-k', 'data-o', 'debug-target', 'full-debug-mode'];
                        }

                        get fullDebugMode () {
                            return this.hasAttribute('full-debug-mode');
                        }

                        set fullDebugMode (value) {
                            if (value) this.setAttribute('full-debug-mode', '');
                            else if (this.hasAttribute('full-debug-mode')) this.removeAttribute('full-debug-mode');
                        }

                        get debugTarget() {
                            let flag = false;
                            if (!this.hasAttribute('debug-target')) return;
                            else if (this.getAttribute('debug-target') === "[]") return;
                            try {
                                const result = JSON.parse(this.getAttribute('debug-target').replaceAll("&quot;", '"'), (k, v) => {
                                    flag = false;
                                    if (k === "") {
                                        if (Array.isArray(v)) return v;
                                        flag = undefined;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's JKLatch ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY-JSON)");
                                    }
                                    return v;
                                }).map(child => {
                                    if (!Array.isArray(child)) {
                                        flag = true;
                                        console.trace();
                                        throw new Error("debug-target (but isn't nand, it's JKLatch ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-ARRAY)");
                                    }
                                    return JSON.stringify(child).replaceAll('"', "&quot;");
                                });
                                if (result.length !== 3) {
                                    flag = null;
                                    console.trace();
                                    throw new Error("debug-target (but isn't nand, it's JKLatch ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (TIP : NON-FIT-LENGTH)");
                    			}
                    			return result;
                            } catch (error) {
                                console.log(error.stack); console.trace();
                                console.warn(`debug-target (but isn't nand, it's JKLatch ... length must be 3) is wrong format. it must be multidimensional array of json (when nand : string array) (tip : NON-${(flag===undefined)?'ARRAY-JSON':(flag===null)?'FIT-LENGTH':flag?'ARRAY':'JSON'})`);
                                return;
                            }
                        }

                        set debugTarget(val) {
                            this.setAttribute('debug-target', val);
                        }
                        
                        get dataJ() {
                            if (!this.hasAttribute('data-j')) return;
                            return this.getAttribute('data-j');
                        }
                        
                        set dataJ(val) {
                            this.setAttribute('data-j', val);
                        }
                        
                        get dataK() {
                            if (!this.hasAttribute('data-k')) return;
                            return this.getAttribute('data-k');
                        }
                        
                        set dataK(val) {
                            this.setAttribute('data-k', val);
                        }
                        
                        get dataO() {
                            if (!this.hasAttribute('data-o')) return;
                            return this.getAttribute('data-o');
                        }
                        
                        set dataO(val) {
                            this.setAttribute('data-o', val);
                        }
                        
                        connectedCallback() {
                            setTimeout(_ => this.#setupJKLatch(), 0);
                        }

                        attributeChangedCallback(name, oldValue, newValue) {
                            if (this.#ALLOWattributeChangedCallback) {
                                this.#ALLOWattributeChangedCallback = false;
                                this.#setupJKLatch();
                                this.#ALLOWattributeChangedCallback = true;
                            }
                        }

                        #setupJKLatch() { this. #ALLOWattributeChangedCallback = false;
                            const optionalFullDebugString = this.fullDebugMode?" full-debug-mode":"";

                            const state = this.debugTarget || ['[]', '[]', '[]'];
                            const isDebugMode = state.map(e => (e==='[]' || e==='[[]]'));
                            const debugtarget = state.map((e, i) => isDebugMode[i]?'':` debug-target="${e}"`);
                            const debugMarkup = state.map((e, i) => ((!this.fullDebugMode) && isDebugMode[i])?'':' devezbus-debugpanel-on');

                            let classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("wps-w14"))) this.setAttribute("class", classv?`${classv} wps-w14`:"wps-w14");
                            classv = this.hasAttribute("class")?this.getAttribute("class"):'';
                            if (!(classv.includes("debug-boxed"))) this.setAttribute("class", classv?`${classv} debug-boxed`:"debug-boxed");
                            
                            const J = this.dataJ?` data-i0="${this.dataJ}"`:'';
                            const K = this.dataK?` data-i1="${this.dataK}"`:'';
                            const o = this.dataO?` data-o="wps-w14-i10 ${this.dataO}"`:' data-o="wps-w14-i10"';

                            this.innerHTML = `<div class="debug-calm-box"><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[0]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (J-K Latch) wps-w14-i12 = nf0100(J, wps-w14-o10)-o : </p><dev-ezbus-normal-form-0100${J} data-i1="wps-w14-o10" data-o="wps-w14-i12"${debugtarget[0]}${optionalFullDebugString}></dev-ezbus-normal-form-0100></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan13"${debugMarkup[1]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan13"> (J-K Latch) wps-w14-i11 = and(wps-w14-o10, K)-o : </p><dev-ezbus-and data-i0="wps-w14-o10"${K} data-o="wps-w14-i11"${debugtarget[1]}${optionalFullDebugString}></dev-ezbus-and></div><div class="devezbus-debugbox" devezbus-debugpanel="mod15-pan12"${debugMarkup[2]}><p class="devezbus-debughint" devezbus-debugpanel="mod15-pan12"> (J-K Latch) o = wps-w14-i10 = srlatch(wps-w14-o12, wps-w14-o11)-o : </p><dev-ezbus-srlatch data-set="wps-w14-o12" data-reset="wps-w14-o11"${o}${debugtarget[2]}${optionalFullDebugString}></dev-ezbus-srlatch></div></div>`;this.#ALLOWattributeChangedCallback = true;
                        }
                    }
                    
                    customElements.define('dev-ezbus-jklatch', EzbusJKLatch);
			  
                    /*class Ezbus extends HTMLElement {
                    	//pass
                    }
                    
                    customElements.define('dev-ezbus', Ezbus);*/
          }
}

customElements.define('dev-ezbus', DevEzbus);

export const devezbus_webcode = (_ => console.log('<script src="https://xunr3.github.io/devezbus.js" fetchpriority="high"></script>'));
export const devezbus_shortcode = (_ => console.log('IT CANNOT HAVE AN SHORTCODE SORRY. MAYBE IT CAN BE UPDATED SOON.....'));
