import { RE2 } from 'https://esm.sh/@re2tools/re2-wasm';

await RE2.initialize();

/** 
  * # class SubstituatorValueHolder
  * 
  * - abstraction of description : Substitutator's SubstituatorValue(substituator replacement object) method acessment value's VALUE HOLDER OBJECT CLASS
  * - detail description : I'm sorry, but I’m running on empty — no battery, no energy, no brain cells, no money, and zero bandwidth. I'm just drowning in pure laziness. read all docs plz.
  * - Non-configurable property (actually, for `"` object value acessor `"`, like `C++'s template-class::type acessor`)
  *   + v : value get/setible property
  * - methods
  *   + f(substituation target) = RE2's substituation result (etque, kai dem, i.e. f substituate est) that managedmented by FakeSubstituatorValueHolder
  * 
  * ## object value acessor v
  * 
  * > Q. what is this value?
  * 
  * the RE2 replacment string... yeah... that's actually substituator replacement object... value is replacement string value, and function is replacement function.
  * 
  * - nota bene warn (attention) : I've explained this so simply that I'm too stupid to make it any simpler, and I believe anyone should be able to get it by now.
  * 
  * ## method f(substituation target) = RE2's substituation result (etque, kai dem, i.e. f substituate est) that managedmented by FakeSubstituatorValueHolder
  * 
  * - nota bene warn (attention) : I've explained this so simply that I'm too stupid to make it any simpler, and I believe anyone should be able to get it by now.
  * 
  * ## Design Intent & Aimed Affordance
  * 
  * 1. as acess it by... : `substituatorObj.substituatorValue("key")`
  * 2. acess it's value (replacement string)
  *   - 1. setting it's value : `substituatorObj.substituatorValue("key").v = *value*`
  *   - 2. show it's replacement string value : `substituatorObj.substituatorValue("key").v`
  * 3. substitutatorObj substitutation : `substituatorObj.substituatorValue("key").f(target)`
  * 4. initial : read about doc of FakeSubstituatorValueHolder
  * 
  * 
  * ## Cautions [Disclaimer]
  * 
  * 1. only for Substituator.
  * 2. wrong target is not my fault
  * 
  * ### 1. only for Substituator.
  * 
  * another case is not my problem~~, anon~~.
  * 
  * (warning : I did't use 4chan! kids!! *lol*)
  * 
  * ### 2. wrong target is not my fault
  * 
  * who cares about that variable types? lol. not me.
  * 
  */
export class SubstituatorValueHolder {
    static #strictMode = false;
    #parents  = null;
    #value = "";
    
    static get strictMode() {
        return SubstituatorValueHolder.#strictMode;
    }
    
    static set strictMode(value) {
        SubstituatorValueHolder.#strictMode = !!(value);
    }
    
    #valueNormalize(value) {
        if (SubstituatorValueHolder.strictMode) {
            if (typeof value !== 'string') throw new TypeError("v(value) must be string");
        } else value = (typeof value === 'object' && value !== null)?JSON.stringify(value):String(value);
        return value;
    }
    
    constructor(parents, value) {
        this.#parents = parents;
        this.#value = this.#valueNormalize(value);
    }
    
    set v(value) {
        this.#value = this.#valueNormalize(value);
    }
    
    get v() {
        return this.#value;
    }
    
    f(target) {
        return this.#parents._regexObjreplace(target, this.#value);
    }
}

