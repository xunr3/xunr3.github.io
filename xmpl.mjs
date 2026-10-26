import {SRNS} from "https://xunr3.github.io/srns.mjs";

class XmplRegex extends HTMLElement {
    static #substituators = new SRNS();
    static #allowlist = new Map();
    #substituatorRef = null;
    #allowlistRef = null;
    #updateEnable = false;
    
    constructor() {
        if (new.target !== XmplRegex) throw new TypeError("Inheritance is prohibited for security reasons : XmplRegex is cannot extented or inherit. [XssMarkupProgrammingLanguage Compilation Faild \"BY PANIC MODE \"]");
        super();
        this.#substituatorRef = XmplRegex.#substituators;
        this.#allowlistRef = XmplRegex.#allowlist;
    }

    static get observedAttributes() {
        return ['xmpl-data', 'xmpl-arg0', 'xmpl-arg1', 'empty-tag'];
    }
    
    #processor(opcode, data, firstarg, lastarg) {
        const result = this.#substituatorRef.processor(opcode, data, firstarg, lastarg);
        if (opcode) this.#allowlistRef.set(data, new Set());
        else (!this.#allowlistRef.get(data).has(firstarg)) this.#allowlistRef.get(data).add(firstarg);
        return result;
    }
    
    #process() {
        const isEmpty = this.hasAttribute("empty-tag");
        if (!this.hasAttribute("xmpl-data")) throw new TypeError("xmpl-regex requires attribute xmpl-data [XssMarkupProgrammingLanguage Compilation Faild]");
        if (!this.hasAttribute("xmpl-arg0")) throw new TypeError("xmpl-regex requires attribute xmpl-arg0 [XssMarkupProgrammingLanguage Compilation Faild]");
        if (!this.hasAttribute("xmpl-arg1")) throw new TypeError("xmpl-regex requires attribute xmpl-arg1 [XssMarkupProgrammingLanguage Compilation Faild]");
        const result = this.#processor(isEmpty, this.getAttribute("xmpl-data"), this.getAttribute("xmpl-arg0"), this.getAttribute("xmpl-arg1"));
        if (!isEmpty) this.innerHTML = `<code>{escapeHtml(result)}</code>`;
    }
    
    #update() {
        this.#updateEnable = false;
        try {
            this.#process();
        } catch(err) {
            if (this.hasAttribute("force-error")) throw err;
            console.warn("[XssMarkupProgrammingLanguage Compilation Faild]");
            console.log(err.stack);
        }
        this.#updateEnable = true
    }
    
   attributeChangedCallback(name, oldValue, newValue) {
       if (this.#updateEnable) this.#update();
    }
    
    connectedCallback() {
        setTimeout(_ => this.#update(), 0);
    }
 
    static SOPIAlloweded(data, key) {
        if (XmplRegex.#allowlist.has(data)) return false;
        return XmplRegex.#allowlist.get(data).has(key);
    }
    
    static SubstituateOnlyProcessInterface(data, key, target) {
        if (XmplRegex.SOPIAlloweded(data, key)) XmplRegex.#substituators.processor(false, data, key, target);
        throw new TypeError("SOPI(SubstituateOnlyProcessInterface) Allows only SOPIAlloweded data and key, and SOPIAlloweded is actually be true when data and key is allocated");
    }
}

//kyouno music : 分かっちゃいないね / monet feat.花隈千冬
