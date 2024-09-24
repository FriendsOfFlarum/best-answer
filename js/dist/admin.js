/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/BestAnswerSettingsPage.tsx":
/*!*********************************************************!*\
  !*** ./src/admin/components/BestAnswerSettingsPage.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BestAnswerSettingsPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_2__);



var BestAnswerSettingsPage = /*#__PURE__*/function (_ExtensionPage) {
  function BestAnswerSettingsPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BestAnswerSettingsPage, _ExtensionPage);
  var _proto = BestAnswerSettingsPage.prototype;
  _proto.content = function content() {
    return m("div", {
      className: "BestAnswerSettings"
    }, m("div", {
      className: "container"
    }, m("div", {
      className: "BestAnswerSettings--content"
    }, m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.tags')), m("p", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.tags_info')), m("div", {
      className: "Section"
    }, this.buildSettingComponent({
      type: 'flarum-tags.select-tags',
      setting: 'fof-best-answer.enabled-tags',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.enabled_tags_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.enabled_tags_help'),
      options: {
        requireParentTag: false
      }
    }), this.buildSettingComponent({
      type: 'flarum-tags.select-tags',
      setting: 'fof-best-answer.remind-tags',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.remind_tags_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.remind_tags_help'),
      options: {
        requireParentTag: false
      }
    })), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.general')), m("div", {
      className: "Section"
    }, this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.allow_select_own_post',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.allow_select_own_post'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.allow_select_own_post_help')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.use_alternative_ui',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.use_alt_ui'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.use_alt_ui_help')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.show_filter_dropdown',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.show_filter_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.show_filter_help')
    }), this.buildSettingComponent({
      type: 'number',
      setting: 'fof-best-answer.show_max_lines',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.show_max_lines_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.show_max_lines_help')
    }), this.buildSettingComponent({
      type: 'flarum-tags.select-tags',
      setting: 'fof-best-answer.select_best_answer_tags',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.select_best_answer_tags_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.select_best_answer_tags_help'),
      options: {
        requireParentTag: true,
        limits: {
          max: {
            primary: 0
          }
        }
      }
    }), this.buildSettingComponent({
      setting: 'fof-best-answer.discussion_sidebar_jump_button',
      type: 'boolean',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button_help')
    })), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.search')), m("div", {
      className: "Section"
    }, this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.search.solution_search',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.solution_search'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.solution_search_help')
    })), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.reminders')), m("p", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.reminders_notice'), ' ', m("a", {
      href: "https://docs.flarum.org/console/#schedulerun",
      target: "_blank"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.documentation'))), m("div", {
      className: "Section"
    }, this.buildSettingComponent({
      type: 'number',
      setting: 'fof-best-answer.select_best_answer_reminder_days',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days'),
      placeholder: '0',
      min: 0,
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days_help')
    })), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.label.advanced')), m("div", {
      className: "Section"
    }, this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.schedule_on_one_server',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.schedule_on_one_server'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.schedule_on_one_server_help')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.stop_overnight',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight_help')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'fof-best-answer.store_log_output',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.admin.settings.schedule_log_output')
    })), this.submitButton())));
  };
  return BestAnswerSettingsPage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/admin/extend.ts":
/*!*****************************!*\
  !*** ./src/admin/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([].concat(_common_extend__WEBPACK_IMPORTED_MODULE_0__["default"]));

/***/ }),

/***/ "./src/admin/index.ts":
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_addBestAnswerCountSort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/addBestAnswerCountSort */ "./src/common/addBestAnswerCountSort.ts");
/* harmony import */ var _components_BestAnswerSettingsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/BestAnswerSettingsPage */ "./src/admin/components/BestAnswerSettingsPage.tsx");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.ts");




flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('fof-best-answer', function () {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('fof-best-answer').registerPage(_components_BestAnswerSettingsPage__WEBPACK_IMPORTED_MODULE_2__["default"]).registerPermission({
    icon: 'far fa-comment',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.admin.permissions.best_answer'),
    permission: 'discussion.selectBestAnswerOwnDiscussion'
  }, 'reply').registerPermission({
    icon: 'far fa-comment',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.admin.permissions.best_answer_not_own_discussion'),
    permission: 'discussion.selectBestAnswerNotOwnDiscussion'
  }, 'reply');
  (0,_common_addBestAnswerCountSort__WEBPACK_IMPORTED_MODULE_1__["default"])();
}, 5);

/***/ }),

/***/ "./src/common/addBestAnswerCountSort.ts":
/*!**********************************************!*\
  !*** ./src/common/addBestAnswerCountSort.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  var FoFUserDirectory = __webpack_require__(/*! @fof-user-directory */ "@fof-user-directory");
  if (!FoFUserDirectory) return;
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.override)(FoFUserDirectory.SortMap.prototype, 'sortMap', function (map) {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, map(), {
      most_best_answers: '-bestAnswerCount',
      least_best_answers: 'bestAnswerCount'
    });
  });
});

/***/ }),

/***/ "./src/common/extend.ts":
/*!******************************!*\
  !*** ./src/common/extend.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_tags_models_Tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/tags/models/Tag */ "flarum/tags/models/Tag");
/* harmony import */ var flarum_tags_models_Tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_tags_models_Tag__WEBPACK_IMPORTED_MODULE_1__);

// @ts-ignore

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)((flarum_tags_models_Tag__WEBPACK_IMPORTED_MODULE_1___default())) //
.attribute('isQnA').attribute('reminders')]);

/***/ }),

/***/ "@fof-user-directory":
/*!**********************************************************!*\
  !*** external "flarum.extensions['fof-user-directory']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.extensions['fof-user-directory'];

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/tags/models/Tag":
/*!********************************************************!*\
  !*** external "flarum.core.compat['tags/models/Tag']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['tags/models/Tag'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map