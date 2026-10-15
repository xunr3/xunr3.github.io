# about BUGC

 > BUGC is a recursive acronym for `BUGC is Universal Gate Circuit`

1. custom tags
 - `<anime-framework>` : define custom tag `<anime-input>`
 - `<anime-framework-box-extension>` : define custom tag `<anime-box>`
 - `<anime-box [width="[1-9][0-9]*px"] [height="[1-9][0-9]*px"] [anime-input-targeting] [anime-coloring] [anime-box-bordering]>` : the fieldset (when it's anime-box-bordering) or custom tag which classed as "anime-box-class" and the "anime-box-input-target" (not anime-coloring nor anime-input-targeting) or "anime-box-anime-input-targeting" (not anime-coloring but anime-input-targrting) or "anime-box-coloringed-input-target" (not anime-input-targeting but anime-coloring) or "anime-box-coloringed-anime-input-target" (anime-input-targeting and anime-coloring one) and styled as "--anime-box-width" and "--anime-box-height" (If an `anime-input` or `input` is detected inside an `anime-box`, when that element is checked, its color will light up like a lamp to verify it visually. To match a difficulty level similar to developing Minecraft redstone circuits, we provide `anime-box` by default. it's also css)
 - `<anime-input>` : the custom element which JS is used that actaully the tag which — be "anime-input[checked]" when "makeCheck" anime caused and undo when "makeUncheck anime caused"
2. processing loads
 - JS processing load when initializing : `<anime-box>` is actually compiler of markup language. so it have some processing loads. but that long as loading pannel is not required.
 - JS processing load when CSS anime is causing In a row like a CPE(Carnian Pluvial Episode) : DOM manipulation processing load is caused as much as CSS Anime is caused.
 - CSS processing load of searching `:has()` : acutally, the classed child which checked by has is apper only once, so `O(1)` overhead is caused. but that `O(1)` overhead is raised over and over as much as CPE(Carnian Pluvial Episode)
 - The Latency : Unfortunately, 0.1ms delay is max-speed. so, the purple-yellow loop is actually repeated by 0.1ms
3. css source code (code of framework) (main logic) (no scripted)
 -  `bugccore.css` system : set `--anime-on` and `--anime-off` as minimum-timed(=0.1ms) anime value.
 - `nand.css` system : set "nand-gate-o" classed child(which `<anime-input>`)'s check status as nand value of "nand-gate-i0" classed child(which `<anime-input>`)'s check status and "nand-gate-i1" classed child(which `<anime-input>`)'s check status
 - `wps.css` system : it has 16 wirebut16bit bus and 16 wirebus16bit port, it's 512bit. 512 wire and port included. in standard form, port is used on module to module. and wire is used on closed single module. in single wire (or port) has 16 inputs and 16 outputs. each i0~i15, o0~o15 object is classed child(which `<anime-input>`) which wire's terminate that check status is carried. the wire system is inspired by Verilog
4. About Bug
 - it's already debuged. it's work
5. dose browser deny it?
 - Absolutely NOT.

 > On the performance graph, the yellow processing load (view randering) rises like a normal distribution, while the purple processing load (non-view processing load) rises as the yellow processing load is goes down. CONSISTENTLY

## why use it?

 > HTML要素のクラス明記がプログラミングできるように
 > 
 > (To make HTML class declarations programmable)

## [https://xunr3.github.io/af.js]

```javascript
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
        @import url("data:text/css;base64,QGxheWVyIGRlZmluZUFmQ2hlY2ssdXNpbmdBZkNoZWNrO0BsYXllciBkZWZpbmVBZkNoZWNre0BrZXlmcmFtZXMgbWFrZUNoZWNrezAle3otaW5kZXg6MTt9MTAwJXt6LWluZGV4OjE7fX1Aa2V5ZnJhbWVzIG1ha2VVbmNoZWNrezAle3otaW5kZXg6MTt9MTAwJXt6LWluZGV4OjE7fX19");

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
```

## [https://xunre.github.io/ab.js]

```javascript
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

const ab_webcode = (_ => console.log('<script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>'));
```

## [https://xunr3.github.io/ab.css]

```css
@layer usingAfCheck{
    .anime-box-class {
        --anime-box-width: 1px;
        --anime-box-height: 4px;
        --anime-box-display: inline-block;
        --anime-box-off-color: gray;
        --anime-box-on-color: yellow;
    }

    .anime-box-input-target {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anime-box-display);
    }

    .anime-box-anime-input-target {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anime-box-display);
    }

    .anime-box-coloringed-input-target {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anime-box-display);
        background-color: var(--anime-box-off-color);
    }

    .anime-box-coloringed-input-target:has(input[type=checkbox]:checked) {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anime-box-display);
        background-color: var(--anime-box-on-color);
    }

    .anime-box-coloringed-anime-input-target {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anime-box-display);
        background-color: var(--anime-box-off-color);
    }

    .anime-box-coloringed-anime-input-target:has(anime-input[checked]) {
        width: var(--anime-box-width);
        height: var(--anime-box-height);
        display: var(--anim-box-display);
        background-color: var(--anime-box-on-color);
    }
}
```

## [https://xunr3.github.io/bugccore.css]

```css
@layer defineAfCheck, usingAfCheck, usingAb, usingBugccore;

@layer usingAb {
  :root {
    --anime-on : makeCheck 0.1ms !important;
    --anime-off : makeUncheck 0.1ms !important;
  }
}
```

## [https://xunr3.github.io/bugc.css]

```css
@import url("https://xunr3.github.io/wps.css");
@import url("https://xunr3.github.io/nand.css");

/* # BUGC is Universal Gate Circuit */
```

## [https://xunr3.github.io/nand.css]

```css
@import url("https://xunr3.github.io/bugccore.css");

@layer usingBugccore {
  .nand-gate:has(.nand-gate-i0[checked]):has(.nand-gate-i1[checked]) .nand-gate-o {
    animation: var(--anime-off) !important;
  }

  .nand-gate:has(.nand-gate-i0:not([checked]), .nand-gate-i1:not([checked])) .nand-gate-o {
    animation: var(--anime-on) !important;
  }
}
```

