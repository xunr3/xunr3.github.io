import {SubstituatorValueHolder, Substituator} from "https://xunr3.github.io/myJSre.mjs";

/** 
  * n.b. 
  * 
  * I'm not JS programmer.
  * 
  * # class SubstituatorLambdaStyleUse
  * 
  * - abstraction of description : use Substituator as use function. like as lambda calculus
  * - detail description : because of `(λx. λy. (λthis. λa. λb. this.use(a, b))(new SubstituatorLambdaStyleUse(x, y)))` is so lambda style, so that it named as `SubstituatorLambdaStyleUse`... and, it actually work as **lambda style constant-like allocate and use acess function**
  * 
  * > wait what is 'lambda style constant-like allocate and use acess function'?
  * 
  * it means the `(lambda x, static = {} : (lambda y : static[x](y)) if x in static else (lambda y : static.__setitem__(x, y)))` style function
  * 
  * abstraction : this is exist for use Substituator with use function as lambda style constant-like allocate and use acess function
  * 
  *  - methods
  *    + use(string key, string value) => string
  * 
  * ## use(string key, string value) => string
  * 
  * 1. when you didn't initialize the key : it work as initializer
  * 2. when you had initialized already : it work as substituator
  * 
  * 
  * ## How can this be applied
  *
  * it can applied as markup lanauge's syntax's corework
  * 
  */
export class SubstituatorLambdaStyleUse {
    #substituator = null
    
    constructor(pattern, flag) {
        this.#substituator = new Substituator(pattern, flag);
    }
    
    use(key, value) {
        if (typeof value !== 'string') throw new TypeError("SubstituatorLambdaStyleUse instance method use's parameter value must be string");
        const acessment = this.#substituator.substituatorValue(key);
        if (acessment instanceof SubstituatorValueHolder) return acessment.f(value);
        acessment.v = value;
    }
}

export const SLSU = SubstituatorLambdaStyleUse;