/** 
  * # FakeSubstituatorValueHolder
  * 
  * nota bene : reading doc of SubstituatorValueHolder make better to read it. well, Because the target audience is whoever reads it.
  * 
  * - abstraction of description : Substitutator's SubstituatorValue(substituator replacement object) initializer (i.e. initializer object (= constructor object)) by Fake Object of SubstituatorValueHolder
  * - detail description : I'm sorry, but I’m running on empty—no battery, no energy, no brain cells, no money, and zero bandwidth. I'm just drowning in pure laziness. read all docs plz.
  * - Write-only property (actually, for object value acessor, like `C++'s template-class::type acessor`)
  *   + v : Sorry, but I’m too lazy for this. Just check the doc of SubstituatorValueHolder.
  * 
  * ## object value acessor v : set value 2 **create theSubstituatorValue in that key.**
  * 
  * Sorry, but I’m too lazy for this. Just check the doc of SubstituatorValueHolder.
  * 
  * ## method f(substituation target) = RE2's substituation result (etque, kai dem, i.e. f substituate est) that managedmented by FakeSubstituatorValueHolder
  * 
  * Sorry, but I’m too lazy for this. Just check the doc of SubstituatorValueHolder.
  * 
  * and, you know... I didn't def  it.
  * 
  * ## Design Intent & Aimed Affordance
  * 
  * ### OVERVIEW IS ACTUALLY... SKIPPED.
  * 
  * Sorry, but I’m too lazy for this. Just check the doc of SubstituatorValueHolder.
  * 
  * ### OMITION DEISIGN
  * 
  * 1. about getter of v : because v is not defined or this object not support it.
  * 2. about method f : because v is not defined or this object not support it.
  * 3. wft? than I have Q ; Q. why not support? : Because the separation of feature among objects is the best practice, making the architecture simple yet highly beneficial. (Honestly, that was just a rationalization for the practical benefits—I was just too lazy and wanted to stick to an intuitive design and implementation.)
  * 
  * ## Cautions [Disclaimer]
  * 
  * 1. only for Substituator.
  * 
  * ### 1. only for Substituator.
  * 
  * another case is not my problem~~, anon~~.
  * 
  * (warning : I did't use 4chan! kids!! *lol*)
  * 
  */
export class FakeSubstituatorValueHolder {
    #parents  = null;
    #registerer = null;
    
    constructor(parents, registerer) {
        this.#parents = parents;
        this.#registerer = registerer;
    }
    
    set v(value) {
        this.#registerer(new SubstituatorValueHolder(this.#parents, value));
    }
    
    get v() {
        throw new TypeError("Cannot read properties of undefined (reading 'v')");
    }
}

/** 
  * # class Substituator
  * 
  *  - abstraction of description : RE2 substituation managment object class
  *  - detail description : 
  *  - methods
  *    + substituatorValue(string key) -> SubstituatorValueHolder or FakeSubstituatorValueHolder
  *    + _regexObjreplace
  * 
  * ## method substituatorValue(string key) -> SubstituatorValueHolder or FakeSubstituatorValueHolder
  * 
  *  - abstraction of description : acess the SubstituatorValue(substituator replacement object) by key
  *  - detail description : SubstituatorValue acessment is FakeSubstituatorValueHolder when key isn't register. otherwise, SubstituatorValueHolder is. plz read doc of FakeSubstituatorValueHolder and SubstituatorValueHolder
  * 
  *  - about
  *    + acessment : behavior that return substituatorValue constructing object (i.e. FakeSubstituatorValueHolder) or substituatorValue
  *    + return type when key is not registered yet : FakeSubstituatorValueHolder is returned. plz read doc of FakeSubstituatorValueHolder.
  *      * tip 4 registering key : plz read doc of FakeSubstituatorValueHolder.
  *    + return type when key is registered : substituatorValue is returned. plz read doc of substituatorValue.
  * 
  * ## Internal Method _regexObjreplace : just action as RE2 object's replace function behavior...
  * 
  * - tip : this method is not for Substituator instance user but for Substituator class developer also allow to use. but 'Not for the faint of heart.'
  * 
  * ## Cautions [Disclaimer]
  * 
  * 1. becarefull about get mulitple Fake Object
  * 
  * ### 1. becarefull about get mulitple Fake Object
  * 
  * I won't stop the idiotic act of preparing a Fake for a complete memory refresh, so Better watch your code step lmao (To put it nicely, everything depends on how you handle it.)
  * 
  * ## n.b. 
  * 
  * I'm not JS programmer.
  * 
  */
export class Substituator {
    #regexObj = null;
    #substituatorValue = null;
    
    constructor(pattern, flag) {
        this.#substituatorValue = new Map();
        this.#regexObj = new RE2(pattern, flag);
    }
    
    _regexObjreplace(x, y) {
        return this.#regexObj.replace(x, y);
    }
    
    substituatorValue(key) {
        if (typeof key !== 'string') throw new TypeError("substituatorValue's key must be string");
        return this.#substituatorValue.has(key)?this.#substituatorValue.get(key):(new FakeSubstituatorValueHolder(this, o => this.#substituatorValue.set(key, o)));
    }
}