## [https://xunr3.github.io/wps.css]

```css
@import url("https://xunr3.github.io/bugccore.css");

@layer usingBugccore {
  /* begin, 16 wirebut16bit bus and 16 wirebus16bit port, 512bit */

  .wps-w0:has(.wps-w0-i0[checked]) .wps-w0-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i0:not([checked])) .wps-w0-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i0[checked]) .wps-p0-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i0:not([checked])) .wps-p0-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i0[checked]) .wps-w1-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i0:not([checked])) .wps-w1-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i0[checked]) .wps-p1-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i0:not([checked])) .wps-p1-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i0[checked]) .wps-w2-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i0:not([checked])) .wps-w2-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i0[checked]) .wps-p2-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i0:not([checked])) .wps-p2-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i0[checked]) .wps-w3-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i0:not([checked])) .wps-w3-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i0[checked]) .wps-p3-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i0:not([checked])) .wps-p3-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i0[checked]) .wps-w4-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i0:not([checked])) .wps-w4-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i0[checked]) .wps-p4-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i0:not([checked])) .wps-p4-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i0[checked]) .wps-w5-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i0:not([checked])) .wps-w5-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i0[checked]) .wps-p5-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i0:not([checked])) .wps-p5-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i0[checked]) .wps-w6-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i0:not([checked])) .wps-w6-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i0[checked]) .wps-p6-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i0:not([checked])) .wps-p6-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i0[checked]) .wps-w7-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i0:not([checked])) .wps-w7-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i0[checked]) .wps-p7-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i0:not([checked])) .wps-p7-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i0[checked]) .wps-w8-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i0:not([checked])) .wps-w8-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i0[checked]) .wps-p8-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i0:not([checked])) .wps-p8-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i0[checked]) .wps-w9-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i0:not([checked])) .wps-w9-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i0[checked]) .wps-p9-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i0:not([checked])) .wps-p9-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i0[checked]) .wps-w10-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i0:not([checked])) .wps-w10-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i0[checked]) .wps-p10-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i0:not([checked])) .wps-p10-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i0[checked]) .wps-w11-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i0:not([checked])) .wps-w11-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i0[checked]) .wps-p11-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i0:not([checked])) .wps-p11-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i0[checked]) .wps-w12-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i0:not([checked])) .wps-w12-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i0[checked]) .wps-p12-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i0:not([checked])) .wps-p12-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i0[checked]) .wps-w13-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i0:not([checked])) .wps-w13-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i0[checked]) .wps-p13-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i0:not([checked])) .wps-p13-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i0[checked]) .wps-w14-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i0:not([checked])) .wps-w14-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i0[checked]) .wps-p14-o0 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i0:not([checked])) .wps-p14-o0 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i1[checked]) .wps-w0-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i1:not([checked])) .wps-w0-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i1[checked]) .wps-p0-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i1:not([checked])) .wps-p0-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i1[checked]) .wps-w1-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i1:not([checked])) .wps-w1-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i1[checked]) .wps-p1-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i1:not([checked])) .wps-p1-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i1[checked]) .wps-w2-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i1:not([checked])) .wps-w2-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i1[checked]) .wps-p2-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i1:not([checked])) .wps-p2-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i1[checked]) .wps-w3-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i1:not([checked])) .wps-w3-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i1[checked]) .wps-p3-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i1:not([checked])) .wps-p3-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i1[checked]) .wps-w4-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i1:not([checked])) .wps-w4-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i1[checked]) .wps-p4-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i1:not([checked])) .wps-p4-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i1[checked]) .wps-w5-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i1:not([checked])) .wps-w5-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i1[checked]) .wps-p5-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i1:not([checked])) .wps-p5-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i1[checked]) .wps-w6-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i1:not([checked])) .wps-w6-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i1[checked]) .wps-p6-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i1:not([checked])) .wps-p6-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i1[checked]) .wps-w7-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i1:not([checked])) .wps-w7-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i1[checked]) .wps-p7-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i1:not([checked])) .wps-p7-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i1[checked]) .wps-w8-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i1:not([checked])) .wps-w8-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i1[checked]) .wps-p8-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i1:not([checked])) .wps-p8-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i1[checked]) .wps-w9-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i1:not([checked])) .wps-w9-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i1[checked]) .wps-p9-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i1:not([checked])) .wps-p9-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i1[checked]) .wps-w10-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i1:not([checked])) .wps-w10-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i1[checked]) .wps-p10-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i1:not([checked])) .wps-p10-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i1[checked]) .wps-w11-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i1:not([checked])) .wps-w11-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i1[checked]) .wps-p11-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i1:not([checked])) .wps-p11-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i1[checked]) .wps-w12-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i1:not([checked])) .wps-w12-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i1[checked]) .wps-p12-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i1:not([checked])) .wps-p12-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i1[checked]) .wps-w13-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i1:not([checked])) .wps-w13-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i1[checked]) .wps-p13-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i1:not([checked])) .wps-p13-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i1[checked]) .wps-w14-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i1:not([checked])) .wps-w14-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i1[checked]) .wps-p14-o1 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i1:not([checked])) .wps-p14-o1 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i2[checked]) .wps-w0-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i2:not([checked])) .wps-w0-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i2[checked]) .wps-p0-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i2:not([checked])) .wps-p0-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i2[checked]) .wps-w1-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i2:not([checked])) .wps-w1-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i2[checked]) .wps-p1-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i2:not([checked])) .wps-p1-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i2[checked]) .wps-w2-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i2:not([checked])) .wps-w2-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i2[checked]) .wps-p2-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i2:not([checked])) .wps-p2-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i2[checked]) .wps-w3-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i2:not([checked])) .wps-w3-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i2[checked]) .wps-p3-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i2:not([checked])) .wps-p3-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i2[checked]) .wps-w4-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i2:not([checked])) .wps-w4-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i2[checked]) .wps-p4-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i2:not([checked])) .wps-p4-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i2[checked]) .wps-w5-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i2:not([checked])) .wps-w5-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i2[checked]) .wps-p5-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i2:not([checked])) .wps-p5-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i2[checked]) .wps-w6-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i2:not([checked])) .wps-w6-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i2[checked]) .wps-p6-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i2:not([checked])) .wps-p6-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i2[checked]) .wps-w7-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i2:not([checked])) .wps-w7-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i2[checked]) .wps-p7-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i2:not([checked])) .wps-p7-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i2[checked]) .wps-w8-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i2:not([checked])) .wps-w8-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i2[checked]) .wps-p8-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i2:not([checked])) .wps-p8-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i2[checked]) .wps-w9-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i2:not([checked])) .wps-w9-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i2[checked]) .wps-p9-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i2:not([checked])) .wps-p9-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i2[checked]) .wps-w10-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i2:not([checked])) .wps-w10-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i2[checked]) .wps-p10-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i2:not([checked])) .wps-p10-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i2[checked]) .wps-w11-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i2:not([checked])) .wps-w11-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i2[checked]) .wps-p11-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i2:not([checked])) .wps-p11-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i2[checked]) .wps-w12-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i2:not([checked])) .wps-w12-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i2[checked]) .wps-p12-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i2:not([checked])) .wps-p12-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i2[checked]) .wps-w13-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i2:not([checked])) .wps-w13-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i2[checked]) .wps-p13-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i2:not([checked])) .wps-p13-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i2[checked]) .wps-w14-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i2:not([checked])) .wps-w14-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i2[checked]) .wps-p14-o2 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i2:not([checked])) .wps-p14-o2 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i3[checked]) .wps-w0-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i3:not([checked])) .wps-w0-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i3[checked]) .wps-p0-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i3:not([checked])) .wps-p0-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i3[checked]) .wps-w1-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i3:not([checked])) .wps-w1-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i3[checked]) .wps-p1-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i3:not([checked])) .wps-p1-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i3[checked]) .wps-w2-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i3:not([checked])) .wps-w2-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i3[checked]) .wps-p2-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i3:not([checked])) .wps-p2-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i3[checked]) .wps-w3-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i3:not([checked])) .wps-w3-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i3[checked]) .wps-p3-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i3:not([checked])) .wps-p3-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i3[checked]) .wps-w4-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i3:not([checked])) .wps-w4-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i3[checked]) .wps-p4-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i3:not([checked])) .wps-p4-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i3[checked]) .wps-w5-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i3:not([checked])) .wps-w5-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i3[checked]) .wps-p5-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i3:not([checked])) .wps-p5-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i3[checked]) .wps-w6-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i3:not([checked])) .wps-w6-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i3[checked]) .wps-p6-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i3:not([checked])) .wps-p6-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i3[checked]) .wps-w7-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i3:not([checked])) .wps-w7-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i3[checked]) .wps-p7-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i3:not([checked])) .wps-p7-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i3[checked]) .wps-w8-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i3:not([checked])) .wps-w8-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i3[checked]) .wps-p8-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i3:not([checked])) .wps-p8-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i3[checked]) .wps-w9-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i3:not([checked])) .wps-w9-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i3[checked]) .wps-p9-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i3:not([checked])) .wps-p9-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i3[checked]) .wps-w10-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i3:not([checked])) .wps-w10-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i3[checked]) .wps-p10-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i3:not([checked])) .wps-p10-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i3[checked]) .wps-w11-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i3:not([checked])) .wps-w11-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i3[checked]) .wps-p11-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i3:not([checked])) .wps-p11-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i3[checked]) .wps-w12-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i3:not([checked])) .wps-w12-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i3[checked]) .wps-p12-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i3:not([checked])) .wps-p12-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i3[checked]) .wps-w13-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i3:not([checked])) .wps-w13-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i3[checked]) .wps-p13-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i3:not([checked])) .wps-p13-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i3[checked]) .wps-w14-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i3:not([checked])) .wps-w14-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i3[checked]) .wps-p14-o3 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i3:not([checked])) .wps-p14-o3 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i4[checked]) .wps-w0-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i4:not([checked])) .wps-w0-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i4[checked]) .wps-p0-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i4:not([checked])) .wps-p0-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i4[checked]) .wps-w1-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i4:not([checked])) .wps-w1-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i4[checked]) .wps-p1-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i4:not([checked])) .wps-p1-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i4[checked]) .wps-w2-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i4:not([checked])) .wps-w2-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i4[checked]) .wps-p2-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i4:not([checked])) .wps-p2-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i4[checked]) .wps-w3-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i4:not([checked])) .wps-w3-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i4[checked]) .wps-p3-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i4:not([checked])) .wps-p3-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i4[checked]) .wps-w4-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i4:not([checked])) .wps-w4-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i4[checked]) .wps-p4-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i4:not([checked])) .wps-p4-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i4[checked]) .wps-w5-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i4:not([checked])) .wps-w5-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i4[checked]) .wps-p5-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i4:not([checked])) .wps-p5-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i4[checked]) .wps-w6-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i4:not([checked])) .wps-w6-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i4[checked]) .wps-p6-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i4:not([checked])) .wps-p6-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i4[checked]) .wps-w7-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i4:not([checked])) .wps-w7-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i4[checked]) .wps-p7-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i4:not([checked])) .wps-p7-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i4[checked]) .wps-w8-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i4:not([checked])) .wps-w8-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i4[checked]) .wps-p8-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i4:not([checked])) .wps-p8-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i4[checked]) .wps-w9-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i4:not([checked])) .wps-w9-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i4[checked]) .wps-p9-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i4:not([checked])) .wps-p9-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i4[checked]) .wps-w10-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i4:not([checked])) .wps-w10-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i4[checked]) .wps-p10-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i4:not([checked])) .wps-p10-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i4[checked]) .wps-w11-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i4:not([checked])) .wps-w11-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i4[checked]) .wps-p11-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i4:not([checked])) .wps-p11-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i4[checked]) .wps-w12-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i4:not([checked])) .wps-w12-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i4[checked]) .wps-p12-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i4:not([checked])) .wps-p12-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i4[checked]) .wps-w13-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i4:not([checked])) .wps-w13-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i4[checked]) .wps-p13-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i4:not([checked])) .wps-p13-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i4[checked]) .wps-w14-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i4:not([checked])) .wps-w14-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i4[checked]) .wps-p14-o4 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i4:not([checked])) .wps-p14-o4 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i5[checked]) .wps-w0-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i5:not([checked])) .wps-w0-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i5[checked]) .wps-p0-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i5:not([checked])) .wps-p0-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i5[checked]) .wps-w1-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i5:not([checked])) .wps-w1-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i5[checked]) .wps-p1-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i5:not([checked])) .wps-p1-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i5[checked]) .wps-w2-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i5:not([checked])) .wps-w2-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i5[checked]) .wps-p2-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i5:not([checked])) .wps-p2-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i5[checked]) .wps-w3-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i5:not([checked])) .wps-w3-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i5[checked]) .wps-p3-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i5:not([checked])) .wps-p3-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i5[checked]) .wps-w4-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i5:not([checked])) .wps-w4-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i5[checked]) .wps-p4-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i5:not([checked])) .wps-p4-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i5[checked]) .wps-w5-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i5:not([checked])) .wps-w5-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i5[checked]) .wps-p5-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i5:not([checked])) .wps-p5-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i5[checked]) .wps-w6-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i5:not([checked])) .wps-w6-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i5[checked]) .wps-p6-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i5:not([checked])) .wps-p6-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i5[checked]) .wps-w7-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i5:not([checked])) .wps-w7-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i5[checked]) .wps-p7-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i5:not([checked])) .wps-p7-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i5[checked]) .wps-w8-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i5:not([checked])) .wps-w8-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i5[checked]) .wps-p8-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i5:not([checked])) .wps-p8-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i5[checked]) .wps-w9-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i5:not([checked])) .wps-w9-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i5[checked]) .wps-p9-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i5:not([checked])) .wps-p9-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i5[checked]) .wps-w10-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i5:not([checked])) .wps-w10-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i5[checked]) .wps-p10-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i5:not([checked])) .wps-p10-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i5[checked]) .wps-w11-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i5:not([checked])) .wps-w11-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i5[checked]) .wps-p11-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i5:not([checked])) .wps-p11-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i5[checked]) .wps-w12-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i5:not([checked])) .wps-w12-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i5[checked]) .wps-p12-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i5:not([checked])) .wps-p12-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i5[checked]) .wps-w13-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i5:not([checked])) .wps-w13-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i5[checked]) .wps-p13-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i5:not([checked])) .wps-p13-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i5[checked]) .wps-w14-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i5:not([checked])) .wps-w14-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i5[checked]) .wps-p14-o5 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i5:not([checked])) .wps-p14-o5 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i6[checked]) .wps-w0-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i6:not([checked])) .wps-w0-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i6[checked]) .wps-p0-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i6:not([checked])) .wps-p0-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i6[checked]) .wps-w1-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i6:not([checked])) .wps-w1-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i6[checked]) .wps-p1-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i6:not([checked])) .wps-p1-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i6[checked]) .wps-w2-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i6:not([checked])) .wps-w2-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i6[checked]) .wps-p2-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i6:not([checked])) .wps-p2-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i6[checked]) .wps-w3-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i6:not([checked])) .wps-w3-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i6[checked]) .wps-p3-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i6:not([checked])) .wps-p3-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i6[checked]) .wps-w4-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i6:not([checked])) .wps-w4-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i6[checked]) .wps-p4-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i6:not([checked])) .wps-p4-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i6[checked]) .wps-w5-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i6:not([checked])) .wps-w5-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i6[checked]) .wps-p5-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i6:not([checked])) .wps-p5-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i6[checked]) .wps-w6-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i6:not([checked])) .wps-w6-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i6[checked]) .wps-p6-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i6:not([checked])) .wps-p6-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i6[checked]) .wps-w7-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i6:not([checked])) .wps-w7-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i6[checked]) .wps-p7-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i6:not([checked])) .wps-p7-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i6[checked]) .wps-w8-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i6:not([checked])) .wps-w8-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i6[checked]) .wps-p8-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i6:not([checked])) .wps-p8-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i6[checked]) .wps-w9-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i6:not([checked])) .wps-w9-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i6[checked]) .wps-p9-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i6:not([checked])) .wps-p9-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i6[checked]) .wps-w10-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i6:not([checked])) .wps-w10-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i6[checked]) .wps-p10-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i6:not([checked])) .wps-p10-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i6[checked]) .wps-w11-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i6:not([checked])) .wps-w11-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i6[checked]) .wps-p11-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i6:not([checked])) .wps-p11-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i6[checked]) .wps-w12-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i6:not([checked])) .wps-w12-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i6[checked]) .wps-p12-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i6:not([checked])) .wps-p12-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i6[checked]) .wps-w13-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i6:not([checked])) .wps-w13-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i6[checked]) .wps-p13-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i6:not([checked])) .wps-p13-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i6[checked]) .wps-w14-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i6:not([checked])) .wps-w14-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i6[checked]) .wps-p14-o6 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i6:not([checked])) .wps-p14-o6 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i7[checked]) .wps-w0-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i7:not([checked])) .wps-w0-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i7[checked]) .wps-p0-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i7:not([checked])) .wps-p0-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i7[checked]) .wps-w1-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i7:not([checked])) .wps-w1-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i7[checked]) .wps-p1-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i7:not([checked])) .wps-p1-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i7[checked]) .wps-w2-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i7:not([checked])) .wps-w2-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i7[checked]) .wps-p2-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i7:not([checked])) .wps-p2-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i7[checked]) .wps-w3-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i7:not([checked])) .wps-w3-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i7[checked]) .wps-p3-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i7:not([checked])) .wps-p3-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i7[checked]) .wps-w4-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i7:not([checked])) .wps-w4-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i7[checked]) .wps-p4-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i7:not([checked])) .wps-p4-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i7[checked]) .wps-w5-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i7:not([checked])) .wps-w5-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i7[checked]) .wps-p5-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i7:not([checked])) .wps-p5-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i7[checked]) .wps-w6-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i7:not([checked])) .wps-w6-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i7[checked]) .wps-p6-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i7:not([checked])) .wps-p6-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i7[checked]) .wps-w7-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i7:not([checked])) .wps-w7-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i7[checked]) .wps-p7-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i7:not([checked])) .wps-p7-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i7[checked]) .wps-w8-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i7:not([checked])) .wps-w8-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i7[checked]) .wps-p8-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i7:not([checked])) .wps-p8-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i7[checked]) .wps-w9-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i7:not([checked])) .wps-w9-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i7[checked]) .wps-p9-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i7:not([checked])) .wps-p9-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i7[checked]) .wps-w10-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i7:not([checked])) .wps-w10-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i7[checked]) .wps-p10-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i7:not([checked])) .wps-p10-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i7[checked]) .wps-w11-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i7:not([checked])) .wps-w11-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i7[checked]) .wps-p11-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i7:not([checked])) .wps-p11-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i7[checked]) .wps-w12-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i7:not([checked])) .wps-w12-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i7[checked]) .wps-p12-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i7:not([checked])) .wps-p12-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i7[checked]) .wps-w13-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i7:not([checked])) .wps-w13-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i7[checked]) .wps-p13-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i7:not([checked])) .wps-p13-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i7[checked]) .wps-w14-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i7:not([checked])) .wps-w14-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i7[checked]) .wps-p14-o7 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i7:not([checked])) .wps-p14-o7 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i8[checked]) .wps-w0-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i8:not([checked])) .wps-w0-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i8[checked]) .wps-p0-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i8:not([checked])) .wps-p0-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i8[checked]) .wps-w1-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i8:not([checked])) .wps-w1-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i8[checked]) .wps-p1-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i8:not([checked])) .wps-p1-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i8[checked]) .wps-w2-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i8:not([checked])) .wps-w2-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i8[checked]) .wps-p2-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i8:not([checked])) .wps-p2-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i8[checked]) .wps-w3-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i8:not([checked])) .wps-w3-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i8[checked]) .wps-p3-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i8:not([checked])) .wps-p3-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i8[checked]) .wps-w4-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i8:not([checked])) .wps-w4-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i8[checked]) .wps-p4-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i8:not([checked])) .wps-p4-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i8[checked]) .wps-w5-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i8:not([checked])) .wps-w5-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i8[checked]) .wps-p5-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i8:not([checked])) .wps-p5-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i8[checked]) .wps-w6-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i8:not([checked])) .wps-w6-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i8[checked]) .wps-p6-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i8:not([checked])) .wps-p6-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i8[checked]) .wps-w7-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i8:not([checked])) .wps-w7-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i8[checked]) .wps-p7-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i8:not([checked])) .wps-p7-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i8[checked]) .wps-w8-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i8:not([checked])) .wps-w8-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i8[checked]) .wps-p8-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i8:not([checked])) .wps-p8-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i8[checked]) .wps-w9-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i8:not([checked])) .wps-w9-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i8[checked]) .wps-p9-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i8:not([checked])) .wps-p9-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i8[checked]) .wps-w10-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i8:not([checked])) .wps-w10-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i8[checked]) .wps-p10-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i8:not([checked])) .wps-p10-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i8[checked]) .wps-w11-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i8:not([checked])) .wps-w11-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i8[checked]) .wps-p11-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i8:not([checked])) .wps-p11-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i8[checked]) .wps-w12-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i8:not([checked])) .wps-w12-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i8[checked]) .wps-p12-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i8:not([checked])) .wps-p12-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i8[checked]) .wps-w13-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i8:not([checked])) .wps-w13-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i8[checked]) .wps-p13-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i8:not([checked])) .wps-p13-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i8[checked]) .wps-w14-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i8:not([checked])) .wps-w14-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i8[checked]) .wps-p14-o8 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i8:not([checked])) .wps-p14-o8 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i9[checked]) .wps-w0-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i9:not([checked])) .wps-w0-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i9[checked]) .wps-p0-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i9:not([checked])) .wps-p0-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i9[checked]) .wps-w1-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i9:not([checked])) .wps-w1-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i9[checked]) .wps-p1-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i9:not([checked])) .wps-p1-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i9[checked]) .wps-w2-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i9:not([checked])) .wps-w2-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i9[checked]) .wps-p2-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i9:not([checked])) .wps-p2-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i9[checked]) .wps-w3-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i9:not([checked])) .wps-w3-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i9[checked]) .wps-p3-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i9:not([checked])) .wps-p3-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i9[checked]) .wps-w4-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i9:not([checked])) .wps-w4-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i9[checked]) .wps-p4-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i9:not([checked])) .wps-p4-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i9[checked]) .wps-w5-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i9:not([checked])) .wps-w5-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i9[checked]) .wps-p5-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i9:not([checked])) .wps-p5-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i9[checked]) .wps-w6-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i9:not([checked])) .wps-w6-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i9[checked]) .wps-p6-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i9:not([checked])) .wps-p6-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i9[checked]) .wps-w7-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i9:not([checked])) .wps-w7-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i9[checked]) .wps-p7-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i9:not([checked])) .wps-p7-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i9[checked]) .wps-w8-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i9:not([checked])) .wps-w8-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i9[checked]) .wps-p8-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i9:not([checked])) .wps-p8-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i9[checked]) .wps-w9-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i9:not([checked])) .wps-w9-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i9[checked]) .wps-p9-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i9:not([checked])) .wps-p9-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i9[checked]) .wps-w10-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i9:not([checked])) .wps-w10-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i9[checked]) .wps-p10-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i9:not([checked])) .wps-p10-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i9[checked]) .wps-w11-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i9:not([checked])) .wps-w11-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i9[checked]) .wps-p11-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i9:not([checked])) .wps-p11-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i9[checked]) .wps-w12-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i9:not([checked])) .wps-w12-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i9[checked]) .wps-p12-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i9:not([checked])) .wps-p12-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i9[checked]) .wps-w13-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i9:not([checked])) .wps-w13-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i9[checked]) .wps-p13-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i9:not([checked])) .wps-p13-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i9[checked]) .wps-w14-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i9:not([checked])) .wps-w14-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i9[checked]) .wps-p14-o9 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i9:not([checked])) .wps-p14-o9 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i10[checked]) .wps-w0-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i10:not([checked])) .wps-w0-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i10[checked]) .wps-p0-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i10:not([checked])) .wps-p0-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i10[checked]) .wps-w1-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i10:not([checked])) .wps-w1-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i10[checked]) .wps-p1-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i10:not([checked])) .wps-p1-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i10[checked]) .wps-w2-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i10:not([checked])) .wps-w2-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i10[checked]) .wps-p2-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i10:not([checked])) .wps-p2-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i10[checked]) .wps-w3-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i10:not([checked])) .wps-w3-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i10[checked]) .wps-p3-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i10:not([checked])) .wps-p3-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i10[checked]) .wps-w4-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i10:not([checked])) .wps-w4-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i10[checked]) .wps-p4-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i10:not([checked])) .wps-p4-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i10[checked]) .wps-w5-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i10:not([checked])) .wps-w5-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i10[checked]) .wps-p5-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i10:not([checked])) .wps-p5-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i10[checked]) .wps-w6-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i10:not([checked])) .wps-w6-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i10[checked]) .wps-p6-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i10:not([checked])) .wps-p6-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i10[checked]) .wps-w7-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i10:not([checked])) .wps-w7-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i10[checked]) .wps-p7-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i10:not([checked])) .wps-p7-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i10[checked]) .wps-w8-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i10:not([checked])) .wps-w8-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i10[checked]) .wps-p8-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i10:not([checked])) .wps-p8-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i10[checked]) .wps-w9-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i10:not([checked])) .wps-w9-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i10[checked]) .wps-p9-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i10:not([checked])) .wps-p9-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i10[checked]) .wps-w10-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i10:not([checked])) .wps-w10-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i10[checked]) .wps-p10-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i10:not([checked])) .wps-p10-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i10[checked]) .wps-w11-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i10:not([checked])) .wps-w11-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i10[checked]) .wps-p11-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i10:not([checked])) .wps-p11-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i10[checked]) .wps-w12-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i10:not([checked])) .wps-w12-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i10[checked]) .wps-p12-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i10:not([checked])) .wps-p12-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i10[checked]) .wps-w13-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i10:not([checked])) .wps-w13-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i10[checked]) .wps-p13-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i10:not([checked])) .wps-p13-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i10[checked]) .wps-w14-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i10:not([checked])) .wps-w14-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i10[checked]) .wps-p14-o10 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i10:not([checked])) .wps-p14-o10 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i11[checked]) .wps-w0-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i11:not([checked])) .wps-w0-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i11[checked]) .wps-p0-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i11:not([checked])) .wps-p0-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i11[checked]) .wps-w1-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i11:not([checked])) .wps-w1-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i11[checked]) .wps-p1-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i11:not([checked])) .wps-p1-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i11[checked]) .wps-w2-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i11:not([checked])) .wps-w2-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i11[checked]) .wps-p2-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i11:not([checked])) .wps-p2-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i11[checked]) .wps-w3-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i11:not([checked])) .wps-w3-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i11[checked]) .wps-p3-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i11:not([checked])) .wps-p3-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i11[checked]) .wps-w4-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i11:not([checked])) .wps-w4-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i11[checked]) .wps-p4-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i11:not([checked])) .wps-p4-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i11[checked]) .wps-w5-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i11:not([checked])) .wps-w5-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i11[checked]) .wps-p5-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i11:not([checked])) .wps-p5-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i11[checked]) .wps-w6-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i11:not([checked])) .wps-w6-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i11[checked]) .wps-p6-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i11:not([checked])) .wps-p6-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i11[checked]) .wps-w7-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i11:not([checked])) .wps-w7-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i11[checked]) .wps-p7-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i11:not([checked])) .wps-p7-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i11[checked]) .wps-w8-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i11:not([checked])) .wps-w8-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i11[checked]) .wps-p8-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i11:not([checked])) .wps-p8-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i11[checked]) .wps-w9-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i11:not([checked])) .wps-w9-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i11[checked]) .wps-p9-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i11:not([checked])) .wps-p9-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i11[checked]) .wps-w10-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i11:not([checked])) .wps-w10-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i11[checked]) .wps-p10-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i11:not([checked])) .wps-p10-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i11[checked]) .wps-w11-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i11:not([checked])) .wps-w11-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i11[checked]) .wps-p11-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i11:not([checked])) .wps-p11-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i11[checked]) .wps-w12-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i11:not([checked])) .wps-w12-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i11[checked]) .wps-p12-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i11:not([checked])) .wps-p12-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i11[checked]) .wps-w13-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i11:not([checked])) .wps-w13-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i11[checked]) .wps-p13-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i11:not([checked])) .wps-p13-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i11[checked]) .wps-w14-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i11:not([checked])) .wps-w14-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i11[checked]) .wps-p14-o11 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i11:not([checked])) .wps-p14-o11 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i12[checked]) .wps-w0-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i12:not([checked])) .wps-w0-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i12[checked]) .wps-p0-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i12:not([checked])) .wps-p0-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i12[checked]) .wps-w1-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i12:not([checked])) .wps-w1-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i12[checked]) .wps-p1-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i12:not([checked])) .wps-p1-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i12[checked]) .wps-w2-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i12:not([checked])) .wps-w2-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i12[checked]) .wps-p2-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i12:not([checked])) .wps-p2-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i12[checked]) .wps-w3-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i12:not([checked])) .wps-w3-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i12[checked]) .wps-p3-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i12:not([checked])) .wps-p3-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i12[checked]) .wps-w4-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i12:not([checked])) .wps-w4-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i12[checked]) .wps-p4-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i12:not([checked])) .wps-p4-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i12[checked]) .wps-w5-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i12:not([checked])) .wps-w5-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i12[checked]) .wps-p5-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i12:not([checked])) .wps-p5-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i12[checked]) .wps-w6-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i12:not([checked])) .wps-w6-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i12[checked]) .wps-p6-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i12:not([checked])) .wps-p6-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i12[checked]) .wps-w7-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i12:not([checked])) .wps-w7-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i12[checked]) .wps-p7-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i12:not([checked])) .wps-p7-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i12[checked]) .wps-w8-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i12:not([checked])) .wps-w8-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i12[checked]) .wps-p8-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i12:not([checked])) .wps-p8-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i12[checked]) .wps-w9-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i12:not([checked])) .wps-w9-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i12[checked]) .wps-p9-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i12:not([checked])) .wps-p9-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i12[checked]) .wps-w10-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i12:not([checked])) .wps-w10-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i12[checked]) .wps-p10-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i12:not([checked])) .wps-p10-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i12[checked]) .wps-w11-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i12:not([checked])) .wps-w11-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i12[checked]) .wps-p11-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i12:not([checked])) .wps-p11-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i12[checked]) .wps-w12-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i12:not([checked])) .wps-w12-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i12[checked]) .wps-p12-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i12:not([checked])) .wps-p12-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i12[checked]) .wps-w13-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i12:not([checked])) .wps-w13-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i12[checked]) .wps-p13-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i12:not([checked])) .wps-p13-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i12[checked]) .wps-w14-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i12:not([checked])) .wps-w14-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i12[checked]) .wps-p14-o12 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i12:not([checked])) .wps-p14-o12 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i13[checked]) .wps-w0-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i13:not([checked])) .wps-w0-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i13[checked]) .wps-p0-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i13:not([checked])) .wps-p0-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i13[checked]) .wps-w1-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i13:not([checked])) .wps-w1-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i13[checked]) .wps-p1-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i13:not([checked])) .wps-p1-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i13[checked]) .wps-w2-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i13:not([checked])) .wps-w2-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i13[checked]) .wps-p2-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i13:not([checked])) .wps-p2-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i13[checked]) .wps-w3-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i13:not([checked])) .wps-w3-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i13[checked]) .wps-p3-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i13:not([checked])) .wps-p3-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i13[checked]) .wps-w4-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i13:not([checked])) .wps-w4-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i13[checked]) .wps-p4-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i13:not([checked])) .wps-p4-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i13[checked]) .wps-w5-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i13:not([checked])) .wps-w5-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i13[checked]) .wps-p5-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i13:not([checked])) .wps-p5-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i13[checked]) .wps-w6-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i13:not([checked])) .wps-w6-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i13[checked]) .wps-p6-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i13:not([checked])) .wps-p6-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i13[checked]) .wps-w7-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i13:not([checked])) .wps-w7-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i13[checked]) .wps-p7-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i13:not([checked])) .wps-p7-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i13[checked]) .wps-w8-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i13:not([checked])) .wps-w8-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i13[checked]) .wps-p8-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i13:not([checked])) .wps-p8-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i13[checked]) .wps-w9-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i13:not([checked])) .wps-w9-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i13[checked]) .wps-p9-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i13:not([checked])) .wps-p9-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i13[checked]) .wps-w10-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i13:not([checked])) .wps-w10-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i13[checked]) .wps-p10-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i13:not([checked])) .wps-p10-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i13[checked]) .wps-w11-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i13:not([checked])) .wps-w11-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i13[checked]) .wps-p11-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i13:not([checked])) .wps-p11-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i13[checked]) .wps-w12-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i13:not([checked])) .wps-w12-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i13[checked]) .wps-p12-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i13:not([checked])) .wps-p12-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i13[checked]) .wps-w13-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i13:not([checked])) .wps-w13-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i13[checked]) .wps-p13-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i13:not([checked])) .wps-p13-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i13[checked]) .wps-w14-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i13:not([checked])) .wps-w14-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i13[checked]) .wps-p14-o13 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i13:not([checked])) .wps-p14-o13 {
    animation: var(--anime-off) !important;
  }

  .wps-w0:has(.wps-w0-i14[checked]) .wps-w0-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w0:has(.wps-w0-i14:not([checked])) .wps-w0-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p0:has(.wps-p0-i14[checked]) .wps-p0-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p0:has(.wps-p0-i14:not([checked])) .wps-p0-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w1:has(.wps-w1-i14[checked]) .wps-w1-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w1:has(.wps-w1-i14:not([checked])) .wps-w1-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p1:has(.wps-p1-i14[checked]) .wps-p1-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p1:has(.wps-p1-i14:not([checked])) .wps-p1-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w2:has(.wps-w2-i14[checked]) .wps-w2-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w2:has(.wps-w2-i14:not([checked])) .wps-w2-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p2:has(.wps-p2-i14[checked]) .wps-p2-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p2:has(.wps-p2-i14:not([checked])) .wps-p2-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w3:has(.wps-w3-i14[checked]) .wps-w3-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w3:has(.wps-w3-i14:not([checked])) .wps-w3-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p3:has(.wps-p3-i14[checked]) .wps-p3-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p3:has(.wps-p3-i14:not([checked])) .wps-p3-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w4:has(.wps-w4-i14[checked]) .wps-w4-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w4:has(.wps-w4-i14:not([checked])) .wps-w4-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p4:has(.wps-p4-i14[checked]) .wps-p4-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p4:has(.wps-p4-i14:not([checked])) .wps-p4-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w5:has(.wps-w5-i14[checked]) .wps-w5-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w5:has(.wps-w5-i14:not([checked])) .wps-w5-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p5:has(.wps-p5-i14[checked]) .wps-p5-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p5:has(.wps-p5-i14:not([checked])) .wps-p5-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w6:has(.wps-w6-i14[checked]) .wps-w6-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w6:has(.wps-w6-i14:not([checked])) .wps-w6-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p6:has(.wps-p6-i14[checked]) .wps-p6-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p6:has(.wps-p6-i14:not([checked])) .wps-p6-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w7:has(.wps-w7-i14[checked]) .wps-w7-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w7:has(.wps-w7-i14:not([checked])) .wps-w7-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p7:has(.wps-p7-i14[checked]) .wps-p7-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p7:has(.wps-p7-i14:not([checked])) .wps-p7-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w8:has(.wps-w8-i14[checked]) .wps-w8-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w8:has(.wps-w8-i14:not([checked])) .wps-w8-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p8:has(.wps-p8-i14[checked]) .wps-p8-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p8:has(.wps-p8-i14:not([checked])) .wps-p8-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w9:has(.wps-w9-i14[checked]) .wps-w9-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w9:has(.wps-w9-i14:not([checked])) .wps-w9-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p9:has(.wps-p9-i14[checked]) .wps-p9-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p9:has(.wps-p9-i14:not([checked])) .wps-p9-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w10:has(.wps-w10-i14[checked]) .wps-w10-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w10:has(.wps-w10-i14:not([checked])) .wps-w10-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p10:has(.wps-p10-i14[checked]) .wps-p10-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p10:has(.wps-p10-i14:not([checked])) .wps-p10-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w11:has(.wps-w11-i14[checked]) .wps-w11-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w11:has(.wps-w11-i14:not([checked])) .wps-w11-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p11:has(.wps-p11-i14[checked]) .wps-p11-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p11:has(.wps-p11-i14:not([checked])) .wps-p11-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w12:has(.wps-w12-i14[checked]) .wps-w12-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w12:has(.wps-w12-i14:not([checked])) .wps-w12-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p12:has(.wps-p12-i14[checked]) .wps-p12-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p12:has(.wps-p12-i14:not([checked])) .wps-p12-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w13:has(.wps-w13-i14[checked]) .wps-w13-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w13:has(.wps-w13-i14:not([checked])) .wps-w13-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p13:has(.wps-p13-i14[checked]) .wps-p13-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p13:has(.wps-p13-i14:not([checked])) .wps-p13-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-w14:has(.wps-w14-i14[checked]) .wps-w14-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-w14:has(.wps-w14-i14:not([checked])) .wps-w14-o14 {
    animation: var(--anime-off) !important;
  }

  .wps-p14:has(.wps-p14-i14[checked]) .wps-p14-o14 {
    animation: var(--anime-on) !important;
  }

  .wps-p14:has(.wps-p14-i14:not([checked])) .wps-p14-o14 {
    animation: var(--anime-off) !important;
  }

  /* end, 16 wirebut16bit bus and 16 wirebus16bit port, 512bit */
}
```

