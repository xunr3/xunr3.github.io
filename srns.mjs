import {SLSU} from "https://xunr3.github.io/slsu.mjs";

/** 
  * # class SlsuRegexNameSpace
  * 
  *  - abstraction of description : save an slsu and management it
  *  - detail description : well... slsu regex namespace processor...? is this.
  *  - methods
  *    + processor((maybe...) bool opcode, string data, string firstArg, string lastArg) -> string or undefined;
  * 
  * about `(maybe...)` : it means, it evaluated as truthy or falsy, just like a boolean.
  * 
  * ## processor((maybe...) bool opcode, string data, string firstArg, string lastArg) -> string or undefined;
  * 
  * 1. in opcode zero
  *   - use the use method with name as data, param as firstArg and last Arg
  * 2. in opcode one
  *   - allocate new SLSU(firstArg, lastArg) as named as string name — data
  * 
  */
export class SlsuRegexNameSpace {
    #substituators = null;
    
    constructor() {
        this.#substituators = new Map();
    }
    
    processor(opcode, data, firstArg, lastArg) {
        if (typeof data !== "string") throw new TypeError("SlsuRegexNameSpace instant method SlsuRegexNameSpace's parmeter data must be string");
        return opcode?this.substituators.set(data, new SLSU(firstArg, lastArg)):this.substituators.get(data).use(firstArg, lastArg);
    }
}

export const SRNS = SlsuRegexNameSpace;
