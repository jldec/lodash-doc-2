(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){function e(e){if(e)if(o&&o.$a.removeClass("open"),o=s[e]){o.$a.addClass("open").get(0).focus();var t=o.$a.offset().top;(t>f.offsetTop+f.clientHeight||t<f.offsetTop)&&h.scrollTop(o.$a.get(0).offsetTop),c.removeClass("show")}else console.log("navPath can't find %s in toc",e)}function t(e){return e?v?void v.show(d+e):void(window.location.href=pubRef.relPath+e):void 0}function n(){var t=[],n=$("#content");v=require("page"),$.ajaxSetup({cache:!0}),$.getJSON(pubRef.relPath+"/pages.json").fail(function(e){console.log("unable to load /pages.json")}).done(function(a){t=a,page$=_.keyBy(a,"href"),page$["/all"]={href:"/all",html:_.map(t,"html").join("\n")},v("*",function(t){var a=t.path;a=r(a,d),a=a.split("?")[0];var o=page$[a];o&&(n.html(o.html),e(a))}),v({dispatch:!1})})}function a(){function e(e){if(e.shiftKey||e.metaKey||e.altKey||e.ctrlKey)return!0;switch(e.keyCode){case 27:case 9:return n(e,!0);case 37:case 38:case 39:case 40:return r(e,e.keyCode<39,e.keyCode%2);case 13:return d(e)}}function n(e,t){return m.$list.removeClass("show"),t&&(u.val(""),c.removeClass("show"),p.blur()),!0}function a(e){return m.length?(m.$list.addClass("show"),!1):!0}function r(e,t,n){if(!m.length)return!0;var a=i(".searchitem",t,m.$list);return a.length?!1:!0}function i(e,t,n,a){e=e||"";var r=$(e+".selected",n),o=t?r.prev(e):r.next(e);return o.length||(o=t?r.prev().prev(e):r.next().next(e)),o.length||!n||!a&&r.length||(o=t?n.children(e).last():n.children(e).first()),o.length&&($(e+".selected").removeClass("selected"),o.addClass("selected").get(0).scrollIntoView(!1)),o}function f(e){var t=u.val();if(t===m.q)return!0;if(m.q=t,words=_.compact(t.split(/\W/)),!words.length)return n(e,!1);var a=new RegExp(_.map(words,_.escapeRegExp).join(".*"),"i"),r=_.filter(l,function(e){return e.text.search(a)>=0||e.href.search(a)>=0});return r.length?(m.$list.addClass("show").html(_.map(r,w).join("")),m.length=r.length,!0):n(e,!1)}function d(e){var a=$(e&&e.target).attr("href")||$(e&&e.target&&e.target.parentElement).attr("href")||$(".searchitem.selected a").attr("href")||$(".searchitem a").first().attr("href");return a?(t(a),n(e,!0),!1):!0}localStorage.tocpos&&h.scrollTop(localStorage.tocpos),$(window).on(g?"pagehide":"beforeunload",function(){localStorage.tocpos=h.scrollTop()}),$("#nav > span.fa").click(function(e){c.toggleClass("show")}),l=[];var v;$("#toc a").each(function(){var e=$(this),t={href:e.attr("href").slice(pubRef.relPath.length),$a:e,text:e.text(),htmlText:this.innerHTML,title:e.attr("title")};v&&(t.prev=v.href,v.next=t.href),l.push(t),v=t}),s=_.keyBy(l,"href");var m={$list:$("#q-list"),length:0,q:""};u.focus(a).keydown(e).keyup(f),$(window).keydown(function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.target==p)return!0;var n=e.keyCode;return(n>=65&&90>=n||189===n||190===n)&&(p.focus(),c.addClass("show")),37===n&&t(o&&o.prev),39===n&&t(o&&o.next),!0}),$("#q-list").click(function(e){return d(e)}),_.templateSettings.interpolate=/\{\-\{(.+?)\}\-\}/g,_.templateSettings.escape=/\{\{(.+?)\}\}/g;var w=_.template('<li class="searchitem"><a href="{{href}}" title="{{title}}">{-{htmlText}-}</a></li>')}function r(e,t){return t&&e.slice(0,t.length)===t?e.slice(t.length):e}var o,l=[],s={},i=$("html"),c=(i.get(0),$("#nav")),h=$("#toc"),f=h.get(0),u=$("#q"),p=u.get(0),g=/iPad|iPhone/i.test(navigator.userAgent),d=location.pathname.slice(0,location.pathname.length-pubRef.href.length);a(),e(pubRef.href);var v=null;history&&history.pushState&&n()});
},{"page":3}],2:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};
},{}],3:[function(require,module,exports){
(function (process){
"use strict";function page(e,t){if("function"==typeof e)return page("*",e);if("function"==typeof t)for(var n=new Route(e),a=1;a<arguments.length;++a)page.callbacks.push(n.middleware(arguments[a]));else"string"==typeof e?page["string"==typeof t?"redirect":"show"](e,t):page.start(e)}function unhandled(e){if(!e.handled){var t;t=hashbang?base+location.hash.replace("#!",""):location.pathname+location.search,t!==e.canonicalPath&&(page.stop(),e.handled=!1,location.href=e.canonicalPath)}}function decodeURLEncodedURIComponent(e){return"string"!=typeof e?e:decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e}function Context(e,t){"/"===e[0]&&0!==e.indexOf(base)&&(e=base+(hashbang?"#!":"")+e);var n=e.indexOf("?");if(this.canonicalPath=e,this.path=e.replace(base,"")||"/",hashbang&&(this.path=this.path.replace("#!","")||"/"),this.title=document.title,this.state=t||{},this.state.path=e,this.querystring=~n?decodeURLEncodedURIComponent(e.slice(n+1)):"",this.pathname=decodeURLEncodedURIComponent(~n?e.slice(0,n):e),this.params={},this.hash="",!hashbang){if(!~this.path.indexOf("#"))return;var a=this.path.split("#");this.path=a[0],this.hash=decodeURLEncodedURIComponent(a[1])||"",this.querystring=this.querystring.split("#")[0]}}function Route(e,t){t=t||{},this.path="*"===e?"(.*)":e,this.method="GET",this.regexp=pathtoRegexp(this.path,this.keys=[],t.sensitive,t.strict)}function onclick(e){if(1===which(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!==t.nodeName;)t=t.parentNode;if(t&&"A"===t.nodeName&&!t.hasAttribute("download")&&"external"!==t.getAttribute("rel")){var n=t.getAttribute("href");if((hashbang||t.pathname!==location.pathname||!t.hash&&"#"!==n)&&!(n&&n.indexOf("mailto:")>-1)&&!t.target&&sameOrigin(t.href)){var a=t.pathname+t.search+(t.hash||"");"undefined"!=typeof process&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var o=a;0===a.indexOf(base)&&(a=a.substr(base.length)),hashbang&&(a=a.replace("#!","")),base&&o===a||(e.preventDefault(),page.show(o))}}}}function which(e){return e=e||window.event,null===e.which?e.button:e.which}function sameOrigin(e){var t=location.protocol+"//"+location.hostname;return location.port&&(t+=":"+location.port),e&&0===e.indexOf(t)}var pathtoRegexp=require("path-to-regexp");module.exports=page;var clickEvent="undefined"!=typeof document&&document.ontouchstart?"touchstart":"click",location="undefined"!=typeof window&&(window.history.location||window.location),dispatch=!0,decodeURLComponents=!0,base="",running,hashbang=!1,prevContext;page.callbacks=[],page.exits=[],page.current="",page.len=0,page.base=function(e){return 0===arguments.length?base:void(base=e)},page.start=function(e){if(e=e||{},!running&&(running=!0,!1===e.dispatch&&(dispatch=!1),!1===e.decodeURLComponents&&(decodeURLComponents=!1),!1!==e.popstate&&window.addEventListener("popstate",onpopstate,!1),!1!==e.click&&document.addEventListener(clickEvent,onclick,!1),!0===e.hashbang&&(hashbang=!0),dispatch)){var t=hashbang&&~location.hash.indexOf("#!")?location.hash.substr(2)+location.search:location.pathname+location.search+location.hash;page.replace(t,null,!0,dispatch)}},page.stop=function(){running&&(page.current="",page.len=0,running=!1,document.removeEventListener(clickEvent,onclick,!1),window.removeEventListener("popstate",onpopstate,!1))},page.show=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,!1!==n&&page.dispatch(o),!1!==o.handled&&!1!==a&&o.pushState(),o},page.back=function(e,t){page.len>0?(history.back(),page.len--):e?setTimeout(function(){page.show(e,t)}):setTimeout(function(){page.show(base,t)})},page.redirect=function(e,t){"string"==typeof e&&"string"==typeof t&&page(e,function(e){setTimeout(function(){page.replace(t)},0)}),"string"==typeof e&&"undefined"==typeof t&&setTimeout(function(){page.replace(e)},0)},page.replace=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,o.init=n,o.save(),!1!==a&&page.dispatch(o),o},page.dispatch=function(e){function t(){var e=page.exits[i++];return e?void e(a,t):n()}function n(){var t=page.callbacks[o++];return e.path!==page.current?void(e.handled=!1):t?void t(e,n):unhandled(e)}var a=prevContext,o=0,i=0;prevContext=e,a?t():n()},page.exit=function(e,t){if("function"==typeof e)return page.exit("*",e);for(var n=new Route(e),a=1;a<arguments.length;++a)page.exits.push(n.middleware(arguments[a]))},page.Context=Context,Context.prototype.pushState=function(){page.len++,history.pushState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},Context.prototype.save=function(){history.replaceState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},page.Route=Route,Route.prototype.middleware=function(e){var t=this;return function(n,a){return t.match(n.path,n.params)?e(n,a):void a()}},Route.prototype.match=function(e,t){var n=this.keys,a=e.indexOf("?"),o=~a?e.slice(0,a):e,i=this.regexp.exec(decodeURIComponent(o));if(!i)return!1;for(var s=1,r=i.length;r>s;++s){var h=n[s-1],p=decodeURLEncodedURIComponent(i[s]);void 0===p&&hasOwnProperty.call(t,h.name)||(t[h.name]=p)}return!0};var onpopstate=function(){var e=!1;if("undefined"!=typeof window)return"complete"===document.readyState?e=!0:window.addEventListener("load",function(){setTimeout(function(){e=!0},0)}),function(t){if(e)if(t.state){var n=t.state.path;page.replace(n,t.state)}else page.show(location.pathname+location.hash,void 0,void 0,!1)}}();page.sameOrigin=sameOrigin;
}).call(this,require('_process'))
},{"_process":5,"path-to-regexp":4}],4:[function(require,module,exports){
function parse(e){for(var t,r=[],n=0,o=0,p="";null!=(t=PATH_REGEXP.exec(e));){var a=t[0],i=t[1],s=t.index;if(p+=e.slice(o,s),o=s+a.length,i)p+=i[1];else{p&&(r.push(p),p="");var u=t[2],c=t[3],l=t[4],f=t[5],g=t[6],x=t[7],h="+"===g||"*"===g,m="?"===g||"*"===g,y=u||"/",T=l||f||(x?".*":"[^"+y+"]+?");r.push({name:c||n++,prefix:u||"",delimiter:y,optional:m,repeat:h,pattern:escapeGroup(T)})}}return o<e.length&&(p+=e.substr(o)),p&&r.push(p),r}function compile(e){return tokensToFunction(parse(e))}function tokensToFunction(e){for(var t=new Array(e.length),r=0;r<e.length;r++)"object"==typeof e[r]&&(t[r]=new RegExp("^"+e[r].pattern+"$"));return function(r){for(var n="",o=r||{},p=0;p<e.length;p++){var a=e[p];if("string"!=typeof a){var i,s=o[a.name];if(null==s){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to be defined')}if(isarray(s)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but received "'+s+'"');if(0===s.length){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var u=0;u<s.length;u++){if(i=encodeURIComponent(s[u]),!t[p].test(i))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'", but received "'+i+'"');n+=(0===u?a.prefix:a.delimiter)+i}}else{if(i=encodeURIComponent(s),!t[p].test(i))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but received "'+i+'"');n+=a.prefix+i}}else n+=a}return n}}function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function escapeGroup(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function attachKeys(e,t){return e.keys=t,e}function flags(e){return e.sensitive?"":"i"}function regexpToRegexp(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return attachKeys(e,t)}function arrayToRegexp(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(pathToRegexp(e[o],t,r).source);var p=new RegExp("(?:"+n.join("|")+")",flags(r));return attachKeys(p,t)}function stringToRegexp(e,t,r){for(var n=parse(e),o=tokensToRegExp(n,r),p=0;p<n.length;p++)"string"!=typeof n[p]&&t.push(n[p]);return attachKeys(o,t)}function tokensToRegExp(e,t){t=t||{};for(var r=t.strict,n=t.end!==!1,o="",p=e[e.length-1],a="string"==typeof p&&/\/$/.test(p),i=0;i<e.length;i++){var s=e[i];if("string"==typeof s)o+=escapeString(s);else{var u=escapeString(s.prefix),c=s.pattern;s.repeat&&(c+="(?:"+u+c+")*"),c=s.optional?u?"(?:"+u+"("+c+"))?":"("+c+")?":u+"("+c+")",o+=c}}return r||(o=(a?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=n?"$":r&&a?"":"(?=\\/|$)",new RegExp("^"+o,flags(t))}function pathToRegexp(e,t,r){return t=t||[],isarray(t)?r||(r={}):(r=t,t=[]),e instanceof RegExp?regexpToRegexp(e,t,r):isarray(e)?arrayToRegexp(e,t,r):stringToRegexp(e,t,r)}var isarray=require("isarray");module.exports=pathToRegexp,module.exports.parse=parse,module.exports.compile=compile,module.exports.tokensToFunction=tokensToFunction,module.exports.tokensToRegExp=tokensToRegExp;var PATH_REGEXP=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");
},{"isarray":2}],5:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
},{}]},{},[1]);
