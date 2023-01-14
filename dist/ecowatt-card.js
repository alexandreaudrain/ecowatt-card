function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}))},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v};let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.5.0");const y=window,$=y.trustedTypes,m=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,A="?"+b,E=`<${A}>`,w=document,S=(t="")=>w.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,P=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),R=/'/g,D=/"/g,H=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),N=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),M=new WeakMap,j=w.createTreeWalker(w,129,null,!1),z=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=k;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===k?"!--"===l[1]?r=O:void 0!==l[1]?r=U:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=P):void 0!==l[3]&&(r=P):r===P?">"===l[0]?(r=null!=o?o:k,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?P:'"'===l[3]?D:R):r===D||r===R?r=P:r===O||r===U?r=k:(r=P,o=void 0);const d=r===P&&t[e+1].startsWith("/>")?" ":"";n+=r===k?i+E:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+b+d):i+b+(-2===c?(s.push(void 0),e):d)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==m?m.createHTML(a):a,s]};class V{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=z(t,e);if(this.el=V.createElement(l,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=j.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Z:"@"===e[1]?F:W})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(H.test(s.tagName)){const t=s.textContent.split(b),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),j.nextNode(),a.push({type:2,index:++o});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(b,t+1));)a.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){var o,n,r,a;if(e===N)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=x(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,s)),e}class B{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:w).importNode(i,!0);j.currentNode=o;let n=j.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new q(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new G(n,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=j.nextNode(),r++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class q{constructor(t,e,i,s){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),x(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==N&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==L&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new B(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=M.get(t.strings);return void 0===e&&M.set(t.strings,e=new V(t)),e}k(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new q(this.O(S()),this.O(S()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,i,s,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=I(this,t,e,0),n=!x(t)||t!==this._$AH&&t!==N,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=I(this,s[i+r],e,r),a===N&&(a=this._$AH[r]),n||(n=!x(a)||a!==this._$AH[r]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const K=$?$.emptyScript:"";class Z extends W{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class F extends W{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:L)===N)return;const s=this._$AH,o=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==L&&(s===L||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class G{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const Q=y.litHtmlPolyfillSupport;null==Q||Q(V,q),(null!==(_=y.litHtmlVersions)&&void 0!==_?_:y.litHtmlVersions=[]).push("2.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var X,Y;class tt extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new q(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return N}}tt.finalized=!0,tt._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,st=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ot(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):st(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function nt(t){return ot({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var rt,at,lt;null===(rt=window.HTMLSlotElement)||void 0===rt||rt.prototype.assignedElements,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(at||(at={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(lt||(lt={}));var ct={version:"Version",invalid_configuration:"Invalid configuration"},ht={common:ct},dt={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration"},ut={common:dt};const pt={en:Object.freeze({__proto__:null,common:ct,default:ht}),nb:Object.freeze({__proto__:null,common:dt,default:ut})};function vt(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let o;try{o=t.split(".").reduce(((t,e)=>t[e]),pt[s])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),pt.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),pt.en)),""!==e&&""!==i&&(o=o.replace(e,i)),o}const ft=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)})`
    .days-container {
      display: flex;
      width: 90%;
      margin: auto;
    }
    .day-container {
      float: left;
      width: 25%;
    }
    .day {
      border-radius: 10px;
      padding: 10px;
      margin: 2px;
      text-align: center;
      font-weight: bold;
      color: white;
      /* transition */
      transition: 0.3s;
    }
    .focus {
      font-size: 1.5em;
    }
    .dayLevel1 {
      background-color: var(--color1, #02f0c6);
    }
    .dayLevel2 {
      background-color: var(--color2, #f2790f);
    }
    .dayLevel3 {
      background-color: var(--color3, #e63946);
    }

    .status-container {
      padding: 10px;
    }
    .status {
      width: 90%;
      padding: 10px;
      margin: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
    }

    .hours-container {
      display: flex;
      width: 90%;
      margin: auto;
      padding-bottom: 20px;
    }
    .hours-container .hour:first-child {
      border-top-left-radius: 60px;
      border-bottom-left-radius: 60px;
    }
    .hours-container .hour:not(:last-child) {
      margin-right: 1px;
    }
    .hours-container .hour:last-child {
      border-top-right-radius: 60px;
      border-bottom-right-radius: 60px;
    }
    .hour {
      position: relative;
      height: 30px;
      flex: 1 1 0%;
    }
    .hourLevel1 {
      background-color: var(--color1, #02f0c6);
    }
    .hourLevel2 {
      background-color: var(--color2, #f2790f);
    }
    .hourLevel3 {
      background-color: var(--color3, #e63946);
    }
    .hourLabel {
      position: absolute;
      bottom: -20px;
      left: -8px;
      font-size: 12px;
    }
    .hours-container .hour:nth-child(even) .hourLabel {
      /* n'affiche qu'une heure sur deux */
      display: none;
    }

    .ecowatt-error {
      background-color: red;
      color: white;
      padding: 10px;
    }
`
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;let gt=class extends(function(t){return class extends t{createRenderRoot(){const t=this.constructor,{registry:e,elementDefinitions:i,shadowRootOptions:s}=t;i&&!e&&(t.registry=new CustomElementRegistry,Object.entries(i).forEach((([e,i])=>t.registry.define(e,i))));const o=this.renderOptions.creationScope=this.attachShadow({...s,customElements:t.registry});return r(o,this.constructor.elementStyles),o}}}(tt)){constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t}firstUpdated(){console.log("EDITOR : firstUpdated"),this.loadEntityPicker()}async loadEntityPicker(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.customElements;if(!e)return;if(e.get("ha-entity-picker"))return;const i=await window.loadCardHelpers(),s=await i.createCardElement({type:"entities",entities:[]});await s.constructor.getConfigElement();const o=window.customElements.get("ha-entity-picker");e.define("ha-entity-picker",o);const n=window.customElements.get("ha-textfield");e.define("ha-textfield",n)}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _color1(){var t;return(null===(t=this._config)||void 0===t?void 0:t.color1)||""}get _color2(){var t;return(null===(t=this._config)||void 0===t?void 0:t.color2)||""}get _color3(){var t;return(null===(t=this._config)||void 0===t?void 0:t.color3)||""}render(){return T`
      <ha-entity-picker
        label="Entité"
        allow-custom-entity
        editable
        .hass=${this.hass}
        .value=${this._entity}
        .configValue=${"entity"}
        @value-changed=${this._valueChanged}
      ></ha-entity-picker>

      <ha-textfield
        label="Titre (Optionel)"
        .hass=${this.hass}
        .value=${this._name}
        .configValue=${"name"}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>

      <ha-textfield
        label="Couleur Situation normale (Optionnel)"
        .hass=${this.hass}
        .value=${this._color1}
        .configValue=${"color1"}
        @input=${this._valueChanged}
        style='display: flex; padding-top: 10px'
      ></ha-textfield>
      <ha-textfield
        label="Couleur Risque de coupures (Optionnel)"
        .hass=${this.hass}
        .value=${this._color2}
        .configValue=${"color2"}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>
      <ha-textfield
        label="Couleur Coupures programmées (Optionnel)"
        .hass=${this.hass}
        .value=${this._color3}
        .configValue=${"color3"}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&(this._initialized=!0)}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});!function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});o.detail=i,t.dispatchEvent(o)}(this,"config-changed",{config:this._config})}}};gt.elementDefinitions={"ha-card":customElements.get("ha-card")},t([ot({attribute:!1})],gt.prototype,"hass",void 0),t([nt()],gt.prototype,"_config",void 0),gt=t([it("ecowatt-card-editor")],gt),console.info(`%c  ECOWATT-CARD \n%c  ${vt("common.version")} 1.0.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ecowatt-card",name:"EcoWatt Card",description:"A custom card for EcoWatt"});let _t=class extends tt{constructor(){super(...arguments),this.selectedDay=0}static getConfigElement(){return document.createElement("ecowatt-card-editor")}static getStubConfig(){return{name:"EcoWatt"}}setConfig(t){if(!t)throw new Error(vt("common.invalid_configuration"));t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign({},t)}shouldUpdate(t){return!!this.config&&function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}render(){if(!this.config.entity)return this._showError("Entity required");if(this.hass){const t=this.hass.states[this.config.entity];if(!t)return this._showError("No state found");if(!t.attributes)return this._showError("No attribute found");if(!t.attributes.signals)return this._showError("No EcoWatt data found")}return this.setData(),T`
      <ha-card
        .header=${this.config.name}
        tabindex="0"
      >
        ${this._renderSpacer()}
        ${this._renderDays()}
        <div class="status-container">
          ${this._renderStatus()}
          ${this._renderHours()}
        </div>
        ${this._renderStyle()}
      </ha-card>
    `}_renderSpacer(){return this.config.name?T``:T`<div style='padding-top: 10px;'></div>`}_renderDays(){const t=this.config.data,e=this.selectedDay;return T`
      <div class="days-container">
        <div class="day-container" @click=${()=>this.selectedDay=0}><div class="day ${"dayLevel"+t.days[0].level} ${0==e?"focus":""}">${t.days[0].strDay}</div></div>
        <div class="day-container" @click=${()=>this.selectedDay=1}><div class="day ${"dayLevel"+t.days[1].level} ${1==e?"focus":""}">${t.days[1].strDay}</div></div>
        <div class="day-container" @click=${()=>this.selectedDay=2}><div class="day ${"dayLevel"+t.days[2].level} ${2==e?"focus":""}">${t.days[2].strDay}</div></div>
        <div class="day-container" @click=${()=>this.selectedDay=3}><div class="day ${"dayLevel"+t.days[3].level} ${3==e?"focus":""}">${t.days[3].strDay}</div></div>
      </div>
    `}_renderStatus(){return T`
      <div class="status">${this.config.data.days[this.selectedDay].message}</div>
    `}_renderHours(){const t=this.config.data.days[this.selectedDay].hours.map((t=>T`<div class="hour ${"hourLevel"+t.level}"><div class="hourLabel">${t.step+"h"}</div></div>`));return T`
      <div class="hours-container">
        ${t}
      </div>
    `}_renderStyle(){let t="";return t+=this.config.color1?"--color1: "+this.config.color1+";":"",t+=this.config.color2?"--color2: "+this.config.color2+";":"",t+=this.config.color3?"--color3: "+this.config.color3+";":"",""!=t?T`
        <style>
          ${":host {"+t+"}"}
        </style>
      `:T``}setData(){const t=this.config,e=this.hass.states[t.entity],i=new Date(e.attributes.signals[0].jour),s=["DIM","LUN","MAR","MER","JEU","VEN","SAM"];this.config.data={generation:i,days:[]};const o=[];for(let t=0;t<e.attributes.signals.length;t++){const i=e.attributes.signals[t],n=[];for(let t=0;t<i.values.length;t++)n.push({step:i.values[t].pas,level:i.values[t].hvalue});o.push({day:new Date(i.jour),strDay:s[new Date(i.jour).getDay()],level:i.dvalue,message:i.message,hours:n})}this.config.data.days=o.sort(((t,e)=>t.day.getTime()-e.day.getTime()))}_showError(t){return T`
    <ha-card tabindex="0">
      <div class="ecowatt-error">${t}</div>
    </ha-card>
    ${ft}
    `}};_t.styles=ft,t([ot({attribute:!1})],_t.prototype,"hass",void 0),t([ot({attribute:!1})],_t.prototype,"selectedDay",void 0),t([nt()],_t.prototype,"config",void 0),_t=t([it("ecowatt-card")],_t);export{_t as EcoWattCard};
