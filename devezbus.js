async function loadbus() {
    try {
        const module = await import('https://xunr3.github.io/bus.js');
    } catch (error) {
        console.error('faild to load bus.js', error);
    }
}

const swap = (_ => {[console.log, window.alert] = [window.alert, console.log.bind(console)];});
const rollback = (_ => {[console.log, window.alert] = [window.alert.bind(console), console.log];});
const log2alert = (f => {swap(); f(); alert();});

class DevEzbus extends HTMLElement {
          static #isFrameworkLoaded = false;
          #break_orderd = true;

          constructor() {
                    super();
                    if (BusInit.#isFrameworkLoaded) {
                              throw new Error("[DevEzbus Error] <dev-ezbus> component can loaded only once.");
                    }
                    BusInit.#isFrameworkLoaded = true;
                    this.#break_orderd = false;
          }

          connectedCallback() {
                    if (this.#break_orderd) return;
                    loadbus();
                    this.innerHTML = `
<bus-init></bus-init>
<style>
    @import url("https://xunr3.github.io/bus.css");
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
                    
                    class Ezbus extends HTMLElement {
                    	//pass
                    }
                    
                    customElements.define('dev-ezbus', Ezbus);
                    
                    class EzbusBox extends HTMLElement {
                        #box = null;
                        #ALLOWattributeChangedCallback = null;
                        
                        connectedCallback() {
                            setTimeout(() => {
                            	this.#box = Object.assign(document.createElement('anime-box'), {innerHTML: this.innerHTML});
                            	this.innerHTML = "";
                	            this.appendChild(this.#box);
                            	this.#box = this.querySelector('anime-box');
                            	this.#compileAttribute();
                                this.#ALLOWattributeChangedCallback = true;
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
                            if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = false;
                            if (this.width) {
                                this.#setupWidth();
                            } else {
                                this.#removeWidth();
                            };
                            if (this.height) {
                                this.#setupHeight();
                            } else {
                                this.#removeHeight();
                            };
                            this.#setupNonCheckbox();
                            if (this.debugMode) {
                            	this.#setupDetecterOn(true);
                            } else {
                                this.#setupDetecterOn(this.detecterOn);
                            }
                            if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = true;
                        }
                        
                        attributeChangedCallback(name, oldValue, newValue) {
                            this.#compileAttribute();
                        }
                        
                        #setupWidth() {
                            this.#box.width = this.width;
                        }
                        
                        #removeWidth() {
                        	this.#box.removeAttribute("width");
                        }
                        
                        #setupHeight() {
                            this.#box.height = this.height;
                        }
                        
                        #removeHeight() {
                        	this.#box.removeAttribute("height");
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
                <dev-ezbus-alert-anime-ab></dev-ezbus-alert-ab>
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
                    
                    /*class Ezbus extends HTMLElement {
                    	//pass
                    }
                    
                    customElements.define('dev-ezbus', Ezbus);*/
          }
}

customElements.define('dev-ezbus', DevEzbus);

const devezbus_webcode = (_ => console.log('<script src="https://xunr3.github.io/devezbus.js" fetchpriority="high"></script>'));