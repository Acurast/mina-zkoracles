(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(5786);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 1014:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);

const Spinner = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex h-screen items-center justify-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "spinner-border h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-gray-600 text-lg font-semibold flex animate-pulse",
                    children: props.message
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (Spinner);


/***/ }),

/***/ 5786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_ui_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1014);
/* harmony import */ var _app_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7273);
/* harmony import */ var _app_store_ZkappContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3559);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7294);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_app_page__WEBPACK_IMPORTED_MODULE_2__, _app_store_ZkappContext__WEBPACK_IMPORTED_MODULE_3__]);
([_app_page__WEBPACK_IMPORTED_MODULE_2__, _app_store_ZkappContext__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Home() {
    const Init = ()=>{
        const { hasBeenSetup } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(_app_store_ZkappContext__WEBPACK_IMPORTED_MODULE_3__/* .ZkappContext */ .d);
        const render = hasBeenSetup ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_app_page__WEBPACK_IMPORTED_MODULE_2__["default"], {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_app_ui_spinner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            message: "Loading client..."
        });
        return render;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_app_store_ZkappContext__WEBPACK_IMPORTED_MODULE_3__/* .ZkappContextProvider */ .X, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Init, {})
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [774,888,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);