export async function loadaf() {
    try {
        const module = await import('https://xunr3.github.io/af.js');
		Object.assign(window, module);
    } catch (error) {
        console.error('faild to load af.js', error);
    }
}

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
            loadaf();
		    this.innerHTML = `
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

export const ab_shortcode = (_ => console.log('<script src="data:text/javascript;base64,YXN5bmMgZnVuY3Rpb24gZigpe3RyeXtjb25zdCBtPWF3YWl0IGltcG9ydCgnZGF0YTp0ZXh0L2phdmFzY3JpcHQ7YmFzZTY0LFkzVnpkRzl0Uld4bGJXVnVkSE11WkdWbWFXNWxLQ2RoYm1sdFpTMW1jbUZ0WlhkdmNtc25MR05zWVhOeklHRWdaWGgwWlc1a2N5QklWRTFNUld4bGJXVnVkSHR6ZEdGMGFXTWdJMklnUFNCbVlXeHpaVHNqWXlBOUlHWmhiSE5sTzJOdmJuTjBjblZqZEc5eUtDbDdjM1Z3WlhJb0tUdGhMaU5pSmlZb1h6MCtlM1JvY205M0lHNWxkeUJGY25KdmNpZ2lXMEZ1YVcxbFJuSmhiV1YzYjNKcklFVnljbTl5WFNBOFlXNXBiV1V0Wm5KaGJXVjNiM0pyUGlCamIyMXdiMjVsYm5RZ1kyRnVJR3h2WVdSbFpDQnZibXg1SUc5dVkyVXVJaWs3ZlNrb0tUdGhMaU5pUFhSeWRXVTdkR2hwY3k0all6MTBjblZsTzMxamIyNXVaV04wWldSRFlXeHNZbUZqYXlncGUzUm9hWE11STJNbUppaGZQVDU3ZEdocGN5NXBibTVsY2toVVRVdzlKenh6ZEhsc1pUNUFhVzF3YjNKMElIVnliQ2dpVVVkNGFHVlhWbmxKUjFKc1dtMXNkVnBWUm0xUk1taHNXVEp6YzJSWVRuQmliV1JDV210T2IxcFhUbkpQTUVKeldWaHNiR05wUW10YVYxcHdZbTFXUWxwclRtOWFWMDV5WlRCQ2NscFliRzFqYlVaMFdsaE5aMkpYUm5KYVZVNXZXbGRPY21WNlFXeGxNMjkwWVZjMWExcFlaelpOVkhRNVRWUkJkMHBZZERaTVYyeDFXa2RXTkU5cVJUZG1XREZCWVRKV05WcHVTbWhpVjFaNlNVY3hhR0V5VmxaaWJVNXZXbGRPY21WNlFXeGxNMjkwWVZjMWExcFlaelpOVkhRNVRWUkJkMHBZZERaTVYyeDFXa2RXTkU5cVJUZG1XREU1SWlrN1lXNXBiV1V0Wm5KaGJXVjNiM0pyZTJScGMzQnNZWGs2WW14dlkyc2hhVzF3YjNKMFlXNTBPM2RwWkhSb09qQWhhVzF3YjNKMFlXNTBPMmhsYVdkb2REb3dJV2x0Y0c5eWRHRnVkRHR2ZG1WeVpteHZkenBvYVdSa1pXNGhhVzF3YjNKMFlXNTBPM1pwYzJsaWFXeHBkSGs2YUdsa1pHVnVJV2x0Y0c5eWRHRnVkRHR3YjJsdWRHVnlMV1YyWlc1MGN6cHViMjVsSVdsdGNHOXlkR0Z1ZER0MWMyVnlMWE5sYkdWamREcHViMjVsSVdsdGNHOXlkR0Z1ZER0OVBDOXpkSGxzWlQ0bk8yTjFjM1J2YlVWc1pXMWxiblJ6TG1SbFptbHVaU2duWVc1cGJXVXRhVzV3ZFhRbkxHTnNZWE56SUdWNGRHVnVaSE1nU0ZSTlRFVnNaVzFsYm5SN1kyOXVibVZqZEdWa1EyRnNiR0poWTJzb0tYdDBhR2x6TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJGdWFXMWhkR2x2Ym5OMFlYSjBKeXdvWlNrOVBpaGxMbUZ1YVcxaGRHbHZiazVoYldVOVBUMGliV0ZyWlVOb1pXTnJJaWsvZEdocGN5NWphR1ZqYTJWa1BYUnlkV1U2S0dVdVlXNXBiV0YwYVc5dVRtRnRaVDA5UFNKdFlXdGxWVzVqYUdWamF5SXBQM1JvYVhNdVkyaGxZMnRsWkQxbVlXeHpaVHAxYm1SbFptbHVaV1FwTzMxblpYUWdZMmhsWTJ0bFpDZ3BlM0psZEhWeWJpQjBhR2x6TG1oaGMwRjBkSEpwWW5WMFpTZ25ZMmhsWTJ0bFpDY3BPMzF6WlhRZ1kyaGxZMnRsWkNoMktYdDJQM1JvYVhNdUlITmxkRUYwZEhKcFluVjBaU2duWTJobFkydGxaQ2NzSnljcE9uUm9hWE11Y21WdGIzWmxRWFIwY21saWRYUmxLQ2RqYUdWamEyVmtKeWs3ZlgwcE8zMHBLQ2w5ZlNrNycpO31jYXRjaChlKXtjb25zb2xlLmVycm9yKCdmYWlsZCB0byBsb2FkIGFiLmpzJyxlKTt9fWN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYW5pbWUtZnJhbWV3b3JrLWJveC1leHRlbnNpb24nLGNsYXNzIGEgZXh0ZW5kcyBIVE1MRWxlbWVudHtzdGF0aWMgI2I9ZmFsc2U7I2M9ZmFsc2U7Y29uc3RydWN0b3IoKXtzdXBlcigpO2EuI2ImJihfPT57dGhyb3cgbmV3IEVycm9yKCJbQW5pbWVGcmFtZXdvcmtCb3hFeHRlbnNpb24gRXJyb3JdIDxhbmltZS1mcmFtZXdvcmstYm94LWV4dGVuc2lvbj4gY29tcG9uZW50IGNhbiBsb2FkZWQgb25seSBvbmNlLiIpO30pKCk7YS4jYj10cnVlO3RoaXMuI2M9dHJ1ZTt9Y29ubmVjdGVkQ2FsbGJhY2soKXt0aGlzLiNjJiYoXz0+e2YoKTt0aGlzLmlubmVySFRNTD0nPHNjcmlwdCBzcmM9ImRhdGE6dGV4dC9qYXZhc2NyaXB0O2Jhc2U2NCxZM1Z6ZEc5dFJXeGxiV1Z1ZEhNdVpHVm1hVzVsS0NkaGJtbHRaUzFtY21GdFpYZHZjbXNuTEdOc1lYTnpJR0VnWlhoMFpXNWtjeUJJVkUxTVJXeGxiV1Z1ZEh0emRHRjBhV01nSTJJZ1BTQm1ZV3h6WlRzall5QTlJR1poYkhObE8yTnZibk4wY25WamRHOXlLQ2w3YzNWd1pYSW9LVHRoTGlOaUppWW9YejArZTNSb2NtOTNJRzVsZHlCRmNuSnZjaWdpVzBGdWFXMWxSbkpoYldWM2IzSnJJRVZ5Y205eVhTQThZVzVwYldVdFpuSmhiV1YzYjNKclBpQmpiMjF3YjI1bGJuUWdZMkZ1SUd4dllXUmxaQ0J2Ym14NUlHOXVZMlV1SWlrN2ZTa29LVHRoTGlOaVBYUnlkV1U3ZEdocGN5NGpZejEwY25WbE8zMWpiMjV1WldOMFpXUkRZV3hzWW1GamF5Z3BlM1JvYVhNdUkyTW1KaWhmUFQ1N2RHaHBjeTVwYm01bGNraFVUVXc5Snp4emRIbHNaVDVBYVcxd2IzSjBJSFZ5YkNnaVVVZDRhR1ZYVm5sSlIxSnNXbTFzZFZwVlJtMVJNbWhzV1RKemMyUllUbkJpYldSQ1dtdE9iMXBYVG5KUE1FSnpXVmhzYkdOcFFtdGFWMXB3WW0xV1FscHJUbTlhVjA1eVpUQkNjbHBZYkcxamJVWjBXbGhOWjJKWFJuSmFWVTV2V2xkT2NtVjZRV3hsTTI5MFlWYzFhMXBZWnpaTlZIUTVUVlJCZDBwWWREWk1WMngxV2tkV05FOXFSVGRtV0RGQllUSldOVnB1U21oaVYxWjZTVWN4YUdFeVZsWmliVTV2V2xkT2NtVjZRV3hsTTI5MFlWYzFhMXBZWnpaTlZIUTVUVlJCZDBwWWREWk1WMngxV2tkV05FOXFSVGRtV0RFNUlpazdZVzVwYldVdFpuSmhiV1YzYjNKcmUyUnBjM0JzWVhrNllteHZZMnNoYVcxd2IzSjBZVzUwTzNkcFpIUm9PakFoYVcxd2IzSjBZVzUwTzJobGFXZG9kRG93SVdsdGNHOXlkR0Z1ZER0dmRtVnlabXh2ZHpwb2FXUmtaVzRoYVcxd2IzSjBZVzUwTzNacGMybGlhV3hwZEhrNmFHbGtaR1Z1SVdsdGNHOXlkR0Z1ZER0d2IybHVkR1Z5TFdWMlpXNTBjenB1YjI1bElXbHRjRzl5ZEdGdWREdDFjMlZ5TFhObGJHVmpkRHB1YjI1bElXbHRjRzl5ZEdGdWREdDlQQzl6ZEhsc1pUNG5PMk4xYzNSdmJVVnNaVzFsYm5SekxtUmxabWx1WlNnbllXNXBiV1V0YVc1d2RYUW5MR05zWVhOeklHVjRkR1Z1WkhNZ1NGUk5URVZzWlcxbGJuUjdZMjl1Ym1WamRHVmtRMkZzYkdKaFkyc29LWHQwYUdsekxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyRnVhVzFoZEdsdmJuTjBZWEowSnl3b1pTazlQaWhsTG1GdWFXMWhkR2x2Yms1aGJXVTlQVDBpYldGclpVTm9aV05ySWlrL2RHaHBjeTVqYUdWamEyVmtQWFJ5ZFdVNktHVXVZVzVwYldGMGFXOXVUbUZ0WlQwOVBTSnRZV3RsVlc1amFHVmpheUlwUDNSb2FYTXVZMmhsWTJ0bFpEMW1ZV3h6WlRwMWJtUmxabWx1WldRcE8zMW5aWFFnWTJobFkydGxaQ2dwZTNKbGRIVnliaUIwYUdsekxtaGhjMEYwZEhKcFluVjBaU2duWTJobFkydGxaQ2NwTzMxelpYUWdZMmhsWTJ0bFpDaDJLWHQyUDNSb2FYTXVJSE5sZEVGMGRISnBZblYwWlNnblkyaGxZMnRsWkNjc0p5Y3BPblJvYVhNdWNtVnRiM1psUVhSMGNtbGlkWFJsS0NkamFHVmphMlZrSnlrN2ZYMHBPMzBwS0NsOWZTazciIGZldGNocHJpb3JpdHk9ImhpZ2giPjwvc2NyaXB0PjxhbmltZS1mcmFtZXdvcms+PC9hbmltZS1mcmFtZXdvcms+PHN0eWxlPkBpbXBvcnQgdXJsKCJkYXRhOnRleHQvY3NzO2Jhc2U2NCxRR3hoZVdWeUlIVnphVzVuUVdaRGFHVmphM3N1WVc1cGJXVXRZbTk0TFdOc1lYTnpleTB0WVc1cGJXVXRZbTk0TFhkcFpIUm9PakZ3ZURzdExXRnVhVzFsTFdKdmVDMW9aV2xuYUhRNk5IQjRPeTB0WVc1cGJXVXRZbTk0TFdScGMzQnNZWGs2YVc1c2FXNWxMV0pzYjJOck95MHRZVzVwYldVdFltOTRMVzltWmkxamIyeHZjanBuY21GNU95MHRZVzVwYldVdFltOTRMVzl1TFdOdmJHOXlPbmxsYkd4dmR6dDlMbUZ1YVcxbExXSnZlQzFwYm5CMWRDMTBZWEpuWlhSN2QybGtkR2c2ZG1GeUtDMHRZVzVwYldVdFltOTRMWGRwWkhSb0tUdG9aV2xuYUhRNmRtRnlLQzB0WVc1cGJXVXRZbTk0TFdobGFXZG9kQ2s3WkdsemNHeGhlVHAyWVhJb0xTMWhibWx0WlMxaWIzZ3RaR2x6Y0d4aGVTazdmUzVoYm1sdFpTMWliM2d0WVc1cGJXVXRhVzV3ZFhRdGRHRnlaMlYwZTNkcFpIUm9PblpoY2lndExXRnVhVzFsTFdKdmVDMTNhV1IwYUNrN2FHVnBaMmgwT25aaGNpZ3RMV0Z1YVcxbExXSnZlQzFvWldsbmFIUXBPMlJwYzNCc1lYazZkbUZ5S0MwdFlXNXBiV1V0WW05NExXUnBjM0JzWVhrcE8zMHVZVzVwYldVdFltOTRMV052Ykc5eWFXNW5aV1F0YVc1d2RYUXRkR0Z5WjJWMGUzZHBaSFJvT25aaGNpZ3RMV0Z1YVcxbExXSnZlQzEzYVdSMGFDazdhR1ZwWjJoME9uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxb1pXbG5hSFFwTzJScGMzQnNZWGs2ZG1GeUtDMHRZVzVwYldVdFltOTRMV1JwYzNCc1lYa3BPMkpoWTJ0bmNtOTFibVF0WTI5c2IzSTZkbUZ5S0MwdFlXNXBiV1V0WW05NExXOW1aaTFqYjJ4dmNpazdmUzVoYm1sdFpTMWliM2d0WTI5c2IzSnBibWRsWkMxcGJuQjFkQzEwWVhKblpYUTZhR0Z6S0dsdWNIVjBXM1I1Y0dVOVkyaGxZMnRpYjNoZE9tTm9aV05yWldRcGUzZHBaSFJvT25aaGNpZ3RMV0Z1YVcxbExXSnZlQzEzYVdSMGFDazdhR1ZwWjJoME9uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxb1pXbG5hSFFwTzJScGMzQnNZWGs2ZG1GeUtDMHRZVzVwYldVdFltOTRMV1JwYzNCc1lYa3BPMkpoWTJ0bmNtOTFibVF0WTI5c2IzSTZkbUZ5S0MwdFlXNXBiV1V0WW05NExXOXVMV052Ykc5eUtUdDlMbUZ1YVcxbExXSnZlQzFqYjJ4dmNtbHVaMlZrTFdGdWFXMWxMV2x1Y0hWMExYUmhjbWRsZEh0M2FXUjBhRHAyWVhJb0xTMWhibWx0WlMxaWIzZ3RkMmxrZEdncE8yaGxhV2RvZERwMllYSW9MUzFoYm1sdFpTMWliM2d0YUdWcFoyaDBLVHRrYVhOd2JHRjVPblpoY2lndExXRnVhVzFsTFdKdmVDMWthWE53YkdGNUtUdGlZV05yWjNKdmRXNWtMV052Ykc5eU9uWmhjaWd0TFdGdWFXMWxMV0p2ZUMxdlptWXRZMjlzYjNJcE8zMHVZVzVwYldVdFltOTRMV052Ykc5eWFXNW5aV1F0WVc1cGJXVXRhVzV3ZFhRdGRHRnlaMlYwT21oaGN5aGhibWx0WlMxcGJuQjFkRnRqYUdWamEyVmtYU2w3ZDJsa2RHZzZkbUZ5S0MwdFlXNXBiV1V0WW05NExYZHBaSFJvS1R0b1pXbG5hSFE2ZG1GeUtDMHRZVzVwYldVdFltOTRMV2hsYVdkb2RDazdaR2x6Y0d4aGVUcDJZWElvTFMxaGJtbHRMV0p2ZUMxa2FYTndiR0Y1S1R0aVlXTnJaM0p2ZFc1a0xXTnZiRzl5T25aaGNpZ3RMV0Z1YVcxbExXSnZlQzF2YmkxamIyeHZjaWs3ZlgwPSIpO0BsYXllciB1c2luZ0FmQ2hlY2ssdXNpbmdBYjtAbGF5ZXIgdXNpbmdBZkNoZWNre2FuaW1lLWZyYW1ld29yay1ib3gtZXh0ZW5zaW9ue2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3dpZHRoOjAhaW1wb3J0YW50O2hlaWdodDowIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3Zpc2liaWxpdHk6aGlkZGVuIWltcG9ydGFudDtwb2ludGVyLWV2ZW50czpub25lIWltcG9ydGFudDt1c2VyLXNlbGVjdDpub25lIWltcG9ydGFudDt9fTwvc3R5bGU+JztjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FuaW1lLWJveCcsY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudHsjZD0iIjsjZT0iYW5pbWUtYm94LWNsYXNzIGFuaW1lLWJveC1pbnB1dC10YXJnZXQiOyN3PW51bGw7I2g9bnVsbDsjZj1udWxsO2Nvbm5lY3RlZENhbGxiYWNrKCl7c2V0VGltZW91dChfPT57dGhpcy53aWR0aCYmdGhpcy4jZyh0cnVlLHRoaXMud2lkdGgpO3RoaXMuaGVpZ2h0JiZ0aGlzLiNnKGZhbHNlLHRoaXMuaGVpZ2h0KTt0aGlzLmFuaW1lSW5wdXRUYXJnZXRpbmcmJnRoaXMuI3goZmFsc2UsdHJ1ZSk7dGhpcy5hbmltZUNvbG9yaW5nJiZ0aGlzLiN4KHRydWUsdHJ1ZSk7dGhpcy4jeChudWxsLGZhbHNlKTt0aGlzLiNzKGZhbHNlKTt0aGlzLmFuaW1lQm94Qm9yZGVyaW5nJiZ0aGlzLiN5KHRydWUpO3RoaXMuI2YgPSB0cnVlO30sMCk7fXN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCl7cmV0dXJuWyd3aWR0aCcsJ2hlaWdodCcsJ2FuaW1lLWlucHV0LXRhcmdldGluZycsJ2FuaW1lLWJveC1ib3JkZXJpbmcnLCdhbmltZS1jb2xvcmluZyddO31nZXQgYW5pbWVJbnB1dFRhcmdldGluZygpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnYW5pbWUtaW5wdXQtdGFyZ2V0aW5nJyk7fXNldCBhbmltZUlucHV0VGFyZ2V0aW5nKHYpe3Y/dGhpcy5zZXRBdHRyaWJ1dGUoJ2FuaW1lLWlucHV0LXRhcmdldGluZycsJycpOnRoaXMucmVtb3ZlQXR0cmlidXRlKCdhbmltZS1pbnB1dC10YXJnZXRpbmcnKTt9Z2V0IGFuaW1lQm94Qm9yZGVyaW5nKCl7cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdhbmltZS1ib3gtYm9yZGVyaW5nJyk7fXNldCBhbmltZUJveEJvcmRlcmluZyh2KXt2P3RoaXMuc2V0QXR0cmlidXRlKCdhbmltZS1ib3gtYm9yZGVyaW5nJywnJyk6dGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2FuaW1lLWJveC1ib3JkZXJpbmcnKTt9Z2V0IGFuaW1lQ29sb3JpbmcoKXtyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2FuaW1lLWNvbG9yaW5nJyk7fXNldCBhbmltZUNvbG9yaW5nKHYpe3Y/dGhpcy5zZXRBdHRyaWJ1dGUoJ2FuaW1lLWNvbG9yaW5nJywnJyk6dGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2FuaW1lLWNvbG9yaW5nJyk7fWdldCB3aWR0aCgpe3JldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnd2lkdGgnKT90aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKTp1bmRlZmluZWQ7fXNldCB3aWR0aCh2KXt0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHYpO31nZXQgaGVpZ2h0KCl7cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdoZWlnaHQnKT90aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk6dW5kZWZpbmVkO31zZXQgaGVpZ2h0KHYpe3RoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHYpO31hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soayxvLG4pe3RoaXMuI2YmJihfPT57bGV0IGY9ZmFsc2U7Y29uc3RbcCxxXT1bKG98fG4pLCgoIW8pJiZuKV07c3dpdGNoKGspe2Nhc2Und2lkdGgnOmY9dHJ1ZTtjYXNlJ2hlaWdodCc6cCYmKF89PntmP3RoaXMuI3IoZik6bj90aGlzLiNnKGYsbik6bj8oKG8hPT1uKSYmdGhpcy4jeihmLG4pKTt0aGlzLiNzKHRoaXMuYW5pbWVCb3hCb3JkZXJpbmcpO30pKCk7YnJlYWs7Y2FzZSdhbmltZS1jb2xvcmluZyc6Zj10cnVlO2Nhc2UnYW5pbWUtaW5wdXQtdGFyZ2V0aW5nJzpwJiYoXz0+e3RoaXMuI3goZixxO3RoaXMuI3gobnVsbCx0aGlzLmFuaW1lQm94Qm9yZGVyaW5nKTt9KSgpO2JyZWFrO2Nhc2UnYW5pbWUtYm94LWJvcmRlcmluZyc6cCYmdGhpcy4jeShxKTticmVhazt9fSkoKTt9I3kocCl7KHRoaXMuI2YhPT1udWxsKSYmdGhpcy4jZj1mYWxzZTsocD8oXz0+eyhiPT57dGhpcy5yZW1vdmVBdHRyaWJ1dGUoImNsYXNzIik7dGhpcy4jZCYmKF89PntPYmplY3QuYXNzaWduKGIuc3R5bGUse2Nzc1RleHQ6dGhpcy4jZH0pO3RoaXMucmVtb3ZlQXR0cmlidXRlKCJzdHlsZSIpO30pKCk7dGhpcy5pbm5lckhUTUwgPSAiIjt0aGlzLmFwcGVuZENoaWxkKGIpO30pKE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmllbGRzZXQnKSx7Y2xhc3NOYW1lOnRoaXMuI2UsaW5uZXJIVE1MOnRoaXMuaW5uZXJIVE1MfSkpO30pOihfPT57KHRoaXMuI2QpJiZ0aGlzLnNldEF0dHJpYnV0ZSgic3R5bGUiLHRoaXMuI2QpO3RoaXMuc2V0QXR0cmlidXRlKCJjbGFzcyIsdGhpcy4jZSk7dGhpcy5pbm5lckhUTUw9dGhpcy5xdWVyeVNlbGVjdG9yKCJmaWVsZHNldCIpLmlubmVySFRNTDt9KSkoKTsodGhpcy4jZiE9PW51bGwpJiZ0aGlzLiNmPXRydWU7fSN4KG0sYSl7KChtPT09bnVsbCk/KF89PnsodGhpcy4jZiE9PW51bGwpJiZ0aGlzLiNmPWZhbHNlOyhhP3RoaXMucXVlcnlTZWxlY3RvcigiZmllbGRzZXQiKTp0aGlzKS5zZXRBdHRyaWJ1dGUoImNsYXNzIix0aGlzLiNlKTsodGhpcy4jZiE9PW51bGwpJiZ0aGlzLiNmPXRydWU7fSk6bT8oPT57dGhpcy4jZT1hP3RoaXMuI2UucmVwbGFjZShgYW5pbWUtYm94LSR7dGhpcy5hbmltZUlucHV0VGFyZ2V0aW5nPyJhbmltZS0iOiIifWlucHV0LXRhcmdldGAsYGFuaW1lLWJveC1jb2xvcmluZ2VkLSR7dGhpcy5hbmltZUlucHV0VGFyZ2V0aW5nPyJhbmltZS0iOiIifWlucHV0LXRhcmdldGApOnRoaXMuI2UucmVwbGFjZShgYW5pbWUtYm94LWNvbG9yaW5nZWQtJHt0aGlzLmFuaW1lSW5wdXRUYXJnZXRpbmc/ImFuaW1lLSI6IiJ9aW5wdXQtdGFyZ2V0YCxgYW5pbWUtYm94LSR7dGhpcy5hbmltZUlucHV0VGFyZ2V0aW5nPyJhbmltZS0iOiIifWlucHV0LXRhcmdldGApO30pOihfPT57dGhpcy4jZT1hP3RoaXMuI2UucmVwbGFjZSgiYW5pbWUtYm94LWlucHV0LXRhcmdldCIsImFuaW1lLWJveC1hbmltZS1pbnB1dC10YXJnZXQiKTp0aGlzLiNlLnJlcGxhY2UoImFuaW1lLWJveC1hbmltZS1pbnB1dC10YXJnZXQiLCJhbmltZS1ib3gtaW5wdXQtdGFyZ2V0Iik7fSkpKCk7fSNyKHApeyhwPyhfPT57dGhpcy4jZD10aGlzLiNkLnJlcGxhY2UoYC0tYW5pbWUtYm94LXdpZHRoOiAke3RoaXMuI3d9O2AsIiIpO3RoaXMuI3c9bnVsbDt9KTooXz0+e3RoaXMuI2Q9dGhpcy4jZC5yZXBsYWNlKGAtLWFuaW1lLWJveC1oZWlnaHQ6ICR7dGhpcy4jaH07YCwiIik7dGhpcy4jaD1udWxsO30pKSgpO30jZyhwLHYpeyhwPihfPT57dGhpcy4jZCs9YC0tYW5pbWUtYm94LXdpZHRoOiAke3Z9O2A7dGhpcy4jdz12O30pOihfPT57dGhpcy4jZCs9YC0tYW5pbWUtYm94LWhlaWdodDogJHt2fTtgO3RoaXMuI2g9djt9KSkoKTt9I3oocCx2KXsocD8oXz0+e3RoaXMuI2Q9dGhpcy4jZC5yZXBsYWNlKGB0aDogJHt0aGlzLiN3fWAsYHRoOiAke3Z9YCk7dGhpcy4jdz12O30pOihfPT57dGhpcy4jZD10aGlzLiNkLnJlcGxhY2UoYGh0OiAke3RoaXMuI2h9YCxgaHQ6ICR7dn1gKTt0aGlzLiNoPXY7fSkpKCk7fSNzKHApeyh0aGlzLiNmIT09bnVsbCkmJnRoaXMuI2Y9ZmFsc2U7KGU9PnRoaXMuI2Q/ZS5zZXRBdHRyaWJ1dGUoInN0eWxlIix0aGlzLiNkKTooZS5oYXNBdHRyaWJ1dGUoInN0eWxlIikmJmUucmVtb3ZlQXR0cmlidXRlKCJzdHlsZSIpKSkocD90aGlzLnF1ZXJ5U2VsZWN0b3IoImZpZWxkc2V0Iik6dGhpcyk7KHRoaXMuI2YhPT1udWxsKSYmdGhpcy4jZj10cnVlO319KTt9KSgpO319KTs=" fetchpriority="high"></script>'));
export const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));