## example code

```html
<!DOCTYPE html>
<html>
  <head>
    <title> anime framework and anime box </title>
    <script src="https://xunr3.github.io/af.js" fetchpriority="high"></script>
    <script src="https://xunr3.github.io/ab.js" fetchpriority="high"></script>
  </head>
  <body>  
    <h1> anime framework and anime box </h1>
    <anime-framework></anime-framework>
    <anime-framework-box-extension></anime-framework-box-extension>
    <style>
      @import url("https://xunr3.github.io/bugc.css");

      .in-out:has(.in-out-in:checked) .in-out-out {
        animation: var(--anime-on);
      }

      .in-out:has(.in-out-in:not(:checked)) .in-out-out {
        animation: var(--anime-off);
      }

      .not-gate:has(.not-gate-in[checked]) .not-gate-out {
        animation: var(--anime-off);
      }

      .not-gate:has(.not-gate-in:not([checked])) .not-gate-out {
        animation: var(--anime-on);
      }
    </style>
    <table class="in-out not-gate">
      <tbody>
        <tr><td> <anime-box width="20px" height="20px" anime-box-bordering anime-coloring><input type="checkbox" class="in-out-in"></anime-box> </td><td> <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="in-out-out not-gate-in"></anime-input></anime-box> </td><td> <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="not-gate-out"></anime-input></anime-box> </td></tr>
      </tbody>
    </table>
    <div class="wps-w0">
      <div class="in-out">
        <anime-box width="20px" height="20px" anime-box-bordering anime-coloring><input type="checkbox" class="in-out-in"></anime-box> <br>
        <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="in-out-out wps-w0-i0"></anime-input></anime-box> <br>
      </div>
      <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="wps-w0-o0"></anime-input></anime-box> <br>
    </div>
    <div class="nand-gate">
      <div class="in-out">
        <anime-box width="20px" height="20px" anime-box-bordering anime-coloring><input type="checkbox" class="in-out-in"></anime-box> <br>
        <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="in-out-out nand-gate-i0"></anime-input></anime-box> <br>
      </div>
      <div class="in-out">
        <anime-box width="20px" height="20px" anime-box-bordering anime-coloring><input type="checkbox" class="in-out-in"></anime-box> <br>
        <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="in-out-out nand-gate-i1"></anime-input></anime-box> <br>
      </div>
      <anime-box width="20px" height="20px" anime-input-targeting anime-box-bordering anime-coloring><anime-input class="in-out-out nand-gate-o"></anime-input></anime-box>
    </div>
  </body>
</html>
```