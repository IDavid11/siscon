"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./components/Monitorizacions/HistorialMonitorizacions.jsx":
/*!*****************************************************************!*\
  !*** ./components/Monitorizacions/HistorialMonitorizacions.jsx ***!
  \*****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/axios */ \"./services/axios.js\");\n/* harmony import */ var _services_urls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/urls */ \"./services/urls.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst HistorialMonitorizacions = (param)=>{\n    let { electronica  } = param;\n    _s();\n    const [historial, setHistorial] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const obterHistorialElectronica = async ()=>{\n        const { data  } = await _services_axios__WEBPACK_IMPORTED_MODULE_2__.instance.get(_services_urls__WEBPACK_IMPORTED_MODULE_3__.apiUrls.urlObterMonitorizacions + \"\".concat(electronica._id));\n        setHistorial(data.data);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        obterHistorialElectronica();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"mt-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"font-bold\",\n                children: \"Historial de avar\\xedas detectadas\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"historial mt-4 remove-scrollbar\",\n                children: historial && historial.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                    className: \"rounded-xl w-full relative\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {}, void 0, false, {\n                                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                        lineNumber: 26,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        className: \"w-64\",\n                                        children: \"Data\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                        lineNumber: 27,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        className: \"w-64 text-center\",\n                                        children: \"Estado\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                        lineNumber: 28,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                lineNumber: 25,\n                                columnNumber: 15\n                            }, undefined),\n                            historial && historial.map((avaria)=>{\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 px-2 w-2\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                className: \"p-px rounded-full \".concat(avaria.status == \"closed\" ? \"bg-green-400\" : \"bg-red-400\")\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                                lineNumber: 35,\n                                                columnNumber: 25\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                            lineNumber: 34,\n                                            columnNumber: 23\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5\",\n                                            children: avaria.data.split(\".\")[0]\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                            lineNumber: 43,\n                                            columnNumber: 23\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 text-center\",\n                                            children: avaria.status === \"open\" ? \"Aberta\" : \"Pechada\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                            lineNumber: 44,\n                                            columnNumber: 23\n                                        }, undefined)\n                                    ]\n                                }, avaria._id, true, {\n                                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                                    lineNumber: 33,\n                                    columnNumber: 21\n                                }, undefined);\n                            })\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                        lineNumber: 24,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                    lineNumber: 23,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: \"Non hai avar\\xedas rexistradas\"\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                    lineNumber: 53,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Monitorizacions\\\\HistorialMonitorizacions.jsx\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, undefined);\n};\n_s(HistorialMonitorizacions, \"nQ9MupRAxPt77UWoY6ii/VuPOaI=\");\n_c = HistorialMonitorizacions;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HistorialMonitorizacions);\nvar _c;\n$RefreshReg$(_c, \"HistorialMonitorizacions\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL01vbml0b3JpemFjaW9ucy9IaXN0b3JpYWxNb25pdG9yaXphY2lvbnMuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFBbUQ7QUFDSDtBQUNGO0FBRTlDLE1BQU1LLDJCQUEyQixTQUFxQjtRQUFwQixFQUFFQyxZQUFXLEVBQUU7O0lBQy9DLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHTiwrQ0FBUUEsQ0FBQyxFQUFFO0lBQzdDLE1BQU1PLDRCQUE0QixVQUFZO1FBQzVDLE1BQU0sRUFBRUMsS0FBSSxFQUFFLEdBQUcsTUFBTVAseURBQVksQ0FDakNDLDJFQUErQixHQUFHLEdBQW1CLE9BQWhCRSxZQUFZTyxHQUFHO1FBRXRETCxhQUFhRSxLQUFLQSxJQUFJO0lBQ3hCO0lBRUFULGdEQUFTQSxDQUFDLElBQU07UUFDZFE7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0s7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUFZOzs7Ozs7MEJBQzNCLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDWlIsYUFBYUEsVUFBVVMsTUFBTSxHQUFHLGtCQUMvQiw4REFBQ0M7b0JBQU1GLFdBQVU7OEJBQ2YsNEVBQUNHOzswQ0FDQyw4REFBQ0M7O2tEQUNDLDhEQUFDQzs7Ozs7a0RBQ0QsOERBQUNBO3dDQUFHTCxXQUFVO2tEQUFPOzs7Ozs7a0RBQ3JCLDhEQUFDSzt3Q0FBR0wsV0FBVTtrREFBbUI7Ozs7Ozs7Ozs7Ozs0QkFFbENSLGFBQ0NBLFVBQVVjLEdBQUcsQ0FBQyxDQUFDQyxTQUFXO2dDQUN4QixxQkFDRSw4REFBQ0g7O3NEQUNDLDhEQUFDSTs0Q0FBR1IsV0FBVTtzREFDWiw0RUFBQ1M7Z0RBQ0NULFdBQVcscUJBSVYsT0FIQ08sT0FBT0csTUFBTSxJQUFJLFdBQ2IsaUJBQ0EsWUFBWTs7Ozs7Ozs7Ozs7c0RBSXRCLDhEQUFDRjs0Q0FBR1IsV0FBVTtzREFBVU8sT0FBT1osSUFBSSxDQUFDZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFOzs7Ozs7c0RBQ2pELDhEQUFDSDs0Q0FBR1IsV0FBVTtzREFDWE8sT0FBT0csTUFBTSxLQUFLLFNBQVMsV0FBVyxTQUFTOzs7Ozs7O21DQVozQ0gsT0FBT1QsR0FBRzs7Ozs7NEJBZ0J2Qjs7Ozs7Ozs7Ozs7OENBSU4sOERBQUNDOzhCQUFJOzs7Ozs2QkFDTjs7Ozs7Ozs7Ozs7O0FBSVQ7R0FyRE1UO0tBQUFBO0FBdUROLCtEQUFlQSx3QkFBd0JBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Nb25pdG9yaXphY2lvbnMvSGlzdG9yaWFsTW9uaXRvcml6YWNpb25zLmpzeD85ZDI5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F4aW9zXCI7XHJcbmltcG9ydCB7IGFwaVVybHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXJsc1wiO1xyXG5cclxuY29uc3QgSGlzdG9yaWFsTW9uaXRvcml6YWNpb25zID0gKHsgZWxlY3Ryb25pY2EgfSkgPT4ge1xyXG4gIGNvbnN0IFtoaXN0b3JpYWwsIHNldEhpc3RvcmlhbF0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3Qgb2J0ZXJIaXN0b3JpYWxFbGVjdHJvbmljYSA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgaW5zdGFuY2UuZ2V0KFxyXG4gICAgICBhcGlVcmxzLnVybE9idGVyTW9uaXRvcml6YWNpb25zICsgYCR7ZWxlY3Ryb25pY2EuX2lkfWBcclxuICAgICk7XHJcbiAgICBzZXRIaXN0b3JpYWwoZGF0YS5kYXRhKTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb2J0ZXJIaXN0b3JpYWxFbGVjdHJvbmljYSgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPkhpc3RvcmlhbCBkZSBhdmFyw61hcyBkZXRlY3RhZGFzPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yaWFsIG10LTQgcmVtb3ZlLXNjcm9sbGJhclwiPlxyXG4gICAgICAgIHtoaXN0b3JpYWwgJiYgaGlzdG9yaWFsLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwicm91bmRlZC14bCB3LWZ1bGwgcmVsYXRpdmVcIj5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNjRcIj5EYXRhPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTY0IHRleHQtY2VudGVyXCI+RXN0YWRvPC90aD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgIHtoaXN0b3JpYWwgJiZcclxuICAgICAgICAgICAgICAgIGhpc3RvcmlhbC5tYXAoKGF2YXJpYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2F2YXJpYS5faWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBweC0yIHctMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtcHggcm91bmRlZC1mdWxsICR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFyaWEuc3RhdHVzID09IFwiY2xvc2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJnLWdyZWVuLTQwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1yZWQtNDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41XCI+e2F2YXJpYS5kYXRhLnNwbGl0KFwiLlwiKVswXX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YXZhcmlhLnN0YXR1cyA9PT0gXCJvcGVuXCIgPyBcIkFiZXJ0YVwiIDogXCJQZWNoYWRhXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXY+Tm9uIGhhaSBhdmFyw61hcyByZXhpc3RyYWRhczwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcmlhbE1vbml0b3JpemFjaW9ucztcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJpbnN0YW5jZSIsImFwaVVybHMiLCJIaXN0b3JpYWxNb25pdG9yaXphY2lvbnMiLCJlbGVjdHJvbmljYSIsImhpc3RvcmlhbCIsInNldEhpc3RvcmlhbCIsIm9idGVySGlzdG9yaWFsRWxlY3Ryb25pY2EiLCJkYXRhIiwiZ2V0IiwidXJsT2J0ZXJNb25pdG9yaXphY2lvbnMiLCJfaWQiLCJkaXYiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJ0YWJsZSIsInRib2R5IiwidHIiLCJ0aCIsIm1hcCIsImF2YXJpYSIsInRkIiwic3BhbiIsInN0YXR1cyIsInNwbGl0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Monitorizacions/HistorialMonitorizacions.jsx\n"));

/***/ })

});