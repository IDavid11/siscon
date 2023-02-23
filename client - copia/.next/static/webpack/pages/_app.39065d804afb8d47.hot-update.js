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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CentroState; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_CentroContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/CentroContext */ \"./context/CentroContext.js\");\n\nvar _s = $RefreshSig$();\n\n\nfunction reducer(state, action) {\n    const { payload , type  } = action;\n    switch(type){\n        case \"seleccionarCentro\":\n            console.log(payload);\n            return {\n                infoCentro: payload.infoCentro,\n                estadisticas: payload.estadisticas,\n                monitorizacions: payload.monitorizacions,\n                avisos: payload.avisos\n            };\n        default:\n            return state;\n    }\n}\nfunction CentroState(param) {\n    let { children  } = param;\n    _s();\n    const initialState = {\n        infoCentro: null,\n        estadisticas: null,\n        monitorizacions: null,\n        avisos: null\n    };\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState);\n    const seleccionarCentro = (centro)=>{\n        dispatch({\n            type: \"seleccionarCentro\",\n            payload: {\n                infoCentro: centro.centro,\n                estadisticas: centro.estadisticas,\n                monitorizacions: centro.monitorizacions,\n                avisos: centro.avisos\n            }\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(state);\n    }, [\n        state.infoCentro\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CentroContext__WEBPACK_IMPORTED_MODULE_2__[\"default\"].Provider, {\n        value: {\n            infoCentro: state.infoCentro,\n            estadisticas: state.estadisticas,\n            monitorizacions: state.monitorizacions,\n            avisos: state.avisos,\n            seleccionarCentro\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\hooks\\\\useCentro.js\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\n_s(CentroState, \"bgCdjuTOmPdSBRwTap80EFd9Y3U=\");\n_c = CentroState;\nvar _c;\n$RefreshReg$(_c, \"CentroState\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy91c2VDZW50cm8uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQXFEO0FBQ0E7QUFFckQsU0FBU0ksUUFBUUMsS0FBSyxFQUFFQyxNQUFNLEVBQUU7SUFDOUIsTUFBTSxFQUFFQyxRQUFPLEVBQUVDLEtBQUksRUFBRSxHQUFHRjtJQUUxQixPQUFRRTtRQUNOLEtBQUs7WUFDSEMsUUFBUUMsR0FBRyxDQUFDSDtZQUNaLE9BQU87Z0JBQ0xJLFlBQVlKLFFBQVFJLFVBQVU7Z0JBQzlCQyxjQUFjTCxRQUFRSyxZQUFZO2dCQUNsQ0MsaUJBQWlCTixRQUFRTSxlQUFlO2dCQUN4Q0MsUUFBUVAsUUFBUU8sTUFBTTtZQUN4QjtRQUNGO1lBQ0UsT0FBT1Q7SUFDWDtBQUNGO0FBRWUsU0FBU1UsWUFBWSxLQUFZLEVBQUU7UUFBZCxFQUFFQyxTQUFRLEVBQUUsR0FBWjs7SUFDbEMsTUFBTUMsZUFBZTtRQUNuQk4sWUFBWSxJQUFJO1FBQ2hCQyxjQUFjLElBQUk7UUFDbEJDLGlCQUFpQixJQUFJO1FBQ3JCQyxRQUFRLElBQUk7SUFDZDtJQUVBLE1BQU0sQ0FBQ1QsT0FBT2EsU0FBUyxHQUFHaEIsaURBQVVBLENBQUNFLFNBQVNhO0lBRTlDLE1BQU1FLG9CQUFvQixDQUFDQyxTQUFXO1FBQ3BDRixTQUFTO1lBQ1BWLE1BQU07WUFDTkQsU0FBUztnQkFDUEksWUFBWVMsT0FBT0EsTUFBTTtnQkFDekJSLGNBQWNRLE9BQU9SLFlBQVk7Z0JBQ2pDQyxpQkFBaUJPLE9BQU9QLGVBQWU7Z0JBQ3ZDQyxRQUFRTSxPQUFPTixNQUFNO1lBQ3ZCO1FBQ0Y7SUFDRjtJQUVBYixnREFBU0EsQ0FBQyxJQUFNO1FBQ2RRLFFBQVFDLEdBQUcsQ0FBQ0w7SUFDZCxHQUFHO1FBQUNBLE1BQU1NLFVBQVU7S0FBQztJQUVyQixxQkFDRSw4REFBQ1IsdUVBQXNCO1FBQ3JCbUIsT0FBTztZQUNMWCxZQUFZTixNQUFNTSxVQUFVO1lBQzVCQyxjQUFjUCxNQUFNTyxZQUFZO1lBQ2hDQyxpQkFBaUJSLE1BQU1RLGVBQWU7WUFDdENDLFFBQVFULE1BQU1TLE1BQU07WUFDcEJLO1FBQ0Y7a0JBRUNIOzs7Ozs7QUFHUCxDQUFDO0dBdkN1QkQ7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlQ2VudHJvLmpzPzY1NTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ2VudHJvQ29udGV4dCBmcm9tIFwiLi4vY29udGV4dC9DZW50cm9Db250ZXh0XCI7XHJcblxyXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcclxuICBjb25zdCB7IHBheWxvYWQsIHR5cGUgfSA9IGFjdGlvbjtcclxuXHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFwic2VsZWNjaW9uYXJDZW50cm9cIjpcclxuICAgICAgY29uc29sZS5sb2cocGF5bG9hZCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5mb0NlbnRybzogcGF5bG9hZC5pbmZvQ2VudHJvLFxyXG4gICAgICAgIGVzdGFkaXN0aWNhczogcGF5bG9hZC5lc3RhZGlzdGljYXMsXHJcbiAgICAgICAgbW9uaXRvcml6YWNpb25zOiBwYXlsb2FkLm1vbml0b3JpemFjaW9ucyxcclxuICAgICAgICBhdmlzb3M6IHBheWxvYWQuYXZpc29zLFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2VudHJvU3RhdGUoeyBjaGlsZHJlbiB9KSB7XHJcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgaW5mb0NlbnRybzogbnVsbCxcclxuICAgIGVzdGFkaXN0aWNhczogbnVsbCxcclxuICAgIG1vbml0b3JpemFjaW9uczogbnVsbCxcclxuICAgIGF2aXNvczogbnVsbCxcclxuICB9O1xyXG5cclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgY29uc3Qgc2VsZWNjaW9uYXJDZW50cm8gPSAoY2VudHJvKSA9PiB7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwic2VsZWNjaW9uYXJDZW50cm9cIixcclxuICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgIGluZm9DZW50cm86IGNlbnRyby5jZW50cm8sXHJcbiAgICAgICAgZXN0YWRpc3RpY2FzOiBjZW50cm8uZXN0YWRpc3RpY2FzLFxyXG4gICAgICAgIG1vbml0b3JpemFjaW9uczogY2VudHJvLm1vbml0b3JpemFjaW9ucyxcclxuICAgICAgICBhdmlzb3M6IGNlbnRyby5hdmlzb3MsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coc3RhdGUpO1xyXG4gIH0sIFtzdGF0ZS5pbmZvQ2VudHJvXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q2VudHJvQ29udGV4dC5Qcm92aWRlclxyXG4gICAgICB2YWx1ZT17e1xyXG4gICAgICAgIGluZm9DZW50cm86IHN0YXRlLmluZm9DZW50cm8sXHJcbiAgICAgICAgZXN0YWRpc3RpY2FzOiBzdGF0ZS5lc3RhZGlzdGljYXMsXHJcbiAgICAgICAgbW9uaXRvcml6YWNpb25zOiBzdGF0ZS5tb25pdG9yaXphY2lvbnMsXHJcbiAgICAgICAgYXZpc29zOiBzdGF0ZS5hdmlzb3MsXHJcbiAgICAgICAgc2VsZWNjaW9uYXJDZW50cm8sXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvQ2VudHJvQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVJlZHVjZXIiLCJDZW50cm9Db250ZXh0IiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsInR5cGUiLCJjb25zb2xlIiwibG9nIiwiaW5mb0NlbnRybyIsImVzdGFkaXN0aWNhcyIsIm1vbml0b3JpemFjaW9ucyIsImF2aXNvcyIsIkNlbnRyb1N0YXRlIiwiY2hpbGRyZW4iLCJpbml0aWFsU3RhdGUiLCJkaXNwYXRjaCIsInNlbGVjY2lvbmFyQ2VudHJvIiwiY2VudHJvIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./hooks/useCentro.js\n"));

/***/ })

});