/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={493:t=>{"use strict";t.exports=flarum.extensions["fof-user-directory"]},752:(t,e,r)=>{var n=r(327).default;function s(){"use strict";t.exports=s=function(){return r},t.exports.__esModule=!0,t.exports.default=t.exports;var e,r={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",l=u.asyncIterator||"@@asyncIterator",f=u.toStringTag||"@@toStringTag";function m(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{m({},"")}catch(e){m=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var s=e&&e.prototype instanceof A?e:A,o=Object.create(s.prototype),i=new C(n||[]);return a(o,"_invoke",{value:j(t,r,i)}),o}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var p="suspendedStart",v="suspendedYield",w="executing",b="completed",y={};function A(){}function g(){}function x(){}var _={};m(_,c,(function(){return this}));var P=Object.getPrototypeOf,S=P&&P(P(T([])));S&&S!==o&&i.call(S,c)&&(_=S);var B=x.prototype=A.prototype=Object.create(_);function N(t){["next","throw","return"].forEach((function(e){m(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(s,o,a,u){var c=d(t[s],t,o);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==n(f)&&i.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var s;a(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,s){r(t,n,e,s)}))}return s=s?s.then(o,o):o()}})}function j(t,r,n){var s=p;return function(o,i){if(s===w)throw Error("Generator is already running");if(s===b){if("throw"===o)throw i;return{value:e,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var u=k(a,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(s===p)throw s=b,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);s=w;var c=d(t,r,n);if("normal"===c.type){if(s=n.done?b:v,c.arg===y)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(s=b,n.method="throw",n.arg=c.arg)}}}function k(t,r){var n=r.method,s=t.iterator[n];if(s===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var o=d(s,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function T(t){if(t||""===t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var s=-1,o=function r(){for(;++s<t.length;)if(i.call(t,s))return r.value=t[s],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}throw new TypeError(n(t)+" is not iterable")}return g.prototype=x,a(B,"constructor",{value:x,configurable:!0}),a(x,"constructor",{value:g,configurable:!0}),g.displayName=m(x,f,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,m(t,f,"GeneratorFunction")),t.prototype=Object.create(B),t},r.awrap=function(t){return{__await:t}},N(L.prototype),m(L.prototype,l,(function(){return this})),r.AsyncIterator=L,r.async=function(t,e,n,s,o){void 0===o&&(o=Promise);var i=new L(h(t,e,n,s),o);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},N(B),m(B,f,"Generator"),m(B,c,(function(){return this})),m(B,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=T,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(I),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,s){return a.type="throw",a.arg=t,r.next=n,s&&(r.method="next",r.arg=e),!!s}for(var s=this.tryEntries.length-1;s>=0;--s){var o=this.tryEntries[s],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),c=i.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var s=n;break}}s&&("break"===t||"continue"===t)&&s.tryLoc<=e&&e<=s.finallyLoc&&(s=null);var o=s?s.completion:{};return o.type=t,o.arg=e,s?(this.method="next",this.next=s.finallyLoc,y):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var s=n.arg;I(r)}return s}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:T(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},r}t.exports=s,t.exports.__esModule=!0,t.exports.default=t.exports},327:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},943:(t,e,r)=>{var n=r(752)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var s=e[n];if(void 0!==s)return s.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r.d(n,{components:()=>gt,extend:()=>Ot});const t=flarum.core.compat["forum/app"];var e=r.n(t);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}const i=flarum.core.compat["forum/components/Notification"];var a=r.n(i),u=function(t){function r(){return t.apply(this,arguments)||this}o(r,t);var n=r.prototype;return n.icon=function(){return"fas fa-comment-dots"},n.href=function(){var t=this.attrs.notification.subject();return e().route.discussion(t)},n.content=function(){return e().translator.trans("fof-best-answer.forum.notification.content")},n.excerpt=function(){return null},r}(a());const c=flarum.core.compat["common/extend"],l=flarum.core.compat["common/components/Button"];var f=r.n(l);const h=flarum.core.compat["forum/utils/PostControls"];var d=r.n(h);const p=flarum.core.compat["forum/components/DiscussionPage"];var v=r.n(p);const w=flarum.core.compat["forum/components/CommentPost"];var b=r.n(w);const y=flarum.core.compat["common/utils/extractText"];var A=r.n(y);const g=flarum.core.compat["forum/components/Post"];var x=r.n(g);const _=flarum.core.compat["common/Component"];var P=r.n(_);const S=flarum.core.compat["common/helpers/icon"];var B=r.n(S);const N=flarum.core.compat["common/helpers/humanTime"];var L=r.n(N);const j=flarum.core.compat["common/components/Link"];var k=r.n(j);const O=flarum.core.compat["common/utils/ItemList"];var I=r.n(O),C=function(t){function r(){for(var e,r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))||this).post=void 0,e.discussion=void 0,e}o(r,t);var n=r.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.post=this.attrs.post,this.discussion=this.attrs.discussion},n.view=function(){return m("li",{className:"Post--BestAnswer"},this.items().toArray())},n.getSetTime=function(t){if(null!=t.bestAnswerSetAt&&t.bestAnswerSetAt()){var e=null==t.bestAnswerSetAt?void 0:t.bestAnswerSetAt();if(e)return L()(e)}},n.items=function(){var t,r,n,s,o=new(I());o.add("post",this.post?m("span",null,B()("fas fa-check"),e().translator.trans("fof-best-answer.forum.best_answer_button")):m(k(),{href:e().route.post(this.post),"data-number":this.post.number()},B()("fas fa-check"),e().translator.trans("fof-best-answer.forum.best_answer_button")));var i=null==(t=(r=this.discussion).bestAnswerUser)?void 0:t.call(r);return i&&o.add("user",m("span",{className:"BestAnswer--User"},e().translator.trans("fof-best-answer.forum.best_answer_label",{user:null==(n=(s=this.discussion).bestAnswerUser)?void 0:n.call(s),time_set:this.getSetTime(this.discussion),a:m("a",{onclick:function(){return m.route.set(e().route.user(i))}})}))),o},r}(P());const T=flarum.core.compat["common/helpers/username"];var E=r.n(T);const q=flarum.core.compat["common/helpers/userOnline"];var R=r.n(q);const D=flarum.core.compat["common/utils/classList"];var M=r.n(D),U=function(t){function r(){for(var e,r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))||this).user=void 0,e.post=void 0,e.discussion=void 0,e}o(r,t);var n=r.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.user=this.attrs.user,this.post=this.attrs.post,this.discussion=this.attrs.discussion},n.view=function(){var t=this,r=e().forum.attribute("fof-best-answer.show_max_lines");return m("div",{className:"CommentPost",onclick:function(){return e().current.get("stream").goToNumber(t.post.number())}},m("div",{className:"Post-header"},m("ul",null,this.headerItems().toArray())),m("div",{className:M()("Post-body",r>0&&"Post-body--truncate"),style:{"--max-lines":r}},m.trust(this.postContent())))},n.postContent=function(){return this.post.contentHtml()},n.headerItems=function(){var t=new(I());return t.add("user",this.userItem()),t.add("meta",this.metaItem()),t.add("bestAnswer",m(C,{post:this.post,discussion:this.discussion}),-100),t},n.userItem=function(){return m("li",{className:"item-user"},m("div",{className:"PostUser"},this.user&&R()(this.user),m("h3",null,this.user?m(k(),{href:e().route.user(this.user)},E()(this.user)):E()(this.user))))},n.metaItem=function(){var t=this.post;return m("li",{className:"item-meta"},m("span",{className:"PostMeta-time"},L()(t.createdAt())))},r}(P());const F=flarum.core.compat["common/models/Discussion"];var G=r.n(F);const Q=flarum.core.compat["common/components/Badge"];var H=function(t){function r(){return t.apply(this,arguments)||this}return o(r,t),r.initAttrs=function(t){t.type="bestAnswer",t.icon="fas fa-check",t.label=A()(e().translator.trans("fof-best-answer.forum.answered_badge"))},r}(r.n(Q)()),Y=function(t){function r(){return t.apply(this,arguments)||this}o(r,t);var n=r.prototype;return n.icon=function(){return"fas fa-check"},n.href=function(){var t=this.attrs.notification.subject();return e().route.discussion(t)},n.content=function(){var t=this.attrs.notification.fromUser();return e().translator.trans("fof-best-answer.forum.notification.awarded",{user:t})},n.excerpt=function(){return null},r}(a()),z=function(t){function r(){return t.apply(this,arguments)||this}o(r,t);var n=r.prototype;return n.icon=function(){return"fas fa-check"},n.href=function(){var t=this.attrs.notification.subject();return e().route.discussion(t)},n.content=function(){var t=this.attrs.notification.fromUser();return e().translator.trans("fof-best-answer.forum.notification.best_answer_in_discussion",{user:t})},n.excerpt=function(){return null},r}(a());const J=flarum.core.compat["forum/components/NotificationGrid"];var K=r.n(J);const V=flarum.core.compat["forum/components/UserCard"];var W=r.n(V);function X(){return X=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},X.apply(null,arguments)}const Z=flarum.core.compat["forum/components/Search"];var $=r.n(Z);function tt(t,e,r,n,s,o,i){try{var a=t[o](i),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,s)}var et=r(943),rt=r.n(et);const nt=flarum.core.compat["common/components/LinkButton"];var st=r.n(nt);const ot=flarum.core.compat["common/helpers/highlight"];var it=r.n(ot);const at=flarum.core.compat["tags/common/helpers/tagsLabel"];var ut=r.n(at),ct=function(t){function r(){for(var e,r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))||this).query=void 0,e.discussion=void 0,e.bestAnswerPost=void 0,e.mostRelevantPost=void 0,e.tags=void 0,e}o(r,t);var n=r.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.query=this.attrs.query,this.discussion=this.attrs.discussion,this.bestAnswerPost=this.attrs.bestAnswerPost,this.mostRelevantPost=this.attrs.mostRelevantPost,this.tags=this.attrs.tags},n.view=function(){return m("li",{className:"SolutionSearchResult DiscussionSearchResult","data-index":"discussions"+this.discussion.id()},m(k(),{href:e().route.discussion(this.discussion,this.bestAnswerPost&&this.bestAnswerPost.number()||0)},this.viewItems().toArray()))},n.discussionTitle=function(){return this.discussion.title()},n.bestAnswerContent=function(){var t;return null==(t=this.bestAnswerPost)?void 0:t.contentPlain()},n.mostRelevantContent=function(){var t;return null==(t=this.mostRelevantPost)?void 0:t.contentPlain()},n.viewItems=function(){var t,r,n=new(I());return e().forum.attribute("showTagsInSearchResults")&&n.add("tags",m("div",{className:"SolutionSearchResult-tags"},ut()(this.tags)),100),n.add("discussion-title",m("div",{className:"DiscussionSearchResult-title"},it()(this.discussionTitle(),this.query)),90),this.mostRelevantPost&&n.add("most-relevant",m("div",{className:"DiscussionSearchResult-excerpt"},it()(null!=(t=this.mostRelevantContent())?t:"",this.query,100)),80),this.bestAnswerPost&&n.add("best-answer",m("div",{className:"DiscussionSearchResult-excerpt SolutionSearchResult-bestAnswer"},it()(null!=(r=this.bestAnswerContent())?r:"",this.query,100)),70),n},r}(P()),lt=function(){function t(){this.results=new Map,this.queryString=null}var r=t.prototype;return r.search=function(){var t,r=(t=rt().mark((function t(r){var n,s=this;return rt().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=r.toLowerCase(),this.results.set(r,[]),this.setQueryString(r),n={filter:{q:this.queryString||r},page:{limit:this.limit()},include:this.includes().join(",")},t.abrupt("return",e().store.find("discussions",n).then((function(t){s.results.set(r,t),m.redraw()})));case 5:case"end":return t.stop()}}),t,this)})),function(){var e=this,r=arguments;return new Promise((function(n,s){var o=t.apply(e,r);function i(t){tt(o,n,s,i,a,"next",t)}function a(t){tt(o,n,s,i,a,"throw",t)}i(void 0)}))});return function(t){return r.apply(this,arguments)}}(),r.view=function(t){t=t.toLowerCase(),this.setQueryString(t);var r=(this.results.get(t)||[]).map((function(e){var r=e.bestAnswerPost(),n=e.mostRelevantPost(),s=e.tags();return m(ct,{query:t,discussion:e,bestAnswerPost:r,mostRelevantPost:n,tags:s})}));return[m("li",{className:"Dropdown-header"},m(H,null)," ",e().translator.trans("fof-best-answer.forum.search.discussions_solutions_heading")),m("li",null,m(st(),{icon:"fas fa-search",href:e().route("index",{q:this.queryString})},e().translator.trans("fof-best-answer.forum.search.all_discussions_solutions_button",{query:t})))].concat(r)},r.includes=function(){return["mostRelevantPost","bestAnswerPost","tags"]},r.limit=function(){return 3},r.queryMutators=function(){return["is:solved"]},r.setQueryString=function(t){this.queryString=t+" "+this.queryMutators().join(" ")},t}();const ft=flarum.core.compat["forum/components/DiscussionsSearchSource"];var mt=r.n(ft);const ht=flarum.core.compat["forum/components/IndexPage"];var dt=r.n(ht);const pt=flarum.core.compat["common/components/Dropdown"];var vt=r.n(pt);const wt=flarum.core.compat["forum/states/DiscussionListState"];var bt=r.n(wt);const yt=flarum.core.compat["forum/components/DiscussionComposer"];var At=r.n(yt),gt={SelectBestAnswerItem:C,SolutionSearchSource:lt,BestAnswerFooterPreview:U,AwardedBestAnswerNotification:Y,BestAnswerBadge:H,BestAnswerInDiscussionNotification:z,SelectBestAnswerNotification:u,SolutionSearchItem:ct};const xt=flarum.core.compat["common/extenders"];var _t=r.n(xt);const Pt=flarum.core.compat["tags/common/models/Tag"];var St=r.n(Pt);const Bt=[new(_t().Model)(St()).attribute("isQnA").attribute("reminders")],Nt=flarum.core.compat["common/models/User"];var Lt=r.n(Nt);const jt=flarum.core.compat["common/Model"];var kt=r.n(jt);const Ot=[].concat(Bt,[new(_t().Model)(G()).hasOne("bestAnswerPost").hasOne("bestAnswerUser").attribute("hasBestAnswer").attribute("canSelectBestAnswer").attribute("bestAnswerSetAt",kt().transformDate),new(_t().Model)(Lt()).attribute("bestAnswerCount")]);e().initializers.add("fof/best-answer",(function(){var t,n,s,o,i,a;e().notificationComponents.selectBestAnswer=u,e().notificationComponents.awardedBestAnswer=Y,e().notificationComponents.bestAnswerInDiscussion=z,(0,c.extend)(G().prototype,"badges",(function(t){this.hasBestAnswer()&&!t.has("hidden")&&t.add("bestAnswer",m(H,null))})),t=function(t,r){return r.isHidden()||1===r.number()||!t.canSelectBestAnswer()||!e().session.user},n=function(t){var r,n=t.user();return!e().forum.attribute("canSelectBestAnswerOwnPost")&&!1!==n&&n.id()===(null==(r=e().session.user)?void 0:r.id())},s=function(t,e){var r=t.bestAnswerPost(),n=t.hasBestAnswer();return void 0!==n&&n&&null!==r&&r.id()===e.id()},o=function(t){return A()(e().translator.trans(t?"fof-best-answer.forum.remove_best_answer":"fof-best-answer.forum.this_best_answer"))},i=function(t,r,n){var s;return t.save({bestAnswerPostId:r?n.id():0,bestAnswerUserId:null==(s=e().session.user)?void 0:s.id(),relationships:r?{bestAnswerPost:n,bestAnswerUser:e().session.user}:{bestAnswerPost:null}},{params:{include:"tags"}}).then((function(){r||t.data.relationships&&(delete t.data.relationships.bestAnswerPost,delete t.data.relationships.bestAnswerUser),e().current.matches(v())&&e().current.get("stream").update(),m.redraw(),r&&m.route.set(e().route.discussion(t))}))},(0,c.extend)(d(),"moderationControls",(function(r,a){if(!e().forum.attribute("useAlternativeBestAnswerUi")){var u=a.discussion(),c=s(u,a);a.pushAttributes({isBestAnswer:c}),"comment"===a.contentType()&&(t(u,a)||n(a)||!e().current.matches(v())||r.add("bestAnswer",m(f(),{icon:"fa"+(c?"s":"r")+" fa-comment-dots",onclick:function(){i(u,c=!c,a).finally((function(){c=s(u,a)}))}},o(c))))}})),(0,c.extend)(b().prototype,"actionItems",(function(r){if(e().forum.attribute("useAlternativeBestAnswerUi")){var a=this.attrs.post,u=this.attrs.post.discussion(),c=s(u,a),l=null!==u.bestAnswerPost();a.pushAttributes({isBestAnswer:c}),t(u,a)||n(a)||!e().current.matches(v())||r.add("bestAnswer",m(f(),{className:"Button Button--"+(!l||c?"primary":"link"),onclick:function(){l=!l,i(u,c=!c,a).finally((function(){l=!!u.hasBestAnswer()&&null!==u.bestAnswerPost(),c=s(u,a)}))}},o(c)))}})),(0,c.extend)(b().prototype,"headerItems",(function(t){var e,r=this.attrs.post,n=r.discussion();null!=n&&n.hasBestAnswer()&&n.bestAnswerPost()&&(null==(e=n.bestAnswerPost())?void 0:e.id())===r.id()&&!r.isHidden()&&t.add("isBestAnswer",m(C,{post:r,discussion:n}),-100)})),(0,c.extend)(b().prototype,"footerItems",(function(t){var e=this.attrs.post,r=e.discussion(),n=r.hasBestAnswer()&&r.bestAnswerPost();if(n&&!n.isHidden()&&1===e.number()&&!e.isHidden()){var s=n.user();t.add("bestAnswerPost",m(U,{post:n,user:s,discussion:r}),-10)}})),(0,c.extend)(x().prototype,"elementAttrs",(function(t){var e=this.attrs.post,r=e.discussion();null!=r&&r.hasBestAnswer()&&r.bestAnswerPost()&&r.bestAnswerPost().id()===e.id()&&!e.isHidden()&&(t.className?t.className+=" Post--bestAnswer":t.className="Post--bestAnswer")})),(0,c.extend)(v().prototype,"sidebarItems",(function(t){var r;if(e().forum.attribute("bestAnswerDiscussionSidebarJumpButton")){var n=this.discussion;if(null!==n){var s=n.hasBestAnswer()&&n.bestAnswerPost();!s||s.isHidden()||1===s.number()||null!=(r=n.bestAnswerPost())&&r.isHidden()||t.add("jumpToBestAnswer",m(f(),{className:"Button Button-jumpBestAnswer",icon:"fas fa-check",onclick:function(){return e().current.get("stream").goToNumber(s.number())},"aria-label":e().translator.trans("fof-best-answer.forum.discussion.jump_to_best_answer_button")},e().translator.trans("fof-best-answer.forum.discussion.jump_to_best_answer_button")),90)}}})),(0,c.extend)(W().prototype,"infoItems",(function(t){var r=this.attrs.user;t.add("best-answer-count",m("span",{className:"UserCard-bestAnswerCount"},B()("fas fa-check"),e().translator.trans("fof-best-answer.forum.user.best-answer-count",{count:r.bestAnswerCount()})),55)})),(a=r(493))&&(0,c.override)(a.SortMap.prototype,"sortMap",(function(t){return X({},t(),{most_best_answers:"-bestAnswerCount",least_best_answers:"bestAnswerCount"})})),(0,c.extend)(K().prototype,"notificationTypes",(function(t){t.add("awardedBestAnswer",{name:"awardedBestAnswer",icon:"fas fa-check",label:e().translator.trans("fof-best-answer.forum.notification.preferences.awarded_best_answer")}),t.add("bestAnswerInDiscussion",{name:"bestAnswerInDiscussion",icon:"fas fa-check",label:e().translator.trans("fof-best-answer.forum.notification.preferences.best_answer_in_discussion")}),t.add("selectBestAnswer",{name:"selectBestAnswer",icon:"fas fa-stopwatch",label:e().translator.trans("fof-best-answer.forum.notification.preferences.select_best_answer")})})),(0,c.extend)($().prototype,"sourceItems",(function(t){e().forum.attribute("solutionSearchEnabled")&&t.add("solution",new lt,110)})),(0,c.extend)(mt().prototype,"queryMutators",(function(t){e().forum.attribute("removeSolutionResultsFromMainSearch")&&t.push("-is:solved")})),(0,c.extend)(dt().prototype,"sidebarItems",(function(t){var r=this.currentTag();if(null!=r&&null!=r.isQnA&&r.isQnA()){var n=e().forum.attribute("canStartDiscussion")||!e().session.user,s=t.get("newDiscussion");s.children=e().translator.trans(n?"fof-best-answer.forum.index.ask_question":"fof-best-answer.forum.index.cannot_ask_question"),t.has("startDiscussion")&&t.setContent("startDiscussion",s)}})),(0,c.extend)(dt().prototype,"viewItems",(function(t){if(e().forum.attribute("showBestAnswerFilterUi")){var r=this.currentTag();if(null!=r&&null!=r.isQnA&&r.isQnA()){var n=["all","solved","unsolved"],s=e().discussions.bestAnswer;t.add("solved-filter",vt().component({buttonClassName:"Button",label:e().translator.trans("fof-best-answer.forum.filter."+(n[s]||Object.keys(n).map((function(t){return n[Number(t)]}))[0])+"_label"),accessibleToggleLabel:e().translator.trans("fof-best-answer.forum.filter.accessible_label")},Object.keys(n).map((function(t){var r=n[Number(t)],o=(s||Object.keys(n)[0])===t;return f().component({icon:!o||"fas fa-check",active:o,onclick:function(){e().discussions.bestAnswer=t,"0"===t&&delete e().discussions.bestAnswer,e().discussions.refresh()}},e().translator.trans("fof-best-answer.forum.filter."+r+"_label"))}))))}else e().discussions.bestAnswer&&(delete e().discussions.bestAnswer,e().discussions.refresh())}})),(0,c.extend)(bt().prototype,"requestParams",(function(t){if(e().discussions.bestAnswer){var r="2"===e().discussions.bestAnswer?"-":"";t.filter||(t.filter={}),t.filter[r+"solved-discussions"]="true",t.filter.q&&(t.filter.q+=" "+r+"is:solved")}})),(0,c.extend)(At().prototype,"headerItems",(function(t){var r=this.composer.fields.tags;void 0!==r&&r.some((function(t){return t.isQnA()}))&&(this.attrs.titlePlaceholder=e().translator.trans("fof-best-answer.forum.composer.titlePlaceholder"),t.has("discussionTitle")&&t.setContent("discussionTitle",m("h3",null,m("input",{className:"FormControl",bidi:this.title,placeholder:this.attrs.titlePlaceholder,disabled:!!this.attrs.disabled,onkeydown:this.onkeydown.bind(this)}))))}))}))})(),module.exports=n})();
//# sourceMappingURL=forum.js.map