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

/***/ "./components/Dashboard/ElectronicaDown.jsx":
/*!**************************************************!*\
  !*** ./components/Dashboard/ElectronicaDown.jsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_ContainerWrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ContainerWrap */ \"./components/utils/ContainerWrap.jsx\");\n/* harmony import */ var _utils_Nav_Nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Nav/Nav */ \"./components/utils/Nav/Nav.jsx\");\n/* harmony import */ var _utils_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Nav/NavItem */ \"./components/utils/Nav/NavItem.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst ElectronicaDown = (param)=>{\n    let { monitorizacions  } = param;\n    _s();\n    const nav = [\n        {\n            k: \"Todos\",\n            v: \"Todos\"\n        },\n        {\n            k: \"Router\",\n            v: \"Routers\"\n        },\n        {\n            k: \"SW_Abalar\",\n            v: \"SW_Abalar\"\n        },\n        {\n            k: \"SW_Siega\",\n            v: \"SW_Siega\"\n        }\n    ];\n    const imgs = {\n        Router: \"/assets/images/router.png\",\n        SW_Abalar: \"/assets/images/switch.png\",\n        SW_Siega: \"/assets/images/switch.png\",\n        Switch: \"/assets/images/switch.png\",\n        AP_edu_xunta_gal: \"/assets/images/ap.png\"\n    };\n    const [vista, setVista] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Todos\");\n    const handleActiveVista = (e)=>{\n        e.preventDefault();\n        setVista(e.target.id);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{}, [\n        vista\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_ContainerWrap__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        title: \"Electr\\xf3nica DOWN\",\n        maxHeight: 250,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h-10 pt-4 fixed bg-white max-w-[462px]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_Nav_Nav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    children: nav.map((li)=>{\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            a: li.k,\n                            focusTag: vista,\n                            span: li.v,\n                            isLoading: false,\n                            handleActivePage: handleActiveVista\n                        }, li.k, false, {\n                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                            lineNumber: 37,\n                            columnNumber: 15\n                        }, undefined);\n                    })\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                    lineNumber: 34,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                className: \"rounded-xl w-full relative\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                    children: monitorizacions && monitorizacions.map((item)=>{\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                            children: item.monitorizacions.map((monitorizacion)=>{\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                    children: monitorizacion.electronica.tipo == vista || vista == \"Todos\" ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                        className: \"h-10 mt-8\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                className: \"py-2.5 px-2 w-2\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                    className: \"p-px bg-red-400 rounded-full\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                    lineNumber: 62,\n                                                    columnNumber: 31\n                                                }, undefined)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                lineNumber: 61,\n                                                columnNumber: 29\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                className: \"py-2.5 px-2 w-2/3 text-ellipsis whitespace-nowrap overflow-hidden\",\n                                                children: item.centro.centro\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                lineNumber: 64,\n                                                columnNumber: 29\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                className: \"py-2.5 px-2 w-1/3 text-ellipsis whitespace-nowrap overflow-hidden\",\n                                                children: monitorizacion.electronica.tipo\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                lineNumber: 67,\n                                                columnNumber: 29\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                className: \"y-2.5 px-2 w-10\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                                    className: \"w-10\",\n                                                    src: imgs[monitorizacion.electronica.tipo],\n                                                    alt: \"\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                    lineNumber: 71,\n                                                    columnNumber: 31\n                                                }, undefined)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                                lineNumber: 70,\n                                                columnNumber: 29\n                                            }, undefined)\n                                        ]\n                                    }, monitorizacion._id, true, {\n                                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                                        lineNumber: 60,\n                                        columnNumber: 27\n                                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n                                }, void 0, false);\n                            })\n                        }, void 0, false);\n                    })\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\Dashboard\\\\ElectronicaDown.jsx\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ElectronicaDown, \"+ZAX83thu3OrPjqPHKPuKRJYX/E=\");\n_c = ElectronicaDown;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ElectronicaDown);\nvar _c;\n$RefreshReg$(_c, \"ElectronicaDown\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0Rhc2hib2FyZC9FbGVjdHJvbmljYURvd24uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQW1EO0FBQ0E7QUFDaEI7QUFDUTtBQUUzQyxNQUFNTSxrQkFBa0IsU0FBeUI7UUFBeEIsRUFBRUMsZ0JBQWUsRUFBRTs7SUFDMUMsTUFBTUMsTUFBTTtRQUNWO1lBQUVDLEdBQUc7WUFBU0MsR0FBRztRQUFRO1FBQ3pCO1lBQUVELEdBQUc7WUFBVUMsR0FBRztRQUFVO1FBQzVCO1lBQUVELEdBQUc7WUFBYUMsR0FBRztRQUFZO1FBQ2pDO1lBQUVELEdBQUc7WUFBWUMsR0FBRztRQUFXO0tBQ2hDO0lBRUQsTUFBTUMsT0FBTztRQUNYQyxRQUFRO1FBQ1JDLFdBQVc7UUFDWEMsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLGtCQUFrQjtJQUNwQjtJQUVBLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHaEIsK0NBQVFBLENBQUM7SUFFbkMsTUFBTWlCLG9CQUFvQixDQUFDQyxJQUFNO1FBQy9CQSxFQUFFQyxjQUFjO1FBQ2hCSCxTQUFTRSxFQUFFRSxNQUFNLENBQUNDLEVBQUU7SUFDdEI7SUFFQXRCLGdEQUFTQSxDQUFDLElBQU0sQ0FBQyxHQUFHO1FBQUNnQjtLQUFNO0lBRTNCLHFCQUNFLDhEQUFDZCw0REFBYUE7UUFBQ3FCLE9BQU87UUFBb0JDLFdBQVc7OzBCQUNuRCw4REFBQ0M7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUN2QixzREFBR0E7OEJBQ0RJLElBQUlvQixHQUFHLENBQUMsQ0FBQ0MsS0FBTzt3QkFDZixxQkFDRSw4REFBQ3hCLDBEQUFPQTs0QkFFTnlCLEdBQUdELEdBQUdwQixDQUFDOzRCQUNQc0IsVUFBVWQ7NEJBQ1ZlLE1BQU1ILEdBQUduQixDQUFDOzRCQUNWdUIsV0FBVyxLQUFLOzRCQUNoQkMsa0JBQWtCZjsyQkFMYlUsR0FBR3BCLENBQUM7Ozs7O29CQVFmOzs7Ozs7Ozs7OzswQkFHSiw4REFBQzBCO2dCQUFNUixXQUFVOzBCQUNmLDRFQUFDUzs4QkFDRTdCLG1CQUNDQSxnQkFBZ0JxQixHQUFHLENBQUMsQ0FBQ1MsT0FBUzt3QkFDNUIscUJBQ0U7c0NBQ0dBLEtBQUs5QixlQUFlLENBQUNxQixHQUFHLENBQUMsQ0FBQ1UsaUJBQW1CO2dDQUM1QyxxQkFDRTs4Q0FDR0EsZUFBZUMsV0FBVyxDQUFDQyxJQUFJLElBQUl2QixTQUNwQ0EsU0FBUyx3QkFDUCw4REFBQ3dCO3dDQUE0QmQsV0FBVTs7MERBQ3JDLDhEQUFDZTtnREFBR2YsV0FBVTswREFDWiw0RUFBQ0s7b0RBQUtMLFdBQVU7Ozs7Ozs7Ozs7OzBEQUVsQiw4REFBQ2U7Z0RBQUdmLFdBQVU7MERBQ1hVLEtBQUtNLE1BQU0sQ0FBQ0EsTUFBTTs7Ozs7OzBEQUVyQiw4REFBQ0Q7Z0RBQUdmLFdBQVU7MERBQ1hXLGVBQWVDLFdBQVcsQ0FBQ0MsSUFBSTs7Ozs7OzBEQUVsQyw4REFBQ0U7Z0RBQUdmLFdBQVU7MERBQ1osNEVBQUNpQjtvREFDQ2pCLFdBQVU7b0RBQ1ZrQixLQUFLbEMsSUFBSSxDQUFDMkIsZUFBZUMsV0FBVyxDQUFDQyxJQUFJLENBQUM7b0RBQzFDTSxLQUFJOzs7Ozs7Ozs7Ozs7dUNBZERSLGVBQWVTLEdBQUc7Ozs7a0VBbUIzQiw2SUFDRDs7NEJBR1A7O29CQUdOOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtaO0dBckZNekM7S0FBQUE7QUF1Rk4sK0RBQWVBLGVBQWVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9EYXNoYm9hcmQvRWxlY3Ryb25pY2FEb3duLmpzeD8xOGE2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb250YWluZXJXcmFwIGZyb20gXCIuLi91dGlscy9Db250YWluZXJXcmFwXCI7XHJcbmltcG9ydCBOYXYgZnJvbSBcIi4uL3V0aWxzL05hdi9OYXZcIjtcclxuaW1wb3J0IE5hdkl0ZW0gZnJvbSBcIi4uL3V0aWxzL05hdi9OYXZJdGVtXCI7XHJcblxyXG5jb25zdCBFbGVjdHJvbmljYURvd24gPSAoeyBtb25pdG9yaXphY2lvbnMgfSkgPT4ge1xyXG4gIGNvbnN0IG5hdiA9IFtcclxuICAgIHsgazogXCJUb2Rvc1wiLCB2OiBcIlRvZG9zXCIgfSxcclxuICAgIHsgazogXCJSb3V0ZXJcIiwgdjogXCJSb3V0ZXJzXCIgfSxcclxuICAgIHsgazogXCJTV19BYmFsYXJcIiwgdjogXCJTV19BYmFsYXJcIiB9LFxyXG4gICAgeyBrOiBcIlNXX1NpZWdhXCIsIHY6IFwiU1dfU2llZ2FcIiB9LFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGltZ3MgPSB7XHJcbiAgICBSb3V0ZXI6IFwiL2Fzc2V0cy9pbWFnZXMvcm91dGVyLnBuZ1wiLFxyXG4gICAgU1dfQWJhbGFyOiBcIi9hc3NldHMvaW1hZ2VzL3N3aXRjaC5wbmdcIixcclxuICAgIFNXX1NpZWdhOiBcIi9hc3NldHMvaW1hZ2VzL3N3aXRjaC5wbmdcIixcclxuICAgIFN3aXRjaDogXCIvYXNzZXRzL2ltYWdlcy9zd2l0Y2gucG5nXCIsXHJcbiAgICBBUF9lZHVfeHVudGFfZ2FsOiBcIi9hc3NldHMvaW1hZ2VzL2FwLnBuZ1wiLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFt2aXN0YSwgc2V0VmlzdGFdID0gdXNlU3RhdGUoXCJUb2Rvc1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQWN0aXZlVmlzdGEgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2V0VmlzdGEoZS50YXJnZXQuaWQpO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7fSwgW3Zpc3RhXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q29udGFpbmVyV3JhcCB0aXRsZT17XCJFbGVjdHLDs25pY2EgRE9XTlwifSBtYXhIZWlnaHQ9ezI1MH0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0xMCBwdC00IGZpeGVkIGJnLXdoaXRlIG1heC13LVs0NjJweF1cIj5cclxuICAgICAgICA8TmF2PlxyXG4gICAgICAgICAge25hdi5tYXAoKGxpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPE5hdkl0ZW1cclxuICAgICAgICAgICAgICAgIGtleT17bGkua31cclxuICAgICAgICAgICAgICAgIGE9e2xpLmt9XHJcbiAgICAgICAgICAgICAgICBmb2N1c1RhZz17dmlzdGF9XHJcbiAgICAgICAgICAgICAgICBzcGFuPXtsaS52fVxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjdGl2ZVBhZ2U9e2hhbmRsZUFjdGl2ZVZpc3RhfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L05hdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHctZnVsbCByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHttb25pdG9yaXphY2lvbnMgJiZcclxuICAgICAgICAgICAgbW9uaXRvcml6YWNpb25zLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbS5tb25pdG9yaXphY2lvbnMubWFwKChtb25pdG9yaXphY2lvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9uaXRvcml6YWNpb24uZWxlY3Ryb25pY2EudGlwbyA9PSB2aXN0YSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXN0YSA9PSBcIlRvZG9zXCIgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17bW9uaXRvcml6YWNpb24uX2lkfSBjbGFzc05hbWU9XCJoLTEwIG10LThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMiB3LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC1weCBiZy1yZWQtNDAwIHJvdW5kZWQtZnVsbFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTIgdy0yLzMgdGV4dC1lbGxpcHNpcyB3aGl0ZXNwYWNlLW5vd3JhcCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uY2VudHJvLmNlbnRyb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTIgdy0xLzMgdGV4dC1lbGxpcHNpcyB3aGl0ZXNwYWNlLW5vd3JhcCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21vbml0b3JpemFjaW9uLmVsZWN0cm9uaWNhLnRpcG99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInktMi41IHB4LTIgdy0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWdzW21vbml0b3JpemFjaW9uLmVsZWN0cm9uaWNhLnRpcG9dfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPD48Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgIDwvQ29udGFpbmVyV3JhcD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRWxlY3Ryb25pY2FEb3duO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNvbnRhaW5lcldyYXAiLCJOYXYiLCJOYXZJdGVtIiwiRWxlY3Ryb25pY2FEb3duIiwibW9uaXRvcml6YWNpb25zIiwibmF2IiwiayIsInYiLCJpbWdzIiwiUm91dGVyIiwiU1dfQWJhbGFyIiwiU1dfU2llZ2EiLCJTd2l0Y2giLCJBUF9lZHVfeHVudGFfZ2FsIiwidmlzdGEiLCJzZXRWaXN0YSIsImhhbmRsZUFjdGl2ZVZpc3RhIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiaWQiLCJ0aXRsZSIsIm1heEhlaWdodCIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsImxpIiwiYSIsImZvY3VzVGFnIiwic3BhbiIsImlzTG9hZGluZyIsImhhbmRsZUFjdGl2ZVBhZ2UiLCJ0YWJsZSIsInRib2R5IiwiaXRlbSIsIm1vbml0b3JpemFjaW9uIiwiZWxlY3Ryb25pY2EiLCJ0aXBvIiwidHIiLCJ0ZCIsImNlbnRybyIsImltZyIsInNyYyIsImFsdCIsIl9pZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Dashboard/ElectronicaDown.jsx\n"));

/***/ })

});