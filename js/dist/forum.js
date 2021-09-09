module.exports=function(t){var e={};function s(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,s),o.l=!0,o.exports}return s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=32)}([,function(t,e){t.exports=flarum.core.compat["forum/app"]},function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e,s){"use strict";function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e)}s.d(e,"a",(function(){return o}))},function(t,e){t.exports=flarum.core.compat["common/components/Button"]},function(t,e){t.exports=flarum.core.compat["common/app"]},function(t,e){t.exports=flarum.core.compat["common/models/Discussion"]},function(t,e){t.exports=flarum.core.compat["common/Model"]},function(t,e){t.exports=flarum.core.compat["common/components/Link"]},function(t,e){t.exports=flarum.core.compat["tags/models/Tag"]},function(t,e){t.exports=flarum.core.compat["forum/components/Notification"]},function(t,e){t.exports=flarum.core.compat["forum/components/CommentPost"]},function(t,e){t.exports=flarum.core.compat["forum/components/DiscussionPage"]},,function(t,e){t.exports=flarum.core.compat["forum/components/IndexPage"]},function(t,e){t.exports=flarum.core.compat["common/helpers/username"]},function(t,e){t.exports=flarum.core.compat["common/helpers/icon"]},,,function(t,e){t.exports=flarum.core.compat["forum/components/NotificationGrid"]},function(t,e){t.exports=flarum.core.compat["common/components/Dropdown"]},function(t,e){t.exports=flarum.core.compat["forum/states/DiscussionListState"]},function(t,e){t.exports=flarum.core.compat["forum/components/DiscussionComposer"]},function(t,e){t.exports=flarum.core.compat["forum/utils/PostControls"]},function(t,e){t.exports=flarum.core.compat["forum/components/Post"]},function(t,e){t.exports=flarum.core.compat["forum/components/PostMeta"]},function(t,e){t.exports=flarum.core.compat["common/helpers/userOnline"]},function(t,e){t.exports=flarum.core.compat["common/Component"]},function(t,e){t.exports=flarum.core.compat["common/helpers/humanTime"]},function(t,e){t.exports=flarum.core.compat["common/utils/ItemList"]},function(t,e){t.exports=flarum.core.compat["common/components/Badge"]},,function(t,e,s){"use strict";s.r(e),s.d(e,"components",(function(){return at}));var n=s(1),o=s.n(n),r=s(2),a=s(6),i=s.n(a),c=s(9),u=s.n(c),f=s(7),p=s.n(f),l=s(19),d=s.n(l),b=s(14),w=s.n(b),h=s(20),A=s.n(h),y=s(4),v=s.n(y),x=s(21),P=s.n(x),_=s(22),O=s.n(_),j=s(3),B=s(10),g=s.n(B),k=function(t){function e(){return t.apply(this,arguments)||this}Object(j.a)(e,t);var s=e.prototype;return s.icon=function(){return"fas fa-comment-dots"},s.href=function(){var t=this.attrs.notification.subject();return app.route.discussion(t)},s.content=function(){return app.translator.trans("fof-best-answer.forum.notification.content")},e}(g.a),S=s(23),N=s.n(S),I=s(12),T=s.n(I),D=s(11),U=s.n(D),C=s(24),Q=s.n(C),H=s(25),M=s.n(H),L=s(15),q=s.n(L),z=s(26),F=s.n(z),G=s(8),E=s.n(G),J=s(27),K=s.n(J),R=s(16),V=s.n(R),W=s(28),X=s.n(W),Y=s(29),Z=s.n(Y),$=function(t){function e(){return t.apply(this,arguments)||this}Object(j.a)(e,t);var s=e.prototype;return s.oninit=function(e){t.prototype.oninit.call(this,e);var s=this.attrs,n=s.post,o=s.discussion;this.post=n,this.discussion=o},s.view=function(){return m("li",{className:"Post--BestAnswer"},this.items().toArray())},s.getSetTime=function(t){if(null!==t.bestAnswerSetAt())return X()(t.bestAnswerSetAt())},s.items=function(){var t=this,e=new Z.a;return e.add("post",this.post?m("span",null,V()("fas fa-check"),app.translator.trans("fof-best-answer.forum.best_answer_button")):m(E.a,{href:app.route.post(this.post),"data-number":this.post.number()},V()("fas fa-check"),app.translator.trans("fof-best-answer.forum.best_answer_button"))),e.add("user",m("span",{className:"BestAnswer--User"},app.translator.trans("fof-best-answer.forum.best_answer_label",{user:this.discussion.bestAnswerUser(),time_set:this.getSetTime(this.discussion),a:m("a",{onclick:function(){return m.route.set(app.route.user(t.discussion.bestAnswerUser()))}})}))),e},e}(K.a),tt=s(5),et=s.n(tt),st=s(30),nt=s.n(st),ot=function(t){function e(){return t.apply(this,arguments)||this}Object(j.a)(e,t);var s=e.prototype;return s.icon=function(){return"fas fa-check"},s.href=function(){var t=this.attrs.notification.subject();return app.route.discussion(t)},s.content=function(){var t=this.attrs.notification.fromUser();return app.translator.trans("fof-best-answer.forum.notification.awarded",{user:t})},e}(g.a),rt=function(t){function e(){return t.apply(this,arguments)||this}Object(j.a)(e,t);var s=e.prototype;return s.icon=function(){return"fas fa-check"},s.href=function(){var t=this.attrs.notification.subject();return app.route.discussion(t)},s.content=function(){var t=this.attrs.notification.fromUser();return app.translator.trans("fof-best-answer.forum.notification.best_answer_in_discussion",{user:t})},e}(g.a),at={SelectBestAnswerItem:$};o.a.initializers.add("fof/best-answer",(function(){var t,e,s,n,a;i.a.prototype.bestAnswerPost=p.a.hasOne("bestAnswerPost"),i.a.prototype.bestAnswerUser=p.a.hasOne("bestAnswerUser"),i.a.prototype.hasBestAnswer=p.a.attribute("hasBestAnswer"),i.a.prototype.canSelectBestAnswer=p.a.attribute("canSelectBestAnswer"),i.a.prototype.bestAnswerSetAt=p.a.attribute("bestAnswerSetAt",p.a.transformDate),u.a.prototype.isQnA=p.a.attribute("isQnA"),o.a.notificationComponents.selectBestAnswer=k,o.a.notificationComponents.awardedBestAnswer=ot,o.a.notificationComponents.bestAnswerInDiscussion=rt,Object(r.extend)(i.a.prototype,"badges",(function(t){this.hasBestAnswer()&&!t.has("hidden")&&t.add("bestAnswer",nt.a.component({type:"bestAnswer",icon:"fas fa-check",label:et.a.translator.trans("fof-best-answer.forum.answered_badge")}))})),t=function(t,e){return e.isHidden()||1===e.number()||!t.canSelectBestAnswer()||!app.session.user},e=function(t){return!app.forum.attribute("canSelectBestAnswerOwnPost")&&t.user()&&t.user().id()===app.session.user.id()},s=function(t,e){return t.bestAnswerPost()&&t.bestAnswerPost().id()===e.id()},n=function(t){return app.translator.trans(t?"fof-best-answer.forum.remove_best_answer":"fof-best-answer.forum.this_best_answer")},a=function(t,e,s){t.save({bestAnswerPostId:e?s.id():0,bestAnswerUserId:app.session.user.id(),relationships:e?{bestAnswerPost:s,bestAnswerUser:app.session.user}:delete t.data.relationships.bestAnswerPost}).then((function(){app.current.matches(T.a)&&app.current.get("stream").update(),m.redraw(),e&&m.route.set(app.route.discussion(t))}))},Object(r.extend)(N.a,"moderationControls",(function(o,r){if(!app.forum.attribute("useAlternativeBestAnswerUi")){var i=r.discussion(),c=s(i,r);r.pushAttributes({isBestAnswer:c}),"comment"===r.contentType()&&(t(i,r)||e(r)||!app.current.matches(T.a)||o.add("bestAnswer",v.a.component({icon:"fa"+(c?"s":"r")+" fa-comment-dots",onclick:function(){a(i,c=!c,r)}},n(c))))}})),Object(r.extend)(U.a.prototype,"actionItems",(function(o){if(app.forum.attribute("useAlternativeBestAnswerUi")){var r=this.attrs.post,i=this.attrs.post.discussion(),c=s(i,r),u=!1!==i.bestAnswerPost();r.pushAttributes({isBestAnswer:c}),t(i,r)||e(r)||!app.current.matches(T.a)||o.add("bestAnswer",v.a.component({className:u?c?"Button Button--primary":"Button Button--link":"Button Button--primary",onclick:function(){u=!u,a(i,c=!c,r)}},n(c)))}})),Object(r.extend)(U.a.prototype,"headerItems",(function(t){var e=this.attrs.post;e.discussion().bestAnswerPost()&&e.discussion().bestAnswerPost().id()===e.id()&&!e.isHidden()&&t.add("isBestAnswer",$.component({post:e,discussion:e.discussion()}))})),Object(r.extend)(U.a.prototype,"footerItems",(function(t){var e=this.attrs.post,s=e.discussion(),n=s.bestAnswerPost();if(n&&!n.isHidden()&&1===e.number()&&!e.isHidden()){var o=n.user();t.add("bestAnswerPost",m("div",{className:"CommentPost",onclick:function(){return app.current.get("stream").goToNumber(n.number())}},m("div",{className:"Post-header"},m("ul",null,m("li",{className:"item-user"},m("div",{className:"PostUser"},o&&F()(o),m("h3",null,o?m(E.a,{href:app.route.user(o)},q()(o)):q()(o)))),n.discussion()&&m("li",{className:"item-meta"},M.a.component({post:n})),$.component({post:n,discussion:s}))),m("div",{className:"Post-body"},m.trust(n.contentHtml()))),-10)}})),Object(r.extend)(Q.a.prototype,"elementAttrs",(function(t){var e=this.attrs.post;e.discussion().bestAnswerPost()&&e.discussion().bestAnswerPost().id()===e.id()&&!e.isHidden()&&(t.className?t.className+=" Post--bestAnswer":t.className="Post--bestAnswer")})),Object(r.extend)(d.a.prototype,"notificationTypes",(function(t){t.add("awardedBestAnswer",{name:"awardedBestAnswer",icon:"fas fa-check",label:o.a.translator.trans("fof-best-answer.forum.notification.preferences.awarded_best_answer")}),t.add("bestAnswerInDiscussion",{name:"bestAnswerInDiscussion",icon:"fas fa-check",label:o.a.translator.trans("fof-best-answer.forum.notification.preferences.best_answer_in_discussion")})})),Object(r.extend)(w.a.prototype,"sidebarItems",(function(t){var e=this.currentTag();if(null!=e&&null!=e.isQnA&&e.isQnA()){var s=o.a.forum.attribute("canStartDiscussion")||!o.a.session.user,n=t.get("newDiscussion");n.children=o.a.translator.trans(s?"fof-best-answer.forum.index.ask_question":"fof-best-answer.index.cannot_ask_question"),t.replace("startDiscussion",n)}})),Object(r.extend)(w.a.prototype,"viewItems",(function(t){var e=this.currentTag();if(null!=e&&null!=e.isQnA&&e.isQnA()){var s=["all","solved","unsolved"],n=o.a.discussions.bestAnswer;t.add("solved-filter",A.a.component({buttonClassName:"Button",label:o.a.translator.trans("fof-best-answer.forum.filter."+(s[n]||Object.keys(s).map((function(t){return s[t]}))[0])+"_label"),accessibleToggleLabel:o.a.translator.trans("fof-best-answer.forum.filter.accessible_label")},Object.keys(s).map((function(t){var e=s[t],r=(n||Object.keys(s)[0])===t;return v.a.component({icon:!r||"fas fa-check",active:r,onclick:function(){o.a.discussions.bestAnswer=t,"0"===t&&delete o.a.discussions.bestAnswer,o.a.discussions.refresh()}},o.a.translator.trans("fof-best-answer.forum.filter."+e+"_label"))}))))}else o.a.discussions.bestAnswer&&(delete o.a.discussions.bestAnswer,o.a.discussions.refresh())})),Object(r.extend)(P.a.prototype,"requestParams",(function(t){if(o.a.discussions.bestAnswer){var e="2"===o.a.discussions.bestAnswer;t.filter[(e?"-":"")+"solved-discussions"]=!0}})),Object(r.extend)(O.a.prototype,"headerItems",(function(t){var e=this.composer.fields.tags;void 0!==e&&(e.some((function(t){return t.isQnA()}))&&(this.attrs.titlePlaceholder=o.a.translator.trans("fof-best-answer.forum.composer.titlePlaceholder"),t.replace("discussionTitle",m("h3",null,m("input",{className:"FormControl",bidi:this.title,placeholder:this.attrs.titlePlaceholder,disabled:!!this.attrs.disabled,onkeydown:this.onkeydown.bind(this)})))))}))}))}]);
//# sourceMappingURL=forum.js.map