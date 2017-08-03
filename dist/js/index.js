!function(e){function o(t){if(n[t])return n[t].exports;var module=n[t]={i:t,l:!1,exports:{}};return e[t].call(module.exports,module,module.exports,o),module.l=!0,module.exports}var n={};o.m=e,o.c=n,o.d=function(exports,e,n){o.o(exports,e)||Object.defineProperty(exports,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(module){var e=module&&module.__esModule?function(){return module.default}:function(){return module};return o.d(e,"a",e),e},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="./",o(o.s=0)}([function(module,exports,e){"use strict";var o=e(1),n=function(e){return e&&e.__esModule?e:{default:e}}(o);window.a=new n.default},function(module,exports,e){"use strict";function o(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(){function e(e,o){for(var n=0;n<o.length;n++){var t=o[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(o,n,t){return n&&e(o.prototype,n),t&&e(o,t),o}}(),i=e(2),r=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{logColor:"lightgreen",infoColor:"blue",warnColor:"orange",errorColor:"red",isShow:!1};return o(this,e),"object"===n(e.instance)?e.instance:(this.cacheInstance(),this.$body=document.querySelector("body"),this.$console=null,this.$consoleVirtualList="",this.$consoleList=[],this._console={},this._options=t,this)}return t(e,[{key:"cacheInstance",value:function(){e.instance=this}},{key:"init",value:function(e){this.$console=this.createDOM({tag:"div",className:"console"}),this.saveConsoleFn(),this.$console.innerHTML=this.$consoleVirtualList}},{key:"saveConsoleFn",value:function(){this.originalFnCallDecorator;this._console.log=console.log,this._console.clear=console.clear,this._console.info=console.info,this._console.warn=console.warn,this._console.error=console.error,console.log=this.originalFnCallDecorator(this.log,"log"),console.clear=this.originalFnCallDecorator(this.clear,"clear"),console.info=this.originalFnCallDecorator(this.info,"info"),console.warn=this.originalFnCallDecorator(this.warn,"warn"),console.error=this.originalFnCallDecorator(this.error,"error")}},{key:"originalFnCallDecorator",value:function(e,o){var n=this;return function(){e.apply(n,arguments),"function"==typeof n._console[o]&&n._console[o].apply(console,arguments)}}},{key:"consoleShow",value:function(){if(!this.$console)return!1;this._options.isShow=!0,document.querySelector(".console")?this.$console.style.display="block":(this.appendDOM(this.$console,this.$body),this.$console.innerHTML=this.$consoleVirtualList)}},{key:"consoleHide",value:function(){this._options.isShow=!1,this.$console.style.display="none",this.$consoleVirtualList=""}},{key:"destroy",value:function(){var e=this._console;this._options.isShow=!1,console.log=e.log,console.clear=e.clear,console.info=e.info,console.warn=e.warn,console.error=e.error,this.$body.removeChild(this.$console),this.clear(),this.$console=null}},{key:"createDOM",value:function(e){var o=e.tag,n=e.css,t=void 0===n?"width:300px;max-height:500px;min-height:200px;overflow-y:scroll;background:rgba(0,0,0,0.7);":n,i=e.className,r=void 0===i?"":i,s=document.createElement(o);return s.style.cssText=t,s.className=r,s}},{key:"appendDOM",value:function(e,o){"object"===(void 0===e?"undefined":n(e))?o.appendChild(e):o.innerHTML=e}},{key:"genericLogger",value:function(e,o){if(!this.$console)return!1;if(this._options.isShow){var n=document.createElement("div");n.style.cssText="color:"+this._options[e+"Color"]+";min-height:30px;line-height:20px;width:100%;box-sizing:border-box;word-wrap:break-word;border-bottom: 1px solid white;padding:5px;",n.textContent=o,this.appendDOM(n,this.$console),this.$console.scrollTop=this.$console.scrollHeight-this.$console.clientHeight}else this.$consoleVirtualList+='<div style="color:'+this._options[e+"Color"]+';min-height:30px;line-height:20px;width:100%;box-sizing:border-box;word-wrap:break-word;border-bottom: 1px solid white;padding:5px;">'+o+"</div>"}},{key:"log",value:function(e){this.genericLogger("log",e)}},{key:"clear",value:function(){this.$consoleVirtualList="",this.$console.innerHTML=""}},{key:"info",value:function(e){this.genericLogger("info",e)}},{key:"warn",value:function(e){this.genericLogger("warn",e)}},{key:"error",value:function(e){this.genericLogger("error",e)}},{key:"proxyPress",value:function(e,o){return new r.default(e,o)}}]),e}();exports.default=s},function(module,exports,e){"use strict";function o(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function e(e,o){for(var n=0;n<o.length;n++){var t=o[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(o,n,t){return n&&e(o.prototype,n),t&&e(o,t),o}}(),t=function(){function e(n,t){return o(this,e),this.rule=n,this.keyGroup=[],this.Timer,this.fn=t,this.keyEvent=null,this.addEvent(),this}return n(e,[{key:"addEvent",value:function(){this.keyEvent=function(e){var o=this;this.Timer&&window.clearTimeout(this.Timer),this.keyGroup.push(e.keyCode||event.which);var n=this.keyGroup.join("+");this.rule===n&&(this.fn.apply(this),this.keyGroup=[]),this.Timer=window.setTimeout(function(){o.keyGroup=[]},300)}.bind(this),document.addEventListener("keydown",this.keyEvent,!1)}},{key:"removeEvent",value:function(){if(!this.keyEvent)return!1;document.removeEventListener("keydown",this.keyEvent,!1)}}]),e}();exports.default=t}]);