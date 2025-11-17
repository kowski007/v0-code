"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@heroui+use-callback-ref@2.1.8_react@19.0.0";
exports.ids = ["vendor-chunks/@heroui+use-callback-ref@2.1.8_react@19.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@heroui+use-callback-ref@2.1.8_react@19.0.0/node_modules/@heroui/use-callback-ref/dist/index.mjs":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@heroui+use-callback-ref@2.1.8_react@19.0.0/node_modules/@heroui/use-callback-ref/dist/index.mjs ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.2.25_@babel+core@7.28.5_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _heroui_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @heroui/use-safe-layout-effect */ \"(ssr)/./node_modules/.pnpm/@heroui+use-safe-layout-effect@2.1.8_react@19.0.0/node_modules/@heroui/use-safe-layout-effect/dist/index.mjs\");\n// src/index.ts\n\n\nfunction useCallbackRef(fn, deps = []) {\n  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fn);\n  (0,_heroui_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useSafeLayoutEffect)(() => {\n    ref.current = fn;\n  });\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {\n    var _a;\n    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);\n  }, deps);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGhlcm91aSt1c2UtY2FsbGJhY2stcmVmQDIuMS44X3JlYWN0QDE5LjAuMC9ub2RlX21vZHVsZXMvQGhlcm91aS91c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQzRDO0FBQ3lCO0FBQ3JFO0FBQ0EsY0FBYyw2Q0FBTTtBQUNwQixFQUFFLG1GQUFtQjtBQUNyQjtBQUNBLEdBQUc7QUFDSCxTQUFTLGtEQUFXO0FBQ3BCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFHRSIsInNvdXJjZXMiOlsid2VicGFjazovL215LXYwLXByb2plY3QvLi9ub2RlX21vZHVsZXMvLnBucG0vQGhlcm91aSt1c2UtY2FsbGJhY2stcmVmQDIuMS44X3JlYWN0QDE5LjAuMC9ub2RlX21vZHVsZXMvQGhlcm91aS91c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzPzJiOTEiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2luZGV4LnRzXG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTYWZlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkBoZXJvdWkvdXNlLXNhZmUtbGF5b3V0LWVmZmVjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoZm4sIGRlcHMgPSBbXSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYoZm4pO1xuICB1c2VTYWZlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICByZWYuY3VycmVudCA9IGZuO1xuICB9KTtcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKCguLi5hcmdzKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSByZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLmNhbGwocmVmLCAuLi5hcmdzKTtcbiAgfSwgZGVwcyk7XG59XG5leHBvcnQge1xuICB1c2VDYWxsYmFja1JlZlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@heroui+use-callback-ref@2.1.8_react@19.0.0/node_modules/@heroui/use-callback-ref/dist/index.mjs\n");

/***/ })

};
;