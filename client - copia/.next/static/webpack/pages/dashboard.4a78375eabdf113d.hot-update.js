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

/***/ "./components/InfoCentro/AvariasDetectadas.jsx":
/*!*****************************************************!*\
  !*** ./components/InfoCentro/AvariasDetectadas.jsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_ContainerWrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ContainerWrap */ \"./components/utils/ContainerWrap.jsx\");\n/* harmony import */ var _context_TabsInfoContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/TabsInfoContext */ \"./context/TabsInfoContext.js\");\n/* harmony import */ var _utils_Items_Status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Items/Status */ \"./components/utils/Items/Status.jsx\");\n/* harmony import */ var _Modales_ModalMonitorizacion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Modales/ModalMonitorizacion */ \"./components/Modales/ModalMonitorizacion.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst AvariasDetectadas = (param)=>{\n    let { avarias  } = param;\n    _s();\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [modalMonitorizacion, setModalMonitorizacion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const handleShowModal = (avaria)=>{\n        setShowModal(!showModal);\n        setModalMonitorizacion(avaria);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_ContainerWrap__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                title: \"Avar\\xedas detectadas\",\n                img: \"/assets/icons/danger.png\",\n                span: avarias.length,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                    className: \"rounded-xl mt-4 w-full\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        children: [\n                            avarias && avarias.map((avaria)=>{\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                    className: \"font-medium hover:bg-gray-200 cursor-pointer\",\n                                    onClick: ()=>handleShowModal(avaria),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 px-2\",\n                                            children: avaria.ip\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                            lineNumber: 33,\n                                            columnNumber: 21\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 px-2\",\n                                            children: avaria.tipo\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                            lineNumber: 34,\n                                            columnNumber: 21\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 px-2\",\n                                            children: avaria.modelo || \"Sen identificar\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                            lineNumber: 35,\n                                            columnNumber: 21\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"py-2.5 px-2\",\n                                            children: avaria.ubicacion || \"Sen ubicar\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                            lineNumber: 38,\n                                            columnNumber: 21\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_Items_Status__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                            status: avaria.status\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                            lineNumber: 41,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    ]\n                                }, avaria._id, true, {\n                                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                    lineNumber: 28,\n                                    columnNumber: 19\n                                }, undefined);\n                            }),\n                            avarias && avarias.length < 1 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-center\",\n                                children: \"Non se detectaron avar\\xedas\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                                lineNumber: 46,\n                                columnNumber: 15\n                            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                        lineNumber: 24,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined),\n            showModal ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modales_ModalMonitorizacion__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                handleCloseModal: handleShowModal,\n                avaria: modalMonitorizacion\n            }, void 0, false, {\n                fileName: \"D:\\\\Programaci\\xf3n\\\\Automation\\\\siscon\\\\client - copia\\\\components\\\\InfoCentro\\\\AvariasDetectadas.jsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n        ]\n    }, void 0, true);\n};\n_s(AvariasDetectadas, \"xzXVE5FKCmeBif3zfuMgjlsanS0=\");\n_c = AvariasDetectadas;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AvariasDetectadas);\nvar _c;\n$RefreshReg$(_c, \"AvariasDetectadas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0luZm9DZW50cm8vQXZhcmlhc0RldGVjdGFkYXMuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUErRDtBQUNaO0FBQ1M7QUFDakI7QUFDc0I7QUFFakUsTUFBTVEsb0JBQW9CLFNBQWlCO1FBQWhCLEVBQUVDLFFBQU8sRUFBRTs7SUFDcEMsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdSLCtDQUFRQSxDQUFDLEtBQUs7SUFDaEQsTUFBTSxDQUFDUyxxQkFBcUJDLHVCQUF1QixHQUFHViwrQ0FBUUE7SUFFOUQsTUFBTVcsa0JBQWtCLENBQUNDLFNBQVc7UUFDbENKLGFBQWEsQ0FBQ0Q7UUFDZEcsdUJBQXVCRTtJQUN6QjtJQUVBLHFCQUNFOzswQkFDRSw4REFBQ1gsNERBQWFBO2dCQUNaWSxPQUFPO2dCQUNQQyxLQUFLO2dCQUNMQyxNQUFNVCxRQUFRVSxNQUFNOzBCQUVwQiw0RUFBQ0M7b0JBQU1DLFdBQVU7OEJBQ2YsNEVBQUNDOzs0QkFDRWIsV0FDQ0EsUUFBUWMsR0FBRyxDQUFDLENBQUNSLFNBQVc7Z0NBQ3RCLHFCQUNFLDhEQUFDUztvQ0FFQ0gsV0FBVTtvQ0FDVkksU0FBUyxJQUFNWCxnQkFBZ0JDOztzREFFL0IsOERBQUNXOzRDQUFHTCxXQUFVO3NEQUFlTixPQUFPWSxFQUFFOzs7Ozs7c0RBQ3RDLDhEQUFDRDs0Q0FBR0wsV0FBVTtzREFBZU4sT0FBT2EsSUFBSTs7Ozs7O3NEQUN4Qyw4REFBQ0Y7NENBQUdMLFdBQVU7c0RBQ1hOLE9BQU9jLE1BQU0sSUFBSTs7Ozs7O3NEQUVwQiw4REFBQ0g7NENBQUdMLFdBQVU7c0RBQ1hOLE9BQU9lLFNBQVMsSUFBSTs7Ozs7O3NEQUV2Qiw4REFBQ3hCLDJEQUFNQTs0Q0FBQ3lCLFFBQVFoQixPQUFPZ0IsTUFBTTs7Ozs7OzttQ0FaeEJoQixPQUFPaUIsR0FBRzs7Ozs7NEJBZXJCOzRCQUNEdkIsV0FBV0EsUUFBUVUsTUFBTSxHQUFHLGtCQUMzQiw4REFBQ2M7Z0NBQUlaLFdBQVU7MENBQWM7Ozs7OzBEQUU3Qiw2SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJTlgsMEJBQ0MsOERBQUNILG9FQUFtQkE7Z0JBQ2xCMkIsa0JBQWtCcEI7Z0JBQ2xCQyxRQUFRSDs7Ozs7MENBR1YsNklBQ0Q7OztBQUdQO0dBeERNSjtLQUFBQTtBQTBETiwrREFBZUEsaUJBQWlCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvSW5mb0NlbnRyby9BdmFyaWFzRGV0ZWN0YWRhcy5qc3g/NjFmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29udGFpbmVyV3JhcCBmcm9tIFwiLi4vdXRpbHMvQ29udGFpbmVyV3JhcFwiO1xyXG5pbXBvcnQgVGFic0luZm9Db250ZXh0IGZyb20gXCIuLi8uLi9jb250ZXh0L1RhYnNJbmZvQ29udGV4dFwiO1xyXG5pbXBvcnQgU3RhdHVzIGZyb20gXCIuLi91dGlscy9JdGVtcy9TdGF0dXNcIjtcclxuaW1wb3J0IE1vZGFsTW9uaXRvcml6YWNpb24gZnJvbSBcIi4uL01vZGFsZXMvTW9kYWxNb25pdG9yaXphY2lvblwiO1xyXG5cclxuY29uc3QgQXZhcmlhc0RldGVjdGFkYXMgPSAoeyBhdmFyaWFzIH0pID0+IHtcclxuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbE1vbml0b3JpemFjaW9uLCBzZXRNb2RhbE1vbml0b3JpemFjaW9uXSA9IHVzZVN0YXRlKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNob3dNb2RhbCA9IChhdmFyaWEpID0+IHtcclxuICAgIHNldFNob3dNb2RhbCghc2hvd01vZGFsKTtcclxuICAgIHNldE1vZGFsTW9uaXRvcml6YWNpb24oYXZhcmlhKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPENvbnRhaW5lcldyYXBcclxuICAgICAgICB0aXRsZT17XCJBdmFyw61hcyBkZXRlY3RhZGFzXCJ9XHJcbiAgICAgICAgaW1nPXtcIi9hc3NldHMvaWNvbnMvZGFuZ2VyLnBuZ1wifVxyXG4gICAgICAgIHNwYW49e2F2YXJpYXMubGVuZ3RofVxyXG4gICAgICA+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgbXQtNCB3LWZ1bGxcIj5cclxuICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAge2F2YXJpYXMgJiZcclxuICAgICAgICAgICAgICBhdmFyaWFzLm1hcCgoYXZhcmlhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8dHJcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e2F2YXJpYS5faWR9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gaG92ZXI6YmctZ3JheS0yMDAgY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNob3dNb2RhbChhdmFyaWEpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBweC0yXCI+e2F2YXJpYS5pcH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMlwiPnthdmFyaWEudGlwb308L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2F2YXJpYS5tb2RlbG8gfHwgXCJTZW4gaWRlbnRpZmljYXJcIn1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2F2YXJpYS51YmljYWNpb24gfHwgXCJTZW4gdWJpY2FyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8U3RhdHVzIHN0YXR1cz17YXZhcmlhLnN0YXR1c30gLz5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIHthdmFyaWFzICYmIGF2YXJpYXMubGVuZ3RoIDwgMSA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Tm9uIHNlIGRldGVjdGFyb24gYXZhcsOtYXM8L2Rpdj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8PjwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L0NvbnRhaW5lcldyYXA+XHJcbiAgICAgIHtzaG93TW9kYWwgPyAoXHJcbiAgICAgICAgPE1vZGFsTW9uaXRvcml6YWNpb25cclxuICAgICAgICAgIGhhbmRsZUNsb3NlTW9kYWw9e2hhbmRsZVNob3dNb2RhbH1cclxuICAgICAgICAgIGF2YXJpYT17bW9kYWxNb25pdG9yaXphY2lvbn1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDw+PC8+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXZhcmlhc0RldGVjdGFkYXM7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNvbnRhaW5lcldyYXAiLCJUYWJzSW5mb0NvbnRleHQiLCJTdGF0dXMiLCJNb2RhbE1vbml0b3JpemFjaW9uIiwiQXZhcmlhc0RldGVjdGFkYXMiLCJhdmFyaWFzIiwic2hvd01vZGFsIiwic2V0U2hvd01vZGFsIiwibW9kYWxNb25pdG9yaXphY2lvbiIsInNldE1vZGFsTW9uaXRvcml6YWNpb24iLCJoYW5kbGVTaG93TW9kYWwiLCJhdmFyaWEiLCJ0aXRsZSIsImltZyIsInNwYW4iLCJsZW5ndGgiLCJ0YWJsZSIsImNsYXNzTmFtZSIsInRib2R5IiwibWFwIiwidHIiLCJvbkNsaWNrIiwidGQiLCJpcCIsInRpcG8iLCJtb2RlbG8iLCJ1YmljYWNpb24iLCJzdGF0dXMiLCJfaWQiLCJkaXYiLCJoYW5kbGVDbG9zZU1vZGFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/InfoCentro/AvariasDetectadas.jsx\n"));

/***/ })

});