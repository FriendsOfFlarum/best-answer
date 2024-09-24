/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/forum/addAnsweredBadge.tsx":
/*!****************************************!*\
  !*** ./src/forum/addAnsweredBadge.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Discussion */ "flarum/common/models/Discussion");
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_BestAnswerBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/BestAnswerBadge */ "./src/forum/components/BestAnswerBadge.tsx");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'badges', function (items) {
    if (this.hasBestAnswer() && !items.has('hidden')) {
      items.add('bestAnswer', m(_components_BestAnswerBadge__WEBPACK_IMPORTED_MODULE_2__["default"], null));
    }
  });
}

/***/ }),

/***/ "./src/forum/addBestAnswerAction.js":
/*!******************************************!*\
  !*** ./src/forum/addBestAnswerAction.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/utils/PostControls */ "flarum/forum/utils/PostControls");
/* harmony import */ var flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/DiscussionPage */ "flarum/forum/components/DiscussionPage");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/components/CommentPost */ "flarum/forum/components/CommentPost");
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  var ineligible = function ineligible(discussion, post) {
    return post.isHidden() || post.number() === 1 || !discussion.canSelectBestAnswer() || !(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user;
  };
  var blockSelectOwnPost = function blockSelectOwnPost(post) {
    return !flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('canSelectBestAnswerOwnPost') && post.user() && post.user().id() === flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.user.id();
  };
  var isThisBestAnswer = function isThisBestAnswer(discussion, post) {
    return discussion.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id();
  };
  var actionLabel = function actionLabel(isBestAnswer) {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans(isBestAnswer ? 'fof-best-answer.forum.remove_best_answer' : 'fof-best-answer.forum.this_best_answer');
  };
  var saveDiscussion = function saveDiscussion(discussion, isBestAnswer, post) {
    return discussion.save({
      bestAnswerPostId: isBestAnswer ? post.id() : 0,
      bestAnswerUserId: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.user.id(),
      relationships: isBestAnswer ? {
        bestAnswerPost: post,
        bestAnswerUser: (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user
      } : {
        bestAnswerPost: null
      }
    }, {
      params: {
        include: 'tags'
      }
    }).then(function () {
      if (!isBestAnswer) {
        delete discussion.data.relationships.bestAnswerPost;
        delete discussion.data.relationships.bestAnswerUser;
      }
      if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.matches((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default()))) {
        flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.get('stream').update();
      }
      m.redraw();
      if (isBestAnswer) {
        m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route.discussion(discussion));
      }
    });
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3___default()), 'moderationControls', function (items, post) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('useAlternativeBestAnswerUi')) return;
    var discussion = post.discussion();
    var isBestAnswer = isThisBestAnswer(discussion, post);
    post.pushAttributes({
      isBestAnswer: isBestAnswer
    });
    if (post.contentType() !== 'comment') return;
    if (ineligible(discussion, post) || blockSelectOwnPost(post) || !flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.matches((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default()))) return;
    items.add('bestAnswer', flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      icon: "fa" + (isBestAnswer ? 's' : 'r') + " fa-comment-dots",
      onclick: function onclick() {
        isBestAnswer = !isBestAnswer;
        saveDiscussion(discussion, isBestAnswer, post)["finally"](function () {
          isBestAnswer = isThisBestAnswer(discussion, post);
        });
      }
    }, actionLabel(isBestAnswer)));
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'actionItems', function (items) {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('useAlternativeBestAnswerUi')) return;
    var post = this.attrs.post;
    var discussion = this.attrs.post.discussion();
    var isBestAnswer = isThisBestAnswer(discussion, post);
    var hasBestAnswer = discussion.bestAnswerPost() !== false;
    post.pushAttributes({
      isBestAnswer: isBestAnswer
    });
    if (ineligible(discussion, post) || blockSelectOwnPost(post) || !flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.matches((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default()))) return;
    items.add('bestAnswer', flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: "Button Button--" + (!hasBestAnswer || isBestAnswer ? 'primary' : 'link'),
      onclick: function onclick() {
        hasBestAnswer = !hasBestAnswer;
        isBestAnswer = !isBestAnswer;
        saveDiscussion(discussion, isBestAnswer, post)["finally"](function () {
          hasBestAnswer = discussion.hasBestAnswer() && discussion.bestAnswerPost() !== false;
          isBestAnswer = isThisBestAnswer(discussion, post);
        });
      }
    }, actionLabel(isBestAnswer)));
  });
});

/***/ }),

/***/ "./src/forum/addBestAnswerCountToUsers.tsx":
/*!*************************************************!*\
  !*** ./src/forum/addBestAnswerCountToUsers.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addBestAnswerCountToUsers)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);




function addBestAnswerCountToUsers() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'infoItems', function (items) {
    var user = this.attrs.user;
    items.add('best-answer-count', m("span", {
      className: "UserCard-bestAnswerCount"
    }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('fas fa-check'), flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.user.best-answer-count', {
      count: user.bestAnswerCount()
    })), 55);
  });
}

/***/ }),

/***/ "./src/forum/addBestAnswerView.tsx":
/*!*****************************************!*\
  !*** ./src/forum/addBestAnswerView.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/CommentPost */ "flarum/forum/components/CommentPost");
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/components/Post */ "flarum/forum/components/Post");
/* harmony import */ var flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SelectBestAnswerItem */ "./src/forum/components/SelectBestAnswerItem.js");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/components/DiscussionPage */ "flarum/forum/components/DiscussionPage");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_BestAnswerFooterPreview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/BestAnswerFooterPreview */ "./src/forum/components/BestAnswerFooterPreview.tsx");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'headerItems', function (items) {
    var post = this.attrs.post;
    var discussion = post.discussion();
    if (discussion != null && discussion.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id() && !post.isHidden()) {
      items.add('isBestAnswer', _components_SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_4__["default"].component({
        post: post,
        discussion: post.discussion()
      }), -100);
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'footerItems', function (items) {
    var thisPost = this.attrs.post;
    var discussion = thisPost.discussion();
    var post = discussion.hasBestAnswer() && discussion.bestAnswerPost();
    if (post && !post.isHidden() && thisPost.number() === 1 && !thisPost.isHidden()) {
      var user = post.user();
      items.add('bestAnswerPost', m(_components_BestAnswerFooterPreview__WEBPACK_IMPORTED_MODULE_7__["default"], {
        post: post,
        user: user
      }), -10);
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'elementAttrs', function (elementAttrs) {
    var post = this.attrs.post;
    var discussion = post.discussion();
    if (discussion != null && discussion.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id() && !post.isHidden()) {
      elementAttrs.className ? elementAttrs.className += ' Post--bestAnswer' : elementAttrs.className = 'Post--bestAnswer';
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'sidebarItems', function (items) {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('bestAnswerDiscussionSidebarJumpButton')) return;

    /** @ts-ignore */
    var discussion = this.discussion;
    if (!discussion) return;
    var post = discussion.hasBestAnswer() && discussion.bestAnswerPost();
    if (post && !post.isHidden() && post.number() !== 1 && !discussion.bestAnswerPost().isHidden()) {
      items.add('jumpToBestAnswer', m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
        className: "Button Button-jumpBestAnswer",
        icon: "fas fa-check",
        onclick: function onclick() {
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.get('stream').goToNumber(post.number());
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.discussion.jump_to_best_answer_button')), 90);
    }
  });
});

/***/ }),

/***/ "./src/forum/components/AwardedBestAnswerNotification.js":
/*!***************************************************************!*\
  !*** ./src/forum/components/AwardedBestAnswerNotification.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AwardedBestAnswerNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Notification */ "flarum/forum/components/Notification");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__);



var AwardedBestAnswerNotification = /*#__PURE__*/function (_Notification) {
  function AwardedBestAnswerNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AwardedBestAnswerNotification, _Notification);
  var _proto = AwardedBestAnswerNotification.prototype;
  _proto.icon = function icon() {
    return 'fas fa-check';
  };
  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.discussion(discussion);
  };
  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.forum.notification.awarded', {
      user: user
    });
  };
  _proto.excerpt = function excerpt() {
    return null;
  };
  return AwardedBestAnswerNotification;
}((flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/BestAnswerBadge.tsx":
/*!**************************************************!*\
  !*** ./src/forum/components/BestAnswerBadge.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BestAnswerBadge)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Badge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Badge */ "flarum/common/components/Badge");
/* harmony import */ var flarum_common_components_Badge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Badge__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);



var BestAnswerBadge = /*#__PURE__*/function (_Badge) {
  function BestAnswerBadge() {
    return _Badge.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BestAnswerBadge, _Badge);
  BestAnswerBadge.initAttrs = function initAttrs(attrs) {
    attrs.type = 'bestAnswer';
    attrs.icon = 'fas fa-check';
    attrs.label = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.answered_badge');
  };
  return BestAnswerBadge;
}((flarum_common_components_Badge__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/BestAnswerFooterPreview.tsx":
/*!**********************************************************!*\
  !*** ./src/forum/components/BestAnswerFooterPreview.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BestAnswerFooterPreview)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/username */ "flarum/common/helpers/username");
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_helpers_userOnline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/helpers/userOnline */ "flarum/common/helpers/userOnline");
/* harmony import */ var flarum_common_helpers_userOnline__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_userOnline__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_forum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/components/PostMeta */ "flarum/forum/components/PostMeta");
/* harmony import */ var flarum_forum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SelectBestAnswerItem */ "./src/forum/components/SelectBestAnswerItem.js");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__);










var BestAnswerFooterPreview = /*#__PURE__*/function (_Component) {
  function BestAnswerFooterPreview() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.user = void 0;
    _this.post = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BestAnswerFooterPreview, _Component);
  var _proto = BestAnswerFooterPreview.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.user = this.attrs.user;
    this.post = this.attrs.post;
  };
  _proto.view = function view() {
    var _this2 = this;
    var maxLines = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('fof-best-answer.show_max_lines');
    return m("div", {
      className: "CommentPost",
      onclick: function onclick() {
        return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().current.get('stream').goToNumber(_this2.post.number());
      }
    }, m("div", {
      className: "Post-header"
    }, m("ul", null, this.headerItems().toArray())), m("div", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default()('Post-body', maxLines > 0 && 'Post-body--truncate'),
      style: {
        '--max-lines': maxLines
      }
    }, m.trust(this.postContent())));
  };
  _proto.postContent = function postContent() {
    return this.post.contentHtml();
  }

  /**
   * To maintain compatibility with existing styling, custom themes, etc, each item here must be
   * wrapped in a <li> element.
   *
   * @todo: Remove this requirement for Flarum 2.0
   */;
  _proto.headerItems = function headerItems() {
    var items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default())();
    items.add('user', this.userItem()), 100;
    this.post.discussion() && items.add('meta', this.metaItem()), 90;
    items.add('bestAnswer', m(_SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
      post: this.post,
      discussion: this.post.discussion()
    }), -100);
    return items;
  };
  _proto.userItem = function userItem() {
    return m("li", {
      className: "item-user"
    }, m("div", {
      className: "PostUser"
    }, this.user && flarum_common_helpers_userOnline__WEBPACK_IMPORTED_MODULE_4___default()(this.user), m("h3", null, this.user ? m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6___default()), {
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.user(this.user)
    }, flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3___default()(this.user)) : flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3___default()(this.user))));
  };
  _proto.metaItem = function metaItem() {
    return m("li", {
      className: "item-meta"
    }, m((flarum_forum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5___default()), {
      post: this.post
    }));
  };
  return BestAnswerFooterPreview;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/BestAnswerInDiscussionNotification.js":
/*!********************************************************************!*\
  !*** ./src/forum/components/BestAnswerInDiscussionNotification.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BestAnswerInDiscussionNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Notification */ "flarum/forum/components/Notification");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__);



var BestAnswerInDiscussionNotification = /*#__PURE__*/function (_Notification) {
  function BestAnswerInDiscussionNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BestAnswerInDiscussionNotification, _Notification);
  var _proto = BestAnswerInDiscussionNotification.prototype;
  _proto.icon = function icon() {
    return 'fas fa-check';
  };
  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.discussion(discussion);
  };
  _proto.content = function content() {
    var user = this.attrs.notification.fromUser();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.forum.notification.best_answer_in_discussion', {
      user: user
    });
  };
  _proto.excerpt = function excerpt() {
    return null;
  };
  return BestAnswerInDiscussionNotification;
}((flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/SelectBestAnswerItem.js":
/*!******************************************************!*\
  !*** ./src/forum/components/SelectBestAnswerItem.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectBestAnswerItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/readOnlyError */ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_7__);








var SelectBestAnswerItem = /*#__PURE__*/function (_Component) {
  function SelectBestAnswerItem() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(SelectBestAnswerItem, _Component);
  var _proto = SelectBestAnswerItem.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    var _this$attrs = this.attrs,
      post = _this$attrs.post,
      discussion = _this$attrs.discussion;
    this.post = post;
    this.discussion = discussion;
  };
  _proto.view = function view() {
    return m("li", {
      className: "Post--BestAnswer"
    }, this.items().toArray());
  };
  _proto.getSetTime = function getSetTime(discussion) {
    if (discussion.bestAnswerSetAt() === null) {
      return;
    }
    return flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default()(discussion.bestAnswerSetAt());
  };
  _proto.items = function items() {
    var _this = this;
    var items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_7___default())();
    items.add('post', this.post ? m("span", null, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4___default()('fas fa-check'), flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.best_answer_button')) : m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_6___default()), {
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route.post(this.post),
      "data-number": this.post.number()
    }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_4___default()('fas fa-check'), flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.best_answer_button')));
    items.add('user', m("span", {
      className: "BestAnswer--User"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.best_answer_label', {
      user: this.discussion.bestAnswerUser(),
      time_set: this.getSetTime(this.discussion),
      a: m("a", {
        onclick: function onclick() {
          return m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route.user(_this.discussion.bestAnswerUser()));
        }
      })
    })));
    return items;
  };
  return SelectBestAnswerItem;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/SelectBestAnswerNotification.js":
/*!**************************************************************!*\
  !*** ./src/forum/components/SelectBestAnswerNotification.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectBestAnswerNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Notification */ "flarum/forum/components/Notification");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2__);



var SelectBestAnswerNotification = /*#__PURE__*/function (_Notification) {
  function SelectBestAnswerNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SelectBestAnswerNotification, _Notification);
  var _proto = SelectBestAnswerNotification.prototype;
  _proto.icon = function icon() {
    return 'fas fa-comment-dots';
  };
  _proto.href = function href() {
    var notification = this.attrs.notification;
    var discussion = notification.subject();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.discussion(discussion);
  };
  _proto.content = function content() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-best-answer.forum.notification.content');
  };
  _proto.excerpt = function excerpt() {
    return null;
  };
  return SelectBestAnswerNotification;
}((flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/SolutionSearchSource.tsx":
/*!*******************************************************!*\
  !*** ./src/forum/components/SolutionSearchSource.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SolutionSearchSource)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/highlight */ "flarum/common/helpers/highlight");
/* harmony import */ var flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _BestAnswerBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BestAnswerBadge */ "./src/forum/components/BestAnswerBadge.tsx");
/* harmony import */ var flarum_tags_helpers_tagsLabel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/tags/helpers/tagsLabel */ "flarum/tags/helpers/tagsLabel");
/* harmony import */ var flarum_tags_helpers_tagsLabel__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_tags_helpers_tagsLabel__WEBPACK_IMPORTED_MODULE_7__);







