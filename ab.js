class AnimeFrameworkBoxExtension extends HTMLElement {
	  static #isFrameworkLoaded = false;
	  #break_orderd = true;

  	constructor() {
	    	super();
		    if (AnimeFrameworkBoxExtension.#isFrameworkLoaded) {
			      throw new Error("[AnimeFrameworkBoxExtension Error] <anime-framework-box-extension> component can loaded only once.");
		    }
		    AnimeFrameworkBoxExtension.#isFrameworkLoaded = true;
		    this.#break_orderd = false;
	  }
    
	  connectedCallback() {
		    if (this.#break_orderd) return;
		    this.innerHTML = `
<script src="https://xunr3.github.io/af.js" fetchpriority="high"></script>
<anime-framework></anime-framework>
<style>
  @import url("https://xunr3.github.io/ab.css");
  @layer usingAfCheck, usingAb;
  @layer usingAfCheck{
	  anime-framework-box-extension {
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

        class AnimeBox extends HTMLElement {
            #style = "";
            #class = "anime-box-class anime-box-input-target";
            #width = null;
            #height = null;
            #ALLOWattributeChangedCallback = null;
        
            connectedCallback() {
                setTimeout(() => {
                    if (this.width) this.#genSize(true, this.width);
                    if (this.height) this.#genSize(false, this.height);
                    if (this.animeInputTargeting) this.#changeStyle(false, true);
                    if (this.animeColoring) this.#changeStyle(true, true);
                    this.#changeStyle(null, false);
                    this.#appSize(false);
                    if (this.animeBoxBordering) this.#animeBoxBordering(true);
                    this.#ALLOWattributeChangedCallback = true;
                }, 0);
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
                if (this.#ALLOWattributeChangedCallback) {
                    let flag = false;
                    switch (name) {
                        case 'width':
                            flag = true;
                            /* falls through */
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
                          /* falls through */
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
            }
        
            #animeBoxBordering(dose_it) {
                if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = false;
                if (dose_it) {
                    const boxBorder = Object.assign(document.createElement('fieldset'), {className: this.#class, innerHTML: this.innerHTML});
                    this.removeAttribute("class");
                    
                    if (this.#style) {
                        Object.assign(boxBorder.style, {cssText: this.#style})
                        this.removeAttribute("style");
                    }
        
                    this.innerHTML = "";
                    this.appendChild(boxBorder);
                } else {
                    const boxBorder = this.querySelector("fieldset");
                    if (this.#style) this.setAttribute("style", this.#style);
                    this.setAttribute("class", this.#class);
                    this.innerHTML = boxBorder.innerHTML;
                }
                if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = true;
            }
        
            #changeStyle(mode, argument) {
                if (mode === null) {
                    if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = false;
                    (argument?this.querySelector("fieldset"):this).setAttribute("class", this.#class);
                    if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = true;
                } else if (mode) { //it's doColoring mode bool
                    if (argument) {
                        this.#class = this.#class.replace(`anime-box-${this.animeInputTargeting?"anime-":""}input-target`, `anime-box-coloringed-${this.animeInputTargeting?"anime-":""}input-target`);
                    } else {
                        this.#class = this.#class.replace(`anime-box-coloringed-${this.animeInputTargeting?"anime-":""}input-target`, `anime-box-${this.animeInputTargeting?"anime-":""}input-target`);
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
                    this.#height = value;
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
                if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = false;
                const elem = isBoxBordered?this.querySelector("fieldset"):this;
                if (this.#style) {
                    elem.setAttribute("style", this.#style);
                } else {
                    if (elem.hasAttribute("style")) elem.removeAttribute("style");
                }
                if (this.#ALLOWattributeChangedCallback !== null) this.#ALLOWattributeChangedCallback = true;
            }
        }

    		customElements.define('anime-box', AnimeBox);
	  }
}

customElements.define('anime-framework-box-extension', AnimeFrameworkBoxExtension);

const ab_shortcode = (_ => console.log('<script src="data:text/javascript;base64,Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbmltZS1mcmFtZXdvcmstYm94LWV4dGVuc2lvbicsY2xhc3MgYSBleHRlbmRzIEhUTUxFbGVtZW50e3N0YXRpYyAjYj1mYWxzZTsjYz1mYWxzZTtjb25zdHJ1Y3Rvcigpe3N1cGVyKCk7YS4jYiYmKF89Pnt0aHJvdyBuZXcgRXJyb3IoIltBbmltZUZyYW1ld29ya0JveEV4dGVuc2lvbiBFcnJvcl0gPGFuaW1lLWZyYW1ld29yay1ib3gtZXh0ZW5zaW9uPiBjb21wb25lbnQgY2FuIGxvYWRlZCBvbmx5IG9uY2UuIik7fSkoKTthLiNiPXRydWU7dGhpcy4jYz10cnVlO31jb25uZWN0ZWRDYWxsYmFjaygpe3RoaXMuI2MmJihfPT57dGhpcy5pbm5lckhUTUw9JzxzY3JpcHQgc3JjPSJkYXRhOnRleHQvamF2YXNjcmlwdDtiYXNlNjQsWTNWemRHOXRSV3hsYldWdWRITXVaR1ZtYVc1bEtDZGhibWx0WlMxbWNtRnRaWGR2Y21zbkxHTnNZWE56SUdFZ1pYaDBaVzVrY3lCSVZFMU1SV3hsYldWdWRIdHpkR0YwYVdNZ0kySWdQU0JtWVd4elpUc2pZeUE5SUdaaGJITmxPMk52Ym5OMGNuVmpkRzl5S0NsN2MzVndaWElvS1R0aExpTmlKaVlvWHowK2UzUm9jbTkzSUc1bGR5QkZjbkp2Y2lnaVcwRnVhVzFsUm5KaGJXVjNiM0pySUVWeWNtOXlYU0E4WVc1cGJXVXRabkpoYldWM2IzSnJQaUJqYjIxd2IyNWxiblFnWTJGdUlHeHZZV1JsWkNCdmJteDVJRzl1WTJVdUlpazdmU2tvS1R0aExpTmlQWFJ5ZFdVN2RHaHBjeTRqWXoxMGNuVmxPMzFqYjI1dVpXTjBaV1JEWVd4c1ltRmpheWdwZTNSb2FYTXVJMk1tSmloZlBUNTdkR2hwY3k1cGJtNWxja2hVVFV3OUp6eHpkSGxzWlQ1QWFXMXdiM0owSUhWeWJDZ2lVVWQ0YUdWWFZubEpSMUpzV20xc2RWcFZSbTFSTW1oc1dUSnpjMlJZVG5CaWJXUkNXbXRPYjFwWFRuSlBNRUp6V1Zoc2JHTnBRbXRhVjFwd1ltMVdRbHByVG05YVYwNXlaVEJDY2xwWWJHMWpiVVowV2xoTloySlhSbkphVlU1dldsZE9jbVY2UVd4bE0yOTBZVmMxYTFwWVp6Wk5WSFE1VFZSQmQwcFlkRFpNVjJ4MVdrZFdORTlxUlRkbVdERkJZVEpXTlZwdVNtaGlWMVo2U1VjeGFHRXlWbFppYlU1dldsZE9jbVY2UVd4bE0yOTBZVmMxYTFwWVp6Wk5WSFE1VFZSQmQwcFlkRFpNVjJ4MVdrZFdORTlxUlRkbVdERTVJaWs3WVc1cGJXVXRabkpoYldWM2IzSnJlMlJwYzNCc1lYazZZbXh2WTJzaGFXMXdiM0owWVc1ME8zZHBaSFJvT2pBaGFXMXdiM0owWVc1ME8yaGxhV2RvZERvd0lXbHRjRzl5ZEdGdWREdHZkbVZ5Wm14dmR6cG9hV1JrWlc0aGFXMXdiM0owWVc1ME8zWnBjMmxpYVd4cGRIazZhR2xrWkdWdUlXbHRjRzl5ZEdGdWREdHdiMmx1ZEdWeUxXVjJaVzUwY3pwdWIyNWxJV2x0Y0c5eWRHRnVkRHQxYzJWeUxYTmxiR1ZqZERwdWIyNWxJV2x0Y0c5eWRHRnVkRHQ5UEM5emRIbHNaVDRuTzJOMWMzUnZiVVZzWlcxbGJuUnpMbVJsWm1sdVpTZ25ZVzVwYldVdGFXNXdkWFFuTEdOc1lYTnpJR1Y0ZEdWdVpITWdTRlJOVEVWc1pXMWxiblI3WTI5dWJtVmpkR1ZrUTJGc2JHSmhZMnNvS1h0MGFHbHpMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMkZ1YVcxaGRHbHZibk4wWVhKMEp5d29aU2s5UGlobExtRnVhVzFoZEdsdmJrNWhiV1U5UFQwaWJXRnJaVU5vWldOcklpay9kR2hwY3k1amFHVmphMlZrUFhSeWRXVTZLR1V1WVc1cGJXRjBhVzl1VG1GdFpUMDlQU0p0WVd0bFZXNWphR1ZqYXlJcFAzUm9hWE11WTJobFkydGxaRDFtWVd4elpUcDFibVJsWm1sdVpXUXBPMzFuWlhRZ1kyaGxZMnRsWkNncGUzSmxkSFZ5YmlCMGFHbHpMbWhoYzBGMGRISnBZblYwWlNnblkyaGxZMnRsWkNjcE8zMXpaWFFnWTJobFkydGxaQ2gyS1h0MlAzUm9hWE11SUhObGRFRjBkSEpwWW5WMFpTZ25ZMmhsWTJ0bFpDY3NKeWNwT25Sb2FYTXVjbVZ0YjNabFFYUjBjbWxpZFhSbEtDZGphR1ZqYTJWa0p5azdmWDBwTzMwcEtDbDlmU2s3IiBmZXRjaHByaW9yaXR5PSJoaWdoIj48L3NjcmlwdD48YW5pbWUtZnJhbWV3b3JrPjwvYW5pbWUtZnJhbWV3b3JrPjxzdHlsZT5AaW1wb3J0IHVybCgiZGF0YTp0ZXh0L2NzcztiYXNlNjQsUUd4aGVXVnlJSFZ6YVc1blFXWkRhR1ZqYTNzdVlXNXBiV1V0WW05NExXTnNZWE56ZXkwdFlXNXBiV1V0WW05NExYZHBaSFJvT2pGd2VEc3RMV0Z1YVcxbExXSnZlQzFvWldsbmFIUTZOSEI0T3kwdFlXNXBiV1V0WW05NExXUnBjM0JzWVhrNmFXNXNhVzVsTFdKc2IyTnJPeTB0WVc1cGJXVXRZbTk0TFc5bVppMWpiMnh2Y2pwbmNtRjVPeTB0WVc1cGJXVXRZbTk0TFc5dUxXTnZiRzl5T25sbGJHeHZkenQ5TG1GdWFXMWxMV0p2ZUMxcGJuQjFkQzEwWVhKblpYUjdkMmxrZEdnNmRtRnlLQzB0WVc1cGJXVXRZbTk0TFhkcFpIUm9LVHRvWldsbmFIUTZkbUZ5S0MwdFlXNXBiV1V0WW05NExXaGxhV2RvZENrN1pHbHpjR3hoZVRwMllYSW9MUzFoYm1sdFpTMWliM2d0WkdsemNHeGhlU2s3ZlM1aGJtbHRaUzFpYjNndFlXNXBiV1V0YVc1d2RYUXRkR0Z5WjJWMGUzZHBaSFJvT25aaGNpZ3RMV0Z1YVcxbExXSnZlQzEzYVdSMGFDazdhR1ZwWjJoME9uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxb1pXbG5hSFFwTzJScGMzQnNZWGs2ZG1GeUtDMHRZVzVwYldVdFltOTRMV1JwYzNCc1lYa3BPMzB1WVc1cGJXVXRZbTk0TFdOdmJHOXlhVzVuWldRdGFXNXdkWFF0ZEdGeVoyVjBlM2RwWkhSb09uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxM2FXUjBhQ2s3YUdWcFoyaDBPblpoY2lndExXRnVhVzFsTFdKdmVDMW9aV2xuYUhRcE8yUnBjM0JzWVhrNmRtRnlLQzB0WVc1cGJXVXRZbTk0TFdScGMzQnNZWGtwTzJKaFkydG5jbTkxYm1RdFkyOXNiM0k2ZG1GeUtDMHRZVzVwYldVdFltOTRMVzltWmkxamIyeHZjaWs3ZlM1aGJtbHRaUzFpYjNndFkyOXNiM0pwYm1kbFpDMXBibkIxZEMxMFlYSm5aWFE2YUdGektHbHVjSFYwVzNSNWNHVTlZMmhsWTJ0aWIzaGRPbU5vWldOclpXUXBlM2RwWkhSb09uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxM2FXUjBhQ2s3YUdWcFoyaDBPblpoY2lndExXRnVhVzFsTFdKdmVDMW9aV2xuYUhRcE8yUnBjM0JzWVhrNmRtRnlLQzB0WVc1cGJXVXRZbTk0TFdScGMzQnNZWGtwTzJKaFkydG5jbTkxYm1RdFkyOXNiM0k2ZG1GeUtDMHRZVzVwYldVdFltOTRMVzl1TFdOdmJHOXlLVHQ5TG1GdWFXMWxMV0p2ZUMxamIyeHZjbWx1WjJWa0xXRnVhVzFsTFdsdWNIVjBMWFJoY21kbGRIdDNhV1IwYURwMllYSW9MUzFoYm1sdFpTMWliM2d0ZDJsa2RHZ3BPMmhsYVdkb2REcDJZWElvTFMxaGJtbHRaUzFpYjNndGFHVnBaMmgwS1R0a2FYTndiR0Y1T25aaGNpZ3RMV0Z1YVcxbExXSnZlQzFrYVhOd2JHRjVLVHRpWVdOclozSnZkVzVrTFdOdmJHOXlPblpoY2lndExXRnVhVzFsTFdKdmVDMXZabVl0WTI5c2IzSXBPMzB1WVc1cGJXVXRZbTk0TFdOdmJHOXlhVzVuWldRdFlXNXBiV1V0YVc1d2RYUXRkR0Z5WjJWME9taGhjeWhoYm1sdFpTMXBibkIxZEZ0amFHVmphMlZrWFNsN2QybGtkR2c2ZG1GeUtDMHRZVzVwYldVdFltOTRMWGRwWkhSb0tUdG9aV2xuYUhRNmRtRnlLQzB0WVc1cGJXVXRZbTk0TFdobGFXZG9kQ2s3WkdsemNHeGhlVHAyWVhJb0xTMWhibWx0TFdKdmVDMWthWE53YkdGNUtUdGlZV05yWjNKdmRXNWtMV052Ykc5eU9uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxdmJpMWpiMnh2Y2lrN2ZYMD0iKTtAbGF5ZXIgdXNpbmdBZkNoZWNrLHVzaW5nQWI7QGxheWVyIHVzaW5nQWZDaGVja3thbmltZS1mcmFtZXdvcmstYm94LWV4dGVuc2lvbntkaXNwbGF5OmJsb2NrIWltcG9ydGFudDt3aWR0aDowIWltcG9ydGFudDtoZWlnaHQ6MCFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudDt2aXNpYmlsaXR5OmhpZGRlbiFpbXBvcnRhbnQ7cG9pbnRlci1ldmVudHM6bm9uZSFpbXBvcnRhbnQ7dXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnQ7fX08L3N0eWxlPic7Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhbmltZS1ib3gnLGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnR7I2Q9IiI7I2U9ImFuaW1lLWJveC1jbGFzcyBhbmltZS1ib3gtaW5wdXQtdGFyZ2V0Ijsjdz1udWxsOyNoPW51bGw7I2Y9bnVsbDtjb25uZWN0ZWRDYWxsYmFjaygpe3NldFRpbWVvdXQoXz0+e3RoaXMud2lkdGgmJnRoaXMuI2codHJ1ZSx0aGlzLndpZHRoKTt0aGlzLmhlaWdodCYmdGhpcy4jZyhmYWxzZSx0aGlzLmhlaWdodCk7dGhpcy5hbmltZUlucHV0VGFyZ2V0aW5nJiZ0aGlzLiN4KGZhbHNlLHRydWUpO3RoaXMuYW5pbWVDb2xvcmluZyYmdGhpcy4jeCh0cnVlLHRydWUpO3RoaXMuI3gobnVsbCxmYWxzZSk7dGhpcy4jcyhmYWxzZSk7dGhpcy5hbmltZUJveEJvcmRlcmluZyYmdGhpcy4jeSh0cnVlKTt0aGlzLiNmID0gdHJ1ZTt9LDApO31zdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpe3JldHVyblsnd2lkdGgnLCdoZWlnaHQnLCdhbmltZS1pbnB1dC10YXJnZXRpbmcnLCdhbmltZS1ib3gtYm9yZGVyaW5nJywnYW5pbWUtY29sb3JpbmcnXTt9Z2V0IGFuaW1lSW5wdXRUYXJnZXRpbmcoKXtyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2FuaW1lLWlucHV0LXRhcmdldGluZycpO31zZXQgYW5pbWVJbnB1dFRhcmdldGluZyh2KXt2P3RoaXMuc2V0QXR0cmlidXRlKCdhbmltZS1pbnB1dC10YXJnZXRpbmcnLCcnKTp0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYW5pbWUtaW5wdXQtdGFyZ2V0aW5nJyk7fWdldCBhbmltZUJveEJvcmRlcmluZygpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnYW5pbWUtYm94LWJvcmRlcmluZycpO31zZXQgYW5pbWVCb3hCb3JkZXJpbmcodil7dj90aGlzLnNldEF0dHJpYnV0ZSgnYW5pbWUtYm94LWJvcmRlcmluZycsJycpOnRoaXMucmVtb3ZlQXR0cmlidXRlKCdhbmltZS1ib3gtYm9yZGVyaW5nJyk7fWdldCBhbmltZUNvbG9yaW5nKCl7cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdhbmltZS1jb2xvcmluZycpO31zZXQgYW5pbWVDb2xvcmluZyh2KXt2P3RoaXMuc2V0QXR0cmlidXRlKCdhbmltZS1jb2xvcmluZycsJycpOnRoaXMucmVtb3ZlQXR0cmlidXRlKCdhbmltZS1jb2xvcmluZycpO31nZXQgd2lkdGgoKXtyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3dpZHRoJyk/dGhpcy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyk6dW5kZWZpbmVkO31zZXQgd2lkdGgodil7dGhpcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx2KTt9Z2V0IGhlaWdodCgpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnaGVpZ2h0Jyk/dGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpOnVuZGVmaW5lZDt9c2V0IGhlaWdodCh2KXt0aGlzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx2KTt9YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGssbyxuKXt0aGlzLiNmJiYoXz0+e2xldCBmPWZhbHNlO2NvbnN0W3AscV09WyhvfHxuKSwoKCFvKSYmbildO3N3aXRjaChrKXtjYXNlJ3dpZHRoJzpmPXRydWU7Y2FzZSdoZWlnaHQnOnAmJihfPT57Zj90aGlzLiNyKGYpOm4/dGhpcy4jZyhmLG4pOm4/KChvIT09bikmJnRoaXMuI3ooZixuKSk7dGhpcy4jcyh0aGlzLmFuaW1lQm94Qm9yZGVyaW5nKTt9KSgpO2JyZWFrO2Nhc2UnYW5pbWUtY29sb3JpbmcnOmY9dHJ1ZTtjYXNlJ2FuaW1lLWlucHV0LXRhcmdldGluZyc6cCYmKF89Pnt0aGlzLiN4KGYscTt0aGlzLiN4KG51bGwsdGhpcy5hbmltZUJveEJvcmRlcmluZyk7fSkoKTticmVhaztjYXNlJ2FuaW1lLWJveC1ib3JkZXJpbmcnOnAmJnRoaXMuI3kocSk7YnJlYWs7fX0pKCk7fSN5KHApeyh0aGlzLiNmIT09bnVsbCkmJnRoaXMuI2Y9ZmFsc2U7KHA/KF89PnsoYj0+e3RoaXMucmVtb3ZlQXR0cmlidXRlKCJjbGFzcyIpO3RoaXMuI2QmJihfPT57T2JqZWN0LmFzc2lnbihiLnN0eWxlLHtjc3NUZXh0OnRoaXMuI2R9KTt0aGlzLnJlbW92ZUF0dHJpYnV0ZSgic3R5bGUiKTt9KSgpO3RoaXMuaW5uZXJIVE1MID0gIiI7dGhpcy5hcHBlbmRDaGlsZChiKTt9KShPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZWxkc2V0Jykse2NsYXNzTmFtZTp0aGlzLiNlLGlubmVySFRNTDp0aGlzLmlubmVySFRNTH0pKTt9KTooXz0+eyh0aGlzLiNkKSYmdGhpcy5zZXRBdHRyaWJ1dGUoInN0eWxlIix0aGlzLiNkKTt0aGlzLnNldEF0dHJpYnV0ZSgiY2xhc3MiLHRoaXMuI2UpO3RoaXMuaW5uZXJIVE1MPXRoaXMucXVlcnlTZWxlY3RvcigiZmllbGRzZXQiKS5pbm5lckhUTUw7fSkpKCk7KHRoaXMuI2YhPT1udWxsKSYmdGhpcy4jZj10cnVlO30jeChtLGEpeygobT09PW51bGwpPyhfPT57KHRoaXMuI2YhPT1udWxsKSYmdGhpcy4jZj1mYWxzZTsoYT90aGlzLnF1ZXJ5U2VsZWN0b3IoImZpZWxkc2V0Iik6dGhpcykuc2V0QXR0cmlidXRlKCJjbGFzcyIsdGhpcy4jZSk7KHRoaXMuI2YhPT1udWxsKSYmdGhpcy4jZj10cnVlO30pOm0/KD0+e3RoaXMuI2U9YT90aGlzLiNlLnJlcGxhY2UoYGFuaW1lLWJveC0ke3RoaXMuYW5pbWVJbnB1dFRhcmdldGluZz8iYW5pbWUtIjoiIn1pbnB1dC10YXJnZXRgLGBhbmltZS1ib3gtY29sb3JpbmdlZC0ke3RoaXMuYW5pbWVJbnB1dFRhcmdldGluZz8iYW5pbWUtIjoiIn1pbnB1dC10YXJnZXRgKTp0aGlzLiNlLnJlcGxhY2UoYGFuaW1lLWJveC1jb2xvcmluZ2VkLSR7dGhpcy5hbmltZUlucHV0VGFyZ2V0aW5nPyJhbmltZS0iOiIifWlucHV0LXRhcmdldGAsYGFuaW1lLWJveC0ke3RoaXMuYW5pbWVJbnB1dFRhcmdldGluZz8iYW5pbWUtIjoiIn1pbnB1dC10YXJnZXRgKTt9KTooXz0+e3RoaXMuI2U9YT90aGlzLiNlLnJlcGxhY2UoImFuaW1lLWJveC1pbnB1dC10YXJnZXQiLCJhbmltZS1ib3gtYW5pbWUtaW5wdXQtdGFyZ2V0Iik6dGhpcy4jZS5yZXBsYWNlKCJhbmltZS1ib3gtYW5pbWUtaW5wdXQtdGFyZ2V0IiwiYW5pbWUtYm94LWlucHV0LXRhcmdldCIpO30pKSgpO30jcihwKXsocD8oXz0+e3RoaXMuI2Q9dGhpcy4jZC5yZXBsYWNlKGAtLWFuaW1lLWJveC13aWR0aDogJHt0aGlzLiN3fTtgLCIiKTt0aGlzLiN3PW51bGw7fSk6KF89Pnt0aGlzLiNkPXRoaXMuI2QucmVwbGFjZShgLS1hbmltZS1ib3gtaGVpZ2h0OiAke3RoaXMuI2h9O2AsIiIpO3RoaXMuI2g9bnVsbDt9KSkoKTt9I2cocCx2KXsocD4oXz0+e3RoaXMuI2QrPWAtLWFuaW1lLWJveC13aWR0aDogJHt2fTtgO3RoaXMuI3c9djt9KTooXz0+e3RoaXMuI2QrPWAtLWFuaW1lLWJveC1oZWlnaHQ6ICR7dn07YDt0aGlzLiNoPXY7fSkpKCk7fSN6KHAsdil7KHA/KF89Pnt0aGlzLiNkPXRoaXMuI2QucmVwbGFjZShgdGg6ICR7dGhpcy4jd31gLGB0aDogJHt2fWApO3RoaXMuI3c9djt9KTooXz0+e3RoaXMuI2Q9dGhpcy4jZC5yZXBsYWNlKGBodDogJHt0aGlzLiNofWAsYGh0OiAke3Z9YCk7dGhpcy4jaD12O30pKSgpO30jcyhwKXsodGhpcy4jZiE9PW51bGwpJiZ0aGlzLiNmPWZhbHNlOyhlPT50aGlzLiNkP2Uuc2V0QXR0cmlidXRlKCJzdHlsZSIsdGhpcy4jZCk6KGUuaGFzQXR0cmlidXRlKCJzdHlsZSIpJiZlLnJlbW92ZUF0dHJpYnV0ZSgic3R5bGUiKSkpKHA/dGhpcy5xdWVyeVNlbGVjdG9yKCJmaWVsZHNldCIpOnRoaXMpOyh0aGlzLiNmIT09bnVsbCkmJnRoaXMuI2Y9dHJ1ZTt9fSk7fSkoKTt9fSk7" fetchpriority="high"></script>'));
const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));
