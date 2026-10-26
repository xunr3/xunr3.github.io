import { RE2 } from 'https://esm.sh/@re2tools/re2-wasm';

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

/* 뇌내 디버깅

0. SubstituatorValueHolder인스턴트에서 get v의 경우 : 변수가 항상 존재해서 작동하나, 값의 반환은, 값이 정상 설정되어야함을 전재하고있다.
1. SubstituatorValueHolder인스턴트에서 f가 실행된 경우... 일단은, parents가 초기와 좆빻은 경우 빼고는, parents가 있으니까, parents가 정상적이지 않은 경우는, SubstituatorValueHolder를 Substituator에서 생성하지 않았거나, 아니면 Substituator로직이 잘못된 경우밖에 없을거야. 그러니 그 경우는 수정사항 없이 문서에, "only for Substituator. another case is not my problem~~, anon~~." 이렇게 알바노를 박아서 경고하고, `return this.#parents._regexObjreplace(target, this.#value);`자체는 옳은 리턴문에, this.#parents의 _regexObjreplace(target, this.#value)메서드를 호출하고 있어. 해당하는 메서드를 찾아서 인자가 옳은지 살펴보자면, ...
 - target은 뭐, 재대로 안됫을리가 없기에, 전부 정상작동함.
2. SubstituatorValueHolder인스턴트에서 set v의 경우 : 에초에 constructor든 이거든, value설정은 코드상 this.#valueNormalize로직으로 동일하게 처리됨을 알수 있다.
3. SubstituatorValueHolder인스턴트에서 this.#valueNormalize의 경우 : `SubstituatorValueHolder.strictMode`를 불리언값으로 취급해서 분기하고있는데, 에초에 걍 불리언으로 취급이 알아서 "아주 잘 한다"... 예기치 못한 문제? 모르겠고, 그건 사실 static set strictMode에서 불리언을 넣어야 하는거고, falsy나 truthy라는 표준적인 방식을 생각 못한 문제는 알바노ㅋㅋㅋㅋㅋㅋㅋ.... 그리고 strictMode의 기본값이 false인것도, 게터세터도 아주 잘 되어있으니 문제없다.... 그렇지 않은가? 다음 줄을 보면, `if (typeof value !== 'string') throw new TypeError("v(value) must be string")`에서 세미콜론 하나 넣고, `typeof value !== 'string'`랑, 타입에러 관용구 구문 자체도 정상이라서... 흠.... mundainai desu... `else value = (typeof value === 'object' && value !== null)?JSON.stringify(value):String(value);`에서도 구문도 정상, 삼항연산식도 잘 파싱되고, 그냥 냅다 문자열화하는 두가지 방법도 정상.... 인자도 정상이니까, 실행했을때 의도한 동작을 내고.... 전체 함수식을 봤을떄, 두가지 분기라는 케이스를 각각, 좌측에 strict, 우측에 non-strict, 상단측면에 string, 하단측면에 non-string을 넣으면, 좌상단, 우상단에 검사기제와 문자열화가 정상작동하고, 좌하단의 정상작동은 이미 보장되고, 우하단의 경우엔, 문자열화를 앞서 고려한 바 있다.
5. FakeSubstituatorValueHolder의 get v는 항상 의도한대로 동작한다... 아니면 시발 미쳐돌아가는거고.
6. FakeSubstituatorValueHolder의 set v는? ... `this.#registerer(new SubstituatorValueHolder(this.#parents, value))`를 실행하므로, this.#registerer가 정상적이여야 한다. 여기도 똫같이 알바노 마인드 주의문서를 만들 필요성이 생겼다. 칙쇼!, `new SubstituatorValueHolder(this.#parents, value)`는 옳은 생성 구문이므로 문제없다. 에초에 this.#parents는 옳을것이고, value가 틀린경우는, 이미 SubstituatorValueHolder가 훌륭히 처리해준다.
7. FakeSubstituatorValueHolder의 constructor과 기밀변수등은, 기본적으로 세팅 오류가 나는 경우는 책임 안지는 경우를 말곤 정석적으로 처리됨이 보장되어있다. 그러니... 휴, 이제 마지막으로, Substituator를 뇌내 디버깅해보자.
8. Substituator의 #regexObj의 경우엔, 생성자의 초기화에서 지랄나는 경우를 제외하고는 문제의 여지가 없다. 그런 경우엔 뭐.... 애초에 RE2가 정상적으로 아주 잘 에러를 내주지 않겠는가?
9. _regexObjreplace의 경우엔, 지금까지 문제없었다는, 나의 뇌내 디버깅이 맞았을때, 작동할 뿐이다. 인자가 틀렸을때 에러마저 replace와 동작이 같은것도 의도대로 잘 작동하는 바이니...
10. substituatorValue가 잘 작동할것인가가, 당연히 이 모든 프로그램에서 가장 중요한 지점일것이다. 일단, `if (typeof key !== 'string') throw new TypeError("substituatorValue's key must be string");`는 정상작동하고, `(key in this.#substituatorValue)?this.#substituatorValue[key]:(new FakeSubstituatorValueHolder(this, o => {this.#substituatorValue[key] = o;}));`를 리턴하는것도 로직을 잘 골랐기에, FakeSubstituatorValueHolder가 훌륭히 재 역할을 해준다면, substituatorValue를 인덱싱하는것이 잘 동작하지 않을리가 없다. 인자로 부모와, `o => {this.#substituatorValue[key] = o;}`람다를 넣어준것이, FakeSubstituatorValueHolder로 하여금 의도한대로 작동한다면, SubstituatorValueHolder가 정상적으로 1회 할당된다. 야호! 어짜피 2회 할당되는 경우도 1회랑 불필요한 변수 외에 동형이지 않는가. 끼얏호ㅋㅋㅋ. 에초에 메모리 문제나서 죽는 마친짓은, 이 메서드에서 여러 페이크를 존나 올려놓고, 존나 꼬이게 실행하는 경우인데. 그런 경우는 알바노다. "완전한 메모리 갱신용으로 Fake를 준비하는 병신짓은 막지 않을테니 알아서 하십시오" 라는것이다. 하... 이제 `o => {this.#substituatorValue[key] = o;}`를 보자. 그냥 객체를 받아 할당하는거다. 어? 잘 작동할텐데. 뇌내 작동을 돌려보니 잘된다. 끼얏호! 정말로 쉽게 모든 뇌내 디버깅을 마쳤다.

아 근데, 라틴어와 그리스어, 영어와 4chan식 영어와 개발자식 영어, 번역된 고급표현과, 문서식 서술과 구어체/문어체식 서술이 섞인 docs를 vs코드에서 클래스에 마우스 호버해서 도큐먼트로 본다면 ㄹㅇ 간떨어지긴 할듯 ㅋㅋㅋㅋ

수정 : object시발 개같은거라서, #substituatorValue의 타입 자체를 Map으로 뜯어고침.

최종코드는 그렇게 완성된것임.

작동상 버그 없겠지? 이제 메모장 말고 재대로 디버깅하러 가야지 ㅋㅋ
*/