/** @ts-ignore */

var SolutionSearchSource = /*#__PURE__*/function () {
  function SolutionSearchSource() {
    this.results = new Map();
  }
  var _proto = SolutionSearchSource.prototype;
  _proto.search = /*#__PURE__*/function () {
    var _search = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(query) {
      var _this = this;
      var params;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            query = query.toLowerCase();
            this.results.set(query, []);
            params = {
              filter: {
                q: query + ' is:solved'
              },
              page: {
                limit: 3
              },
              include: 'mostRelevantPost,bestAnswerPost,tags'
            };
            return _context.abrupt("return", flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('discussions', params).then(function (results) {
              _this.results.set(query, results);
              m.redraw();
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function search(_x) {
      return _search.apply(this, arguments);
    }
    return search;
  }();
  _proto.view = function view(query) {
    query = query.toLowerCase();
    var results = (this.results.get(query) || []).map(function (discussion) {
      var _mostRelevantPost$con, _bestAnswerPost$conte;
      var bestAnswerPost = discussion.bestAnswerPost();
      var mostRelevantPost = discussion.mostRelevantPost();
      var tags = discussion.tags();
      return m("li", {
        className: "SolutionSearchResult DiscussionSearchResult",
        "data-index": 'discussions' + discussion.id()
      }, m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4___default()), {
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route.discussion(discussion, bestAnswerPost && bestAnswerPost.number() || 0)
      }, m("div", {
        className: "SolutionSearchResult-tags"
      }, flarum_tags_helpers_tagsLabel__WEBPACK_IMPORTED_MODULE_7___default()(tags)), m("div", {
        className: "DiscussionSearchResult-title"
      }, flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default()(discussion.title(), query)), !!mostRelevantPost && m("div", {
        className: "DiscussionSearchResult-excerpt"
      }, flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default()((_mostRelevantPost$con = mostRelevantPost.contentPlain()) != null ? _mostRelevantPost$con : '', query, 100)), !!bestAnswerPost && m("div", {
        className: "DiscussionSearchResult-excerpt SolutionSearchResult-bestAnswer"
      }, flarum_common_helpers_highlight__WEBPACK_IMPORTED_MODULE_3___default()((_bestAnswerPost$conte = bestAnswerPost.contentPlain()) != null ? _bestAnswerPost$conte : '', query, 100))));
    });
    return [m("li", {
      className: "Dropdown-header"
    }, m(_BestAnswerBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null), " ", flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.search.discussions_solutions_heading')), m("li", null, m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_5___default()), {
      icon: "fas fa-search",
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route('index', {
        q: query + ' is:solved'
      })
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-best-answer.forum.search.all_discussions_solutions_button', {
      query: query
    })))].concat(results);
  };
  return SolutionSearchSource;
}();


/***/ }),

/***/ "./src/forum/components/index.ts":
/*!***************************************!*\
  !*** ./src/forum/components/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   components: () => (/* binding */ components)
/* harmony export */ });
/* harmony import */ var _AwardedBestAnswerNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AwardedBestAnswerNotification */ "./src/forum/components/AwardedBestAnswerNotification.js");
/* harmony import */ var _BestAnswerBadge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BestAnswerBadge */ "./src/forum/components/BestAnswerBadge.tsx");
/* harmony import */ var _BestAnswerFooterPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BestAnswerFooterPreview */ "./src/forum/components/BestAnswerFooterPreview.tsx");
/* harmony import */ var _BestAnswerInDiscussionNotification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BestAnswerInDiscussionNotification */ "./src/forum/components/BestAnswerInDiscussionNotification.js");
/* harmony import */ var _SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectBestAnswerItem */ "./src/forum/components/SelectBestAnswerItem.js");
/* harmony import */ var _SelectBestAnswerNotification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectBestAnswerNotification */ "./src/forum/components/SelectBestAnswerNotification.js");
/* harmony import */ var _SolutionSearchSource__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SolutionSearchSource */ "./src/forum/components/SolutionSearchSource.tsx");







var components = {
  SelectBestAnswerItem: _SelectBestAnswerItem__WEBPACK_IMPORTED_MODULE_4__["default"],
  SolutionSearchSource: _SolutionSearchSource__WEBPACK_IMPORTED_MODULE_6__["default"],
  BestAnswerFooterPreview: _BestAnswerFooterPreview__WEBPACK_IMPORTED_MODULE_2__["default"],
  AwardedBestAnswerNotification: _AwardedBestAnswerNotification__WEBPACK_IMPORTED_MODULE_0__["default"],
  BestAnswerBadge: _BestAnswerBadge__WEBPACK_IMPORTED_MODULE_1__["default"],
  BestAnswerInDiscussionNotification: _BestAnswerInDiscussionNotification__WEBPACK_IMPORTED_MODULE_3__["default"],
  SelectBestAnswerNotification: _SelectBestAnswerNotification__WEBPACK_IMPORTED_MODULE_5__["default"]
};

/***/ }),

/***/ "./src/forum/extend.ts":
/*!*****************************!*\
  !*** ./src/forum/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/models/Discussion */ "flarum/common/models/Discussion");
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/models/User */ "flarum/common/models/User");
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_User__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([].concat(_common_extend__WEBPACK_IMPORTED_MODULE_1__["default"], [new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_2___default().Model)((flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_0___default())) //
.hasOne('bestAnswerPost').hasOne('bestAnswerUser').attribute('hasBestAnswer').attribute('canSelectBestAnswer').attribute('bestAnswerSetAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_4___default().transformDate)), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_2___default().Model)((flarum_common_models_User__WEBPACK_IMPORTED_MODULE_3___default())) //
.attribute('bestAnswerCount')]));

/***/ }),

/***/ "./src/forum/extenders/extendNotifications.ts":
/*!****************************************************!*\
  !*** ./src/forum/extenders/extendNotifications.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/NotificationGrid */ "flarum/forum/components/NotificationGrid");
/* harmony import */ var flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'notificationTypes', function (items) {
    items.add('awardedBestAnswer', {
      name: 'awardedBestAnswer',
      icon: 'fas fa-check',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.notification.preferences.awarded_best_answer')
    });
    items.add('bestAnswerInDiscussion', {
      name: 'bestAnswerInDiscussion',
      icon: 'fas fa-check',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.notification.preferences.best_answer_in_discussion')
    });
    items.add('selectBestAnswer', {
      name: 'selectBestAnswer',
      icon: 'fas fa-stopwatch',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.notification.preferences.select_best_answer')
    });
  });
}

/***/ }),

/***/ "./src/forum/extenders/extendSearch.ts":
/*!*********************************************!*\
  !*** ./src/forum/extenders/extendSearch.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extendSearch)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Search */ "flarum/forum/components/Search");
/* harmony import */ var flarum_forum_components_Search__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Search__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_SolutionSearchSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/SolutionSearchSource */ "./src/forum/components/SolutionSearchSource.tsx");




function extendSearch() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_Search__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'sourceItems', function (items) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('solutionSearchEnabled')) {
      items.add('solution', new _components_SolutionSearchSource__WEBPACK_IMPORTED_MODULE_3__["default"](), 110);
    }
  });
}

/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   components: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_17__.components),
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_18__["default"])
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_forum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/states/DiscussionListState */ "flarum/forum/states/DiscussionListState");
/* harmony import */ var flarum_forum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_forum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/forum/components/DiscussionComposer */ "flarum/forum/components/DiscussionComposer");
/* harmony import */ var flarum_forum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_SelectBestAnswerNotification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/SelectBestAnswerNotification */ "./src/forum/components/SelectBestAnswerNotification.js");
/* harmony import */ var _addBestAnswerAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addBestAnswerAction */ "./src/forum/addBestAnswerAction.js");
/* harmony import */ var _addBestAnswerView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addBestAnswerView */ "./src/forum/addBestAnswerView.tsx");
/* harmony import */ var _addAnsweredBadge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./addAnsweredBadge */ "./src/forum/addAnsweredBadge.tsx");
/* harmony import */ var _components_AwardedBestAnswerNotification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/AwardedBestAnswerNotification */ "./src/forum/components/AwardedBestAnswerNotification.js");
/* harmony import */ var _components_BestAnswerInDiscussionNotification__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/BestAnswerInDiscussionNotification */ "./src/forum/components/BestAnswerInDiscussionNotification.js");
/* harmony import */ var _extenders_extendNotifications__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./extenders/extendNotifications */ "./src/forum/extenders/extendNotifications.ts");
/* harmony import */ var _addBestAnswerCountToUsers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./addBestAnswerCountToUsers */ "./src/forum/addBestAnswerCountToUsers.tsx");
/* harmony import */ var _common_addBestAnswerCountSort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/addBestAnswerCountSort */ "./src/common/addBestAnswerCountSort.ts");
/* harmony import */ var _extenders_extendSearch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./extenders/extendSearch */ "./src/forum/extenders/extendSearch.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components */ "./src/forum/components/index.ts");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./extend */ "./src/forum/extend.ts");



















flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('fof/best-answer', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).selectBestAnswer = _components_SelectBestAnswerNotification__WEBPACK_IMPORTED_MODULE_7__["default"];
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).awardedBestAnswer = _components_AwardedBestAnswerNotification__WEBPACK_IMPORTED_MODULE_11__["default"];
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).bestAnswerInDiscussion = _components_BestAnswerInDiscussionNotification__WEBPACK_IMPORTED_MODULE_12__["default"];
  (0,_addAnsweredBadge__WEBPACK_IMPORTED_MODULE_10__["default"])();
  (0,_addBestAnswerAction__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_addBestAnswerView__WEBPACK_IMPORTED_MODULE_9__["default"])();
  (0,_addBestAnswerCountToUsers__WEBPACK_IMPORTED_MODULE_14__["default"])();
  (0,_common_addBestAnswerCountSort__WEBPACK_IMPORTED_MODULE_15__["default"])();
  (0,_extenders_extendNotifications__WEBPACK_IMPORTED_MODULE_13__["default"])();
  (0,_extenders_extendSearch__WEBPACK_IMPORTED_MODULE_16__["default"])();
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'sidebarItems', function (items) {
    var tag = this.currentTag();
    if (!(tag != null && tag.isQnA != null && tag.isQnA())) return;
    var canStartDiscussion = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('canStartDiscussion') || !(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user;
    var cta = items.get('newDiscussion');
    cta.children = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans(canStartDiscussion ? 'fof-best-answer.forum.index.ask_question' : 'fof-best-answer.forum.index.cannot_ask_question');
    if (items.has('startDiscussion')) {
      items.setContent('startDiscussion', cta);
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'viewItems', function (items) {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('showBestAnswerFilterUi')) {
      return;
    }
    var tag = this.currentTag();
    if (!(tag != null && tag.isQnA != null && tag.isQnA())) {
      if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer) {
        delete (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer;
        flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions.refresh();
      }
      return;
    }
    var options = ['all', 'solved', 'unsolved'];
    var selected = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer;
    items.add('solved-filter', flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default().component({
      buttonClassName: 'Button',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans("fof-best-answer.forum.filter." + (options[selected] || Object.keys(options).map(function (key) {
        return options[key];
      })[0]) + "_label"),
      accessibleToggleLabel: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.filter.accessible_label')
    }, Object.keys(options).map(function (value) {
      var label = options[value];
      var active = (selected || Object.keys(options)[0]) === value;
      return flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
        icon: active ? 'fas fa-check' : true,
        active: active,
        onclick: function onclick() {
          (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer = value;
          if (value === '0') {
            delete (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer;
          }
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions.refresh();
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans("fof-best-answer.forum.filter." + label + "_label"));
    })));
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_states_DiscussionListState__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'requestParams', function (params) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer) {
      var negate = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().discussions).bestAnswer === '2';
      var prepend = negate ? '-' : '';
      params.filter[prepend + "solved-discussions"] = true;
      if (params.filter.q) {
        params.filter.q += " " + prepend + "is:solved";
      }
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6___default().prototype), 'headerItems', function (items) {
    var tags = this.composer.fields.tags;
    if (tags === undefined) return;
    var qna = tags.some(function (t) {
      return t.isQnA();
    });
    if (!qna) return;
    this.attrs.titlePlaceholder = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-best-answer.forum.composer.titlePlaceholder');
    if (items.has('discussionTitle')) {
      items.setContent('discussionTitle', m("h3", null, m("input", {
        className: "FormControl",
        bidi: this.title,
        placeholder: this.attrs.titlePlaceholder,
        disabled: !!this.attrs.disabled,
        onkeydown: this.onkeydown.bind(this)
      })));
    }
  });
});

/***/ }),

/***/ "@fof-user-directory":
/*!**********************************************************!*\
  !*** external "flarum.extensions['fof-user-directory']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.extensions['fof-user-directory'];

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Badge":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Badge']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Badge'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Dropdown']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Dropdown'];

/***/ }),

/***/ "flarum/common/components/Link":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Link']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Link'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

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

/***/ "flarum/common/helpers/highlight":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/highlight']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/highlight'];

/***/ }),

/***/ "flarum/common/helpers/humanTime":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/humanTime']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/humanTime'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/helpers/userOnline":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/userOnline']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/userOnline'];

/***/ }),

/***/ "flarum/common/helpers/username":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/username']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/username'];

/***/ }),

/***/ "flarum/common/models/Discussion":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/models/Discussion']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/models/Discussion'];

/***/ }),

/***/ "flarum/common/models/User":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/models/User']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/models/User'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/common/utils/classList":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/utils/classList']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/classList'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/CommentPost":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/CommentPost']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/CommentPost'];

/***/ }),

/***/ "flarum/forum/components/DiscussionComposer":
/*!****************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/DiscussionComposer']" ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/DiscussionComposer'];

/***/ }),

/***/ "flarum/forum/components/DiscussionPage":
/*!************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/DiscussionPage']" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/DiscussionPage'];

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/IndexPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/IndexPage'];

/***/ }),

/***/ "flarum/forum/components/Notification":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Notification']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Notification'];

/***/ }),

/***/ "flarum/forum/components/NotificationGrid":
/*!**************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/NotificationGrid']" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/NotificationGrid'];

/***/ }),

/***/ "flarum/forum/components/Post":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Post']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Post'];

/***/ }),

/***/ "flarum/forum/components/PostMeta":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/PostMeta']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/PostMeta'];

/***/ }),

/***/ "flarum/forum/components/Search":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Search']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Search'];

/***/ }),

/***/ "flarum/forum/components/UserCard":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserCard']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/UserCard'];

/***/ }),

/***/ "flarum/forum/states/DiscussionListState":
/*!*************************************************************************!*\
  !*** external "flarum.core.compat['forum/states/DiscussionListState']" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/states/DiscussionListState'];

/***/ }),

/***/ "flarum/forum/utils/PostControls":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['forum/utils/PostControls']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/utils/PostControls'];

/***/ }),

/***/ "flarum/tags/helpers/tagsLabel":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['tags/helpers/tagsLabel']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['tags/helpers/tagsLabel'];

/***/ }),

/***/ "flarum/tags/models/Tag":
/*!********************************************************!*\
  !*** external "flarum.core.compat['tags/models/Tag']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['tags/models/Tag'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


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

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _readOnlyError)
/* harmony export */ });
function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
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
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   components: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.components),
/* harmony export */   extend: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map