(()=>{var e={493:e=>{"use strict";e.exports=flarum.extensions["fof-user-directory"]}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";s.r(n),s.d(n,{extend:()=>_});const e=flarum.core.compat["admin/app"];var t=s.n(e);function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}const r=flarum.core.compat["admin/components/ExtensionPage"];var o=s.n(r);flarum.core.compat["common/components/Button"],flarum.core.compat["common/components/Link"];var l=function(e){var s,n;function r(){return e.apply(this,arguments)||this}n=e,(s=r).prototype=Object.create(n.prototype),s.prototype.constructor=s,a(s,n);var o=r.prototype;return o.oninit=function(t){e.prototype.oninit.call(this,t),this.loading=!1},o.enableAllTags=function(){this.enable("enableAllTags")},o.enableAllReminders=function(){this.enable("enableAllReminders")},o.enable=function(e){var s=this;this.loading=!0,t().request({method:"POST",url:t().forum.attribute("apiUrl")+"/fof/best-answer/enable",body:{feature:e}}).then((function(){s.loading=!1,m.redraw()}))},o.content=function(){return[m("div",{className:"container"},m("div",{className:"BestAnswerSettingsPage"},m("div",{className:"Form"},m("div",{className:"Introduction"},m("h3",null,t().translator.trans("fof-best-answer.admin.settings.label.tags")),m("p",{className:"helpText"},t().translator.trans("fof-best-answer.admin.settings.tags_info")),this.buildSettingComponent({type:"flarum-tags.select-tags",setting:"fof-best-answer.enabled-tags",label:t().translator.trans("fof-best-answer.admin.settings.enabled_tags_label"),help:t().translator.trans("fof-best-answer.admin.settings.enabled_tags_help"),options:{requireParentTag:!1,limits:{max:{secondary:0}}}}),this.buildSettingComponent({type:"flarum-tags.select-tags",setting:"fof-best-answer.remind-tags",label:t().translator.trans("fof-best-answer.admin.settings.remind_tags_label"),help:t().translator.trans("fof-best-answer.admin.settings.remind_tags_help"),options:{requireParentTag:!1,limits:{max:{secondary:0}}}})),m("hr",null),m("div",{className:"GeneralPreferences"},m("h3",null,t().translator.trans("fof-best-answer.admin.settings.label.general")),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.allow_select_own_post",label:t().translator.trans("fof-best-answer.admin.settings.allow_select_own_post"),help:t().translator.trans("fof-best-answer.admin.settings.allow_select_own_post_help")}),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.use_alternative_ui",label:t().translator.trans("fof-best-answer.admin.settings.use_alt_ui"),help:t().translator.trans("fof-best-answer.admin.settings.use_alt_ui_help")}),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.show_filter_dropdown",label:t().translator.trans("fof-best-answer.admin.settings.show_filter_label"),help:t().translator.trans("fof-best-answer.admin.settings.show_filter_help")}),this.buildSettingComponent({type:"number",setting:"fof-best-answer.show_max_lines",label:t().translator.trans("fof-best-answer.admin.settings.show_max_lines_label"),help:t().translator.trans("fof-best-answer.admin.settings.show_max_lines_help")}),this.buildSettingComponent({type:"flarum-tags.select-tags",setting:"fof-best-answer.select_best_answer_tags",label:t().translator.trans("fof-best-answer.admin.settings.select_best_answer_tags_label"),help:t().translator.trans("fof-best-answer.admin.settings.select_best_answer_tags_help"),options:{requireParentTag:!0,limits:{max:{primary:0}}}})),m("hr",null),m("div",{className:"Search"},m("h3",null,t().translator.trans("fof-best-answer.admin.settings.label.search")),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.search.solution_search",label:t().translator.trans("fof-best-answer.admin.settings.solution_search"),help:t().translator.trans("fof-best-answer.admin.settings.solution_search_help")})),m("hr",null),m("div",{className:"Reminders"},m("h3",null,t().translator.trans("fof-best-answer.admin.settings.label.reminders")),m("p",{className:"helpText"},t().translator.trans("fof-best-answer.admin.settings.label.reminders_notice")," ",m("a",{href:"https://docs.flarum.org/console/#schedulerun",target:"_blank"},t().translator.trans("fof-best-answer.admin.settings.documentation"))),this.buildSettingComponent({type:"number",setting:"fof-best-answer.select_best_answer_reminder_days",label:t().translator.trans("fof-best-answer.admin.settings.select_best_answer_reminder_days"),placeholder:"0",min:0,help:t().translator.trans("fof-best-answer.admin.settings.select_best_answer_reminder_days_help")})),m("hr",null),m("div",{className:"AdvancedPreferences"},m("h3",null,t().translator.trans("fof-best-answer.admin.settings.label.advanced")),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.schedule_on_one_server",label:t().translator.trans("fof-best-answer.admin.settings.schedule_on_one_server"),help:t().translator.trans("fof-best-answer.admin.settings.schedule_on_one_server_help")}),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.stop_overnight",label:t().translator.trans("fof-best-answer.admin.settings.schedule_stop_overnight"),help:t().translator.trans("fof-best-answer.admin.settings.schedule_stop_overnight_help")}),this.buildSettingComponent({type:"boolean",setting:"fof-best-answer.store_log_output",label:t().translator.trans("fof-best-answer.admin.settings.schedule_log_output")})),this.submitButton())))]},r}(o());function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},i.apply(this,arguments)}const f=flarum.core.compat["common/extend"],b=flarum.core.compat["common/extenders"];var d=s.n(b);const c=flarum.core.compat["tags/models/Tag"];var p=s.n(c);const u=[new(d().Model)(p()).attribute("isQnA").attribute("reminders")],_=[].concat(u);t().initializers.add("fof-best-answer",(function(){var e;t().extensionData.for("fof-best-answer").registerPage(l).registerPermission({icon:"far fa-comment",label:t().translator.trans("fof-best-answer.admin.permissions.best_answer"),permission:"discussion.selectBestAnswerOwnDiscussion"},"reply").registerPermission({icon:"far fa-comment",label:t().translator.trans("fof-best-answer.admin.permissions.best_answer_not_own_discussion"),permission:"discussion.selectBestAnswerNotOwnDiscussion"},"reply"),(e=s(493))&&(0,f.override)(e.SortMap.prototype,"sortMap",(function(e){return i({},e(),{most_best_answers:"-bestAnswerCount",least_best_answers:"bestAnswerCount"})}))}),5)})(),module.exports=n})();
//# sourceMappingURL=admin.js.map