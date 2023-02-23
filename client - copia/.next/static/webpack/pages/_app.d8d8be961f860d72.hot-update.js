"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./hooks/useCentro.js":
/*!****************************!*\
  !*** ./hooks/useCentro.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CentroState; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_CentroContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/CentroContext */ \"./context/CentroContext.js\");\n\nvar _s = $RefreshSig$();\n\n\nfunction reducer(state, action) {\n    const { payload , type  } = action;\n    switch(type){\n        case \"seleccionarCentro\":\n            console.log(payload);\n            return {\n                infoCentro: payload.infoCentro,\n                estadisticas: payload.estadisticas,\n                monitorizacions: payload.monitorizacions,\n                avisos: payload.avisos\n            };\n        default:\n            return state;\n    }\n}\nfunction CentroState(param) {\n    let { children  } = param;\n    _s();\n    const initialState = {\n        infoCentro: null,\n        estadisticas: null,\n        monitorizacions: null,\n        avisos: null\n    };\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState);\n    const seleccionarCentro = (centro)=>{\n        dispatch({\n            type: \"seleccionarCentro\",\n            payload: {\n                infoCentro: centro.infoCentro,\n                estadisticas: centro.estadisticas,\n                monitorizacions: centro.monitorizacions,\n                avisos: centro.avisos\n            }\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{}, [\n        state.infoCentro\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CentroContext__WEBPACK_IMPORTED_MODULE_2__[\"default\"].Provider, {\n        value: {\n            infoCentro: state.infoCentro,\n            estadisticas: state.estadisticas,\n            monitorizacions: state.monitorizacions,\n            avisos: state.avisos,\n            seleccionarCentro\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\hooks\\\\useCentro.js\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, this);\n}\n_s(CentroState, \"bgCdjuTOmPdSBRwTap80EFd9Y3U=\");\n_c = CentroState;\nvar _c;\n$RefreshReg$(_c, \"CentroState\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy91c2VDZW50cm8uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQXFEO0FBQ0E7QUFFckQsU0FBU0ksUUFBUUMsS0FBSyxFQUFFQyxNQUFNLEVBQUU7SUFDOUIsTUFBTSxFQUFFQyxRQUFPLEVBQUVDLEtBQUksRUFBRSxHQUFHRjtJQUUxQixPQUFRRTtRQUNOLEtBQUs7WUFDSEMsUUFBUUMsR0FBRyxDQUFDSDtZQUNaLE9BQU87Z0JBQ0xJLFlBQVlKLFFBQVFJLFVBQVU7Z0JBQzlCQyxjQUFjTCxRQUFRSyxZQUFZO2dCQUNsQ0MsaUJBQWlCTixRQUFRTSxlQUFlO2dCQUN4Q0MsUUFBUVAsUUFBUU8sTUFBTTtZQUN4QjtRQUNGO1lBQ0UsT0FBT1Q7SUFDWDtBQUNGO0FBRWUsU0FBU1UsWUFBWSxLQUFZLEVBQUU7UUFBZCxFQUFFQyxTQUFRLEVBQUUsR0FBWjs7SUFDbEMsTUFBTUMsZUFBZTtRQUNuQk4sWUFBWSxJQUFJO1FBQ2hCQyxjQUFjLElBQUk7UUFDbEJDLGlCQUFpQixJQUFJO1FBQ3JCQyxRQUFRLElBQUk7SUFDZDtJQUVBLE1BQU0sQ0FBQ1QsT0FBT2EsU0FBUyxHQUFHaEIsaURBQVVBLENBQUNFLFNBQVNhO0lBRTlDLE1BQU1FLG9CQUFvQixDQUFDQyxTQUFXO1FBQ3BDRixTQUFTO1lBQ1BWLE1BQU07WUFDTkQsU0FBUztnQkFDUEksWUFBWVMsT0FBT1QsVUFBVTtnQkFDN0JDLGNBQWNRLE9BQU9SLFlBQVk7Z0JBQ2pDQyxpQkFBaUJPLE9BQU9QLGVBQWU7Z0JBQ3ZDQyxRQUFRTSxPQUFPTixNQUFNO1lBQ3ZCO1FBQ0Y7SUFDRjtJQUVBYixnREFBU0EsQ0FBQyxJQUFNLENBQUMsR0FBRztRQUFDSSxNQUFNTSxVQUFVO0tBQUM7SUFFdEMscUJBQ0UsOERBQUNSLHVFQUFzQjtRQUNyQm1CLE9BQU87WUFDTFgsWUFBWU4sTUFBTU0sVUFBVTtZQUM1QkMsY0FBY1AsTUFBTU8sWUFBWTtZQUNoQ0MsaUJBQWlCUixNQUFNUSxlQUFlO1lBQ3RDQyxRQUFRVCxNQUFNUyxNQUFNO1lBQ3BCSztRQUNGO2tCQUVDSDs7Ozs7O0FBR1AsQ0FBQztHQXJDdUJEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2hvb2tzL3VzZUNlbnRyby5qcz82NTUzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZHVjZXIgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENlbnRyb0NvbnRleHQgZnJvbSBcIi4uL2NvbnRleHQvQ2VudHJvQ29udGV4dFwiO1xyXG5cclxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgY29uc3QgeyBwYXlsb2FkLCB0eXBlIH0gPSBhY3Rpb247XHJcblxyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBcInNlbGVjY2lvbmFyQ2VudHJvXCI6XHJcbiAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGluZm9DZW50cm86IHBheWxvYWQuaW5mb0NlbnRybyxcclxuICAgICAgICBlc3RhZGlzdGljYXM6IHBheWxvYWQuZXN0YWRpc3RpY2FzLFxyXG4gICAgICAgIG1vbml0b3JpemFjaW9uczogcGF5bG9hZC5tb25pdG9yaXphY2lvbnMsXHJcbiAgICAgICAgYXZpc29zOiBwYXlsb2FkLmF2aXNvcyxcclxuICAgICAgfTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENlbnRyb1N0YXRlKHsgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIGluZm9DZW50cm86IG51bGwsXHJcbiAgICBlc3RhZGlzdGljYXM6IG51bGwsXHJcbiAgICBtb25pdG9yaXphY2lvbnM6IG51bGwsXHJcbiAgICBhdmlzb3M6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjY2lvbmFyQ2VudHJvID0gKGNlbnRybykgPT4ge1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInNlbGVjY2lvbmFyQ2VudHJvXCIsXHJcbiAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICBpbmZvQ2VudHJvOiBjZW50cm8uaW5mb0NlbnRybyxcclxuICAgICAgICBlc3RhZGlzdGljYXM6IGNlbnRyby5lc3RhZGlzdGljYXMsXHJcbiAgICAgICAgbW9uaXRvcml6YWNpb25zOiBjZW50cm8ubW9uaXRvcml6YWNpb25zLFxyXG4gICAgICAgIGF2aXNvczogY2VudHJvLmF2aXNvcyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7fSwgW3N0YXRlLmluZm9DZW50cm9dKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxDZW50cm9Db250ZXh0LlByb3ZpZGVyXHJcbiAgICAgIHZhbHVlPXt7XHJcbiAgICAgICAgaW5mb0NlbnRybzogc3RhdGUuaW5mb0NlbnRybyxcclxuICAgICAgICBlc3RhZGlzdGljYXM6IHN0YXRlLmVzdGFkaXN0aWNhcyxcclxuICAgICAgICBtb25pdG9yaXphY2lvbnM6IHN0YXRlLm1vbml0b3JpemFjaW9ucyxcclxuICAgICAgICBhdmlzb3M6IHN0YXRlLmF2aXNvcyxcclxuICAgICAgICBzZWxlY2Npb25hckNlbnRybyxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9DZW50cm9Db250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlUmVkdWNlciIsIkNlbnRyb0NvbnRleHQiLCJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwidHlwZSIsImNvbnNvbGUiLCJsb2ciLCJpbmZvQ2VudHJvIiwiZXN0YWRpc3RpY2FzIiwibW9uaXRvcml6YWNpb25zIiwiYXZpc29zIiwiQ2VudHJvU3RhdGUiLCJjaGlsZHJlbiIsImluaXRpYWxTdGF0ZSIsImRpc3BhdGNoIiwic2VsZWNjaW9uYXJDZW50cm8iLCJjZW50cm8iLCJQcm92aWRlciIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./hooks/useCentro.js\n"));

/***/ })

});