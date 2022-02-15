/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),i=new Map;class o{constructor(t,i){if(this._$cssResult$=!0,i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=i.get(this.cssText);return t&&void 0===e&&(i.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const n=(t,...i)=>{const n=1===t.length?t[0]:i.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new o(n,e)},s=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new o("string"==typeof t?t:t+"",e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r;const l=window.trustedTypes,a=l?l.emptyScript:"",d=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},c=(t,e)=>e!==t&&(e==e||t==t),u={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:c};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Eh(i,e);void 0!==o&&(this._$Eu.set(o,i),t.push(o))})),t}static createProperty(t,e=u){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{t?e.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((t=>{const i=document.createElement("style"),o=window.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=u){var o,n;const s=this.constructor._$Eh(t,i);if(void 0!==s&&!0===i.reflect){const r=(null!==(n=null===(o=i.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==n?n:h.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Ei=null}}_$AK(t,e){var i,o,n;const s=this.constructor,r=s._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=s.getPropertyOptions(r),l=t.converter,a=null!==(n=null!==(o=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==o?o:"function"==typeof l?l:null)&&void 0!==n?n:h.fromAttribute;this._$Ei=r,this[r]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:p}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.2.2");const m=globalThis.trustedTypes,v=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,_="?"+f,y=`<${_}>`,b=document,$=(t="")=>b.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,M=/>/g,x=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,C=/'/g,k=/"/g,T=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),N=new WeakMap,O=b.createTreeWalker(b,129,null,!1),U=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",r=E;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===E?"!--"===a[1]?r=S:void 0!==a[1]?r=M:void 0!==a[2]?(T.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=x):void 0!==a[3]&&(r=x):r===x?">"===a[0]?(r=null!=n?n:E,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?x:'"'===a[3]?k:C):r===k||r===C?r=x:r===S||r===M?r=E:(r=x,n=void 0);const c=r===x&&t[e+1].startsWith("/>")?" ":"";s+=r===E?i+y:d>=0?(o.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+f+c):i+f+(-2===d?(o.push(void 0),e):c)}const l=s+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==v?v.createHTML(l):l,o]};class R{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,l=this.parts,[a,d]=U(t,e);if(this.el=R.createElement(a,i),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=O.nextNode())&&l.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=d[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?K:"@"===e[1]?j:B})}else l.push({type:6,index:n})}for(const e of t)o.removeAttribute(e)}if(T.test(o.tagName)){const t=o.textContent.split(f),e=t.length-1;if(e>0){o.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],$()),O.nextNode(),l.push({type:2,index:++n});o.append(t[e],$())}}}else if(8===o.nodeType)if(o.data===_)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(f,t+1));)l.push({type:7,index:n}),t+=f.length-1}n++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}}function L(t,e,i=t,o){var n,s,r,l;if(e===H)return e;let a=void 0!==o?null===(n=i._$Cl)||void 0===n?void 0:n[o]:i._$Cu;const d=w(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(s=null==a?void 0:a._$AO)||void 0===s||s.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,o)),void 0!==o?(null!==(r=(l=i)._$Cl)&&void 0!==r?r:l._$Cl=[])[o]=a:i._$Cu=a),void 0!==a&&(e=L(t,a._$AS(t,e.values),a,o)),e}class I{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:b).importNode(i,!0);O.currentNode=n;let s=O.nextNode(),r=0,l=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new z(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new q(s,this,t)),this.v.push(e),a=o[++l]}r!==(null==a?void 0:a.index)&&(s=O.nextNode(),r++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class z{constructor(t,e,i,o){var n;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cg=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),w(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==P&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(b.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=R.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new I(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=N.get(t.strings);return void 0===e&&N.set(t.strings,e=new R(t)),e}A(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new z(this.M($()),this.M($()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,o,n){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=L(this,t,e,0),s=!w(t)||t!==this._$AH&&t!==H,s&&(this._$AH=t);else{const o=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=L(this,o[i+r],e,r),l===H&&(l=this._$AH[r]),s||(s=!w(l)||l!==this._$AH[r]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}s&&!o&&this.k(t)}k(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends B{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===P?void 0:t}}const V=m?m.emptyScript:"";class K extends B{constructor(){super(...arguments),this.type=4}k(t){t&&t!==P?this.element.setAttribute(this.name,V):this.element.removeAttribute(this.name)}}class j extends B{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=L(this,t,e,0))&&void 0!==i?i:P)===H)return;const o=this._$AH,n=t===P&&o!==P||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==P&&(o===P||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const Z=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W,X;null==Z||Z(R,z),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.1.3");class Y extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=s._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=r=new z(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return H}}Y.finalized=!0,Y._$litElement$=!0,null===(W=globalThis.litElementHydrateSupport)||void 0===W||W.call(globalThis,{LitElement:Y});const G=globalThis.litElementPolyfillSupport;null==G||G({LitElement:Y}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.1.2");var J=window.CustomEvent;function Q(t,e){var i="on"+e.type.toLowerCase();return"function"==typeof t[i]&&t[i](e),t.dispatchEvent(e)}function tt(t){for(;t;){if("dialog"===t.localName)return t;t=t.parentElement?t.parentElement:t.parentNode?t.parentNode.host:null}return null}function et(t){for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;t&&t.blur&&t!==document.body&&t.blur()}function it(t,e){for(var i=0;i<t.length;++i)if(t[i]===e)return!0;return!1}function ot(t){return!(!t||!t.hasAttribute("method"))&&"dialog"===t.getAttribute("method").toLowerCase()}function nt(t){var e=["button","input","keygen","select","textarea"].map((function(t){return t+":not([disabled])"}));e.push('[tabindex]:not([disabled]):not([tabindex=""])');var i=t.querySelector(e.join(", "));if(!i&&"attachShadow"in Element.prototype)for(var o=t.querySelectorAll("*"),n=0;n<o.length&&!(o[n].tagName&&o[n].shadowRoot&&(i=nt(o[n].shadowRoot)));n++);return i}function st(t){return t.isConnected||document.body.contains(t)}function rt(t){if(t.submitter)return t.submitter;var e=t.target;if(!(e instanceof HTMLFormElement))return null;var i=dt.formSubmitter;if(!i){var o=t.target;i=("getRootNode"in o&&o.getRootNode()||document).activeElement}return i&&i.form===e?i:null}function lt(t){if(!t.defaultPrevented){var e=t.target,i=dt.imagemapUseValue,o=rt(t);null===i&&o&&(i=o.value);var n=tt(e);if(n)"dialog"===(o&&o.getAttribute("formmethod")||e.getAttribute("method"))&&(t.preventDefault(),null!=i?n.close(i):n.close())}}function at(t){if(this.dialog_=t,this.replacedStyleTop_=!1,this.openAsModal_=!1,t.hasAttribute("role")||t.setAttribute("role","dialog"),t.show=this.show.bind(this),t.showModal=this.showModal.bind(this),t.close=this.close.bind(this),t.addEventListener("submit",lt,!1),"returnValue"in t||(t.returnValue=""),"MutationObserver"in window){new MutationObserver(this.maybeHideModal.bind(this)).observe(t,{attributes:!0,attributeFilter:["open"]})}else{var e,i=!1,o=function(){i?this.downgradeModal():this.maybeHideModal(),i=!1}.bind(this),n=function(n){if(n.target===t){var s="DOMNodeRemoved";i|=n.type.substr(0,s.length)===s,window.clearTimeout(e),e=window.setTimeout(o,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach((function(e){t.addEventListener(e,n)}))}Object.defineProperty(t,"open",{set:this.setOpen.bind(this),get:t.hasAttribute.bind(t,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}J&&"object"!=typeof J||(J=function(t,e){e=e||{};var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,!!e.bubbles,!!e.cancelable,e.detail||null),i},J.prototype=window.Event.prototype),at.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&st(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),dt.dm.removeDialog(this))},setOpen:function(t){t?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(t){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var e=document.createElement("div");this.dialog_.insertBefore(e,this.dialog_.firstChild),e.tabIndex=-1,e.focus(),this.dialog_.removeChild(e)}var i=document.createEvent("MouseEvents");i.initMouseEvent(t.type,t.bubbles,t.cancelable,window,t.detail,t.screenX,t.screenY,t.clientX,t.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,t.button,t.relatedTarget),this.dialog_.dispatchEvent(i),t.stopPropagation()},focus_:function(){var t=this.dialog_.querySelector("[autofocus]:not([disabled])");!t&&this.dialog_.tabIndex>=0&&(t=this.dialog_),t||(t=nt(this.dialog_)),et(document.activeElement),t&&t.focus()},updateZIndex:function(t,e){if(t<e)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=t,this.backdrop_.style.zIndex=e},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!st(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!dt.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");(function(t){for(;t&&t!==document.body;){var e=window.getComputedStyle(t),i=function(t,i){return!(void 0===e[t]||e[t]===i)};if(e.opacity<1||i("zIndex","auto")||i("transform","none")||i("mixBlendMode","normal")||i("filter","none")||i("perspective","none")||"isolate"===e.isolation||"fixed"===e.position||"touch"===e.webkitOverflowScrolling)return!0;t=t.parentElement}return!1})(this.dialog_.parentElement)&&console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context"),this.setOpen(!0),this.openAsModal_=!0,dt.needsCentering(this.dialog_)?(dt.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(t){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),void 0!==t&&(this.dialog_.returnValue=t);var e=new J("close",{bubbles:!1,cancelable:!1});Q(this.dialog_,e)}};var dt={reposition:function(t){var e=document.body.scrollTop||document.documentElement.scrollTop,i=e+(window.innerHeight-t.offsetHeight)/2;t.style.top=Math.max(e,i)+"px"},isInlinePositionSetByStylesheet:function(t){for(var e=0;e<document.styleSheets.length;++e){var i=document.styleSheets[e],o=null;try{o=i.cssRules}catch(t){}if(o)for(var n=0;n<o.length;++n){var s=o[n],r=null;try{r=document.querySelectorAll(s.selectorText)}catch(t){}if(r&&it(r,t)){var l=s.style.getPropertyValue("top"),a=s.style.getPropertyValue("bottom");if(l&&"auto"!==l||a&&"auto"!==a)return!0}}}return!1},needsCentering:function(t){return"absolute"===window.getComputedStyle(t).position&&(!("auto"!==t.style.top&&""!==t.style.top||"auto"!==t.style.bottom&&""!==t.style.bottom)&&!dt.isInlinePositionSetByStylesheet(t))},forceRegisterDialog:function(t){if((window.HTMLDialogElement||t.showModal)&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",t),"dialog"!==t.localName)throw new Error("Failed to register dialog: The element is not a dialog.");new at(t)},registerDialog:function(t){t.showModal||dt.forceRegisterDialog(t)},DialogManager:function(){this.pendingDialogStack=[];var t=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",function(e){this.forwardTab_=void 0,e.stopPropagation(),t([])}.bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver((function(e){var i=[];e.forEach((function(t){for(var e,o=0;e=t.removedNodes[o];++o)e instanceof Element&&("dialog"===e.localName&&i.push(e),i=i.concat(e.querySelectorAll("dialog")))})),i.length&&t(i)})))}};if(dt.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})},dt.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()},dt.DialogManager.prototype.updateStacking=function(){for(var t,e=this.zIndexHigh_,i=0;t=this.pendingDialogStack[i];++i)t.updateZIndex(--e,--e),0===i&&(this.overlay.style.zIndex=--e);var o=this.pendingDialogStack[0];o?(o.dialog.parentNode||document.body).appendChild(this.overlay):this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)},dt.DialogManager.prototype.containedByTopDialog_=function(t){for(;t=tt(t);){for(var e,i=0;e=this.pendingDialogStack[i];++i)if(e.dialog===t)return 0===i;t=t.parentElement}return!1},dt.DialogManager.prototype.handleFocus_=function(t){var e=t.composedPath?t.composedPath()[0]:t.target;if(!this.containedByTopDialog_(e)&&document.activeElement!==document.documentElement&&(t.preventDefault(),t.stopPropagation(),et(e),void 0!==this.forwardTab_)){var i=this.pendingDialogStack[0];return i.dialog.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?i.focus_():e!==document.documentElement&&document.documentElement.focus()),!1}},dt.DialogManager.prototype.handleKey_=function(t){if(this.forwardTab_=void 0,27===t.keyCode){t.preventDefault(),t.stopPropagation();var e=new J("cancel",{bubbles:!1,cancelable:!0}),i=this.pendingDialogStack[0];i&&Q(i.dialog,e)&&i.dialog.close()}else 9===t.keyCode&&(this.forwardTab_=!t.shiftKey)},dt.DialogManager.prototype.checkDOM_=function(t){this.pendingDialogStack.slice().forEach((function(e){-1!==t.indexOf(e.dialog)?e.downgradeModal():e.maybeHideModal()}))},dt.DialogManager.prototype.pushDialog=function(t){var e=(this.zIndexHigh_-this.zIndexLow_)/2-1;return!(this.pendingDialogStack.length>=e)&&(1===this.pendingDialogStack.unshift(t)&&this.blockDocument(),this.updateStacking(),!0)},dt.DialogManager.prototype.removeDialog=function(t){var e=this.pendingDialogStack.indexOf(t);-1!==e&&(this.pendingDialogStack.splice(e,1),0===this.pendingDialogStack.length&&this.unblockDocument(),this.updateStacking())},dt.dm=new dt.DialogManager,dt.formSubmitter=null,dt.imagemapUseValue=null,void 0===window.HTMLDialogElement){var ht=document.createElement("form");if(ht.setAttribute("method","dialog"),"dialog"!==ht.method){var ct=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(ct){var ut=ct.get;ct.get=function(){return ot(this)?"dialog":ut.call(this)};var pt=ct.set;ct.set=function(t){return"string"==typeof t&&"dialog"===t.toLowerCase()?this.setAttribute("method",t):pt.call(this,t)},Object.defineProperty(HTMLFormElement.prototype,"method",ct)}}document.addEventListener("click",(function(t){if(dt.formSubmitter=null,dt.imagemapUseValue=null,!t.defaultPrevented){var e=t.target;if("composedPath"in t)e=t.composedPath().shift()||e;if(e&&ot(e.form)){if(!("submit"===e.type&&["button","input"].indexOf(e.localName)>-1)){if("input"!==e.localName||"image"!==e.type)return;dt.imagemapUseValue=t.offsetX+","+t.offsetY}tt(e)&&(dt.formSubmitter=e)}}}),!1),document.addEventListener("submit",(function(t){var e=t.target;if(!tt(e)){var i=rt(t);"dialog"===(i&&i.getAttribute("formmethod")||e.getAttribute("method"))&&t.preventDefault()}}));var gt=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){if(!ot(this))return gt.call(this);var t=tt(this);t&&t.close()}}let mt=0,vt=0,ft=null;document.addEventListener("mouseup",(function(t){ft&&document.removeEventListener("mousemove",ft,!0)}),!0);class _t extends Y{static styles=n`:host{height:100vh;width:100vw;display:flex;flex-direction:column;overflow:none}#main-article{flex-grow:1;display:flex;flex-direction:column}#main-section{overflow:auto;border:1px solid orange;resize:vertical}#main-aside{overflow:auto;border:1px solid green;flex-grow:1}hr{cursor:row-resize;height:1em;margin:0;border:1px solid;text-align:center}hr:before{content:"\\2022 \\2022 \\2022"}`;static get properties(){return{rand:{type:Number}}}constructor(){super(),this.dialog=null}firstUpdated(t){this.dialog=this.shadowRoot.querySelector("#app-dialog"),dt.registerDialog(this.dialog),this.dialog.addEventListener("cancel",(t=>{console.log("cancel",this.rand),this.rand>.5&&(t.preventDefault(),t.stopPropagation(),console.log("prevent esc"))}))}render(){return D`<header><h1>Borrey Kim</h1></header><nav></nav><article id="main-article"><section id="main-section" class="column-1">Hello world</section><hr title="resize section" role="separator" @mousedown="${this._splitmousedown}" @blur="${this._splitblur}" @focus="${this._splitfocus}" id="main-split" tabindex="0"><aside id="main-aside" class="column-3">Asside</aside></article><footer><button @click="${this._dialog}">Click Me!</button> <button @click="${this._rand}">Random:</button> <span>Rand: ${this.rand}</span></footer><dialog id="app-dialog">hello</dialog>`}_rand(t){this.rand=Math.random()}_dialog(t){console.log("dialog"),this.dialog.showModal()}_splitKeyHandler(t){const e=t||window.event;"38"==e.keyCode||e.keyCode}_splitmousedown(t){mt=t.clientX,vt=t.clientY,this.section=this.shadowRoot.querySelector("#main-section"),this.shadowRoot.querySelector("#main-split").focus(),ft=this.mouseMoveHandler.bind(this),this.sectionHeight=this.section.getBoundingClientRect().height,document.addEventListener("mousemove",ft,!0),document.addEventListener("mouseup",this.mouseUpHandler.bind(this),!0)}_splitfocus(t){console.log("focus")}_splitblur(t){console.log("blur")}mouseMoveHandler(t){t.clientX;const e=t.clientY-vt,i=100*(this.sectionHeight+e)/this.section.parentNode.getBoundingClientRect().height;this.section.style.height=`${i}%`}}window.customElements.define("borrey-app",_t);export{_t as BorreyApp};
