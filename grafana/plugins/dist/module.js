/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
define(["@grafana/data","react","rxjs","@emotion/css","@grafana/runtime","@grafana/ui"], (__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE__emotion_css__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/AppConfig/AppConfig.tsx":
/*!********************************************!*\
  !*** ./components/AppConfig/AppConfig.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppConfig: () => (/* binding */ AppConfig),\n/* harmony export */   updatePlugin: () => (/* binding */ updatePlugin)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ \"rxjs\");\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/css */ \"@emotion/css\");\n/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ \"@grafana/runtime\");\n/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ \"@grafana/ui\");\n/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _testIds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../testIds */ \"./components/testIds.ts\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _async_to_generator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _define_property(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _object_spread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _define_property(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction ownKeys(object, enumerableOnly) {\n    var keys = Object.keys(object);\n    if (Object.getOwnPropertySymbols) {\n        var symbols = Object.getOwnPropertySymbols(object);\n        if (enumerableOnly) {\n            symbols = symbols.filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n            });\n        }\n        keys.push.apply(keys, symbols);\n    }\n    return keys;\n}\nfunction _object_spread_props(target, source) {\n    source = source != null ? source : {};\n    if (Object.getOwnPropertyDescriptors) {\n        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n    } else {\n        ownKeys(Object(source)).forEach(function(key) {\n            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n        });\n    }\n    return target;\n}\n\n\n\n\n\n\nconst AppConfig = ({ plugin })=>{\n    const s = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.useStyles2)(getStyles);\n    const { enabled, pinned, jsonData } = plugin.meta;\n    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        jsCode: (jsonData === null || jsonData === void 0 ? void 0 : jsonData.jsCode) || '',\n        apiKey: (jsonData === null || jsonData === void 0 ? void 0 : jsonData.apiKey) || ''\n    });\n    const onChange = (event)=>{\n        setState(_object_spread_props(_object_spread({}, state), {\n            [event.target.name]: event.target.value.trim()\n        }));\n    };\n    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n        \"data-testid\": _testIds__WEBPACK_IMPORTED_MODULE_5__.testIds.appConfig.container\n    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.FieldSet, {\n        label: \"API Settings\"\n    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.Field, {\n        label: \"API Key\",\n        description: \"A secret key for authenticating to our custom API\"\n    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.Input, {\n        width: 60,\n        \"data-testid\": _testIds__WEBPACK_IMPORTED_MODULE_5__.testIds.appConfig.apiKey,\n        name: \"apiKey\",\n        value: state.apiKey,\n        placeholder: 'Your secret API key',\n        onChange: onChange\n    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.Field, {\n        label: \"API Code\",\n        description: \"\",\n        className: s.marginTop\n    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.Input, {\n        width: 60,\n        name: \"jsCode\",\n        \"data-testid\": _testIds__WEBPACK_IMPORTED_MODULE_5__.testIds.appConfig.jsCode,\n        value: state.jsCode,\n        placeholder: `Your secret API Code`,\n        onChange: onChange\n    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n        className: s.marginTop\n    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {\n        type: \"submit\",\n        \"data-testid\": _testIds__WEBPACK_IMPORTED_MODULE_5__.testIds.appConfig.submit,\n        onClick: ()=>updatePluginAndReload(plugin.meta.id, {\n                enabled,\n                pinned,\n                jsonData: {\n                    apiKey: state.apiKey,\n                    jsCode: state.jsCode\n                }\n            }),\n        disabled: Boolean(!state.apiKey || !state.jsCode)\n    }, \"Save API settings\"))));\n};\nconst getStyles = (theme)=>({\n        colorWeak: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_2__.css)`\n    color: ${theme.colors.text.secondary};\n  `,\n        marginTop: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_2__.css)`\n    margin-top: ${theme.spacing(3)};\n  `\n    });\nconst updatePluginAndReload = function() {\n    var _ref = _async_to_generator(function*(pluginId, data) {\n        try {\n            yield updatePlugin(pluginId, data);\n            // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.\n            // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.\n            window.location.reload();\n        } catch (e) {\n            console.error('Error while updating the plugin', e);\n        }\n    });\n    return function updatePluginAndReload(pluginId, data) {\n        return _ref.apply(this, arguments);\n    };\n}();\nconst updatePlugin = function() {\n    var _ref = _async_to_generator(function*(pluginId, data) {\n        const response = yield (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__.getBackendSrv)().fetch({\n            url: `/api/plugins/${pluginId}/settings`,\n            method: 'POST',\n            data\n        });\n        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)(response);\n    });\n    return function updatePlugin(pluginId, data) {\n        return _ref.apply(this, arguments);\n    };\n}();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0FwcENvbmZpZy9BcHBDb25maWcudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUQ7QUFDaEI7QUFDRjtBQUVjO0FBQ3dCO0FBQ3BDO0FBZ0I5QixNQUFNVyxZQUFZLENBQUMsRUFBRUMsTUFBTSxFQUFrQjtJQUNsRCxNQUFNQyxJQUFJSix1REFBVUEsQ0FBQ0s7SUFDckIsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdMLE9BQU9NLElBQUk7SUFDakQsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUduQiwrQ0FBUUEsQ0FBUTtRQUN4Q29CLFFBQVFKLENBQUFBLHFCQUFBQSwrQkFBQUEsU0FBVUksTUFBTSxLQUFJO1FBQzVCQyxRQUFRTCxDQUFBQSxxQkFBQUEsK0JBQUFBLFNBQVVLLE1BQU0sS0FBSTtJQUM5QjtJQUVBLE1BQU1DLFdBQVcsQ0FBQ0M7UUFDaEJKLFNBQVMsd0NBQ0pEO1lBQ0gsQ0FBQ0ssTUFBTUMsTUFBTSxDQUFDQyxJQUFJLENBQUMsRUFBRUYsTUFBTUMsTUFBTSxDQUFDRSxLQUFLLENBQUNDLElBQUk7O0lBRWhEO0lBRUEscUJBQ0UsMkRBQUNDO1FBQUlDLGVBQWFwQiw2Q0FBT0EsQ0FBQ3FCLFNBQVMsQ0FBQ0MsU0FBUztxQkFDM0MsMkRBQUN6QixpREFBUUE7UUFBQzBCLE9BQU07cUJBQ2QsMkRBQUMzQiw4Q0FBS0E7UUFBQzJCLE9BQU07UUFBVUMsYUFBWTtxQkFDakMsMkRBQUMxQiw4Q0FBS0E7UUFDSjJCLE9BQU87UUFDUEwsZUFBYXBCLDZDQUFPQSxDQUFDcUIsU0FBUyxDQUFDVCxNQUFNO1FBQ3JDSSxNQUFLO1FBQ0xDLE9BQU9SLE1BQU1HLE1BQU07UUFDbkJjLGFBQWE7UUFDYmIsVUFBVUE7dUJBSWQsMkRBQUNqQiw4Q0FBS0E7UUFBQzJCLE9BQU07UUFBV0MsYUFBWTtRQUFHRyxXQUFXeEIsRUFBRXlCLFNBQVM7cUJBQzNELDJEQUFDOUIsOENBQUtBO1FBQ0oyQixPQUFPO1FBQ1BULE1BQUs7UUFDTEksZUFBYXBCLDZDQUFPQSxDQUFDcUIsU0FBUyxDQUFDVixNQUFNO1FBQ3JDTSxPQUFPUixNQUFNRSxNQUFNO1FBQ25CZSxhQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDbkNiLFVBQVVBO3VCQUlkLDJEQUFDTTtRQUFJUSxXQUFXeEIsRUFBRXlCLFNBQVM7cUJBQ3pCLDJEQUFDakMsK0NBQU1BO1FBQ0xrQyxNQUFLO1FBQ0xULGVBQWFwQiw2Q0FBT0EsQ0FBQ3FCLFNBQVMsQ0FBQ1MsTUFBTTtRQUNyQ0MsU0FBUyxJQUNQQyxzQkFBc0I5QixPQUFPTSxJQUFJLENBQUN5QixFQUFFLEVBQUU7Z0JBQ3BDNUI7Z0JBQ0FDO2dCQUNBQyxVQUFVO29CQUNSSyxRQUFRSCxNQUFNRyxNQUFNO29CQUNwQkQsUUFBUUYsTUFBTUUsTUFBTTtnQkFDdEI7WUFDRjtRQUVGdUIsVUFBVUMsUUFBUSxDQUFDMUIsTUFBTUcsTUFBTSxJQUFJLENBQUNILE1BQU1FLE1BQU07T0FDakQ7QUFPWCxFQUFFO0FBRUYsTUFBTVAsWUFBWSxDQUFDZ0MsUUFBMEI7UUFDM0NDLFdBQVc1QyxpREFBRyxDQUFDO1dBQ04sRUFBRTJDLE1BQU1FLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUM7RUFDdkMsQ0FBQztRQUNEWixXQUFXbkMsaURBQUcsQ0FBQztnQkFDRCxFQUFFMkMsTUFBTUssT0FBTyxDQUFDLEdBQUc7RUFDakMsQ0FBQztJQUNIO0FBRUEsTUFBTVQ7ZUFBd0IsOEJBQU9VLFVBQWtCQztRQUNyRCxJQUFJO1lBQ0YsTUFBTUMsYUFBYUYsVUFBVUM7WUFFN0IscUdBQXFHO1lBQ3JHLDhHQUE4RztZQUM5R0UsT0FBT0MsUUFBUSxDQUFDQyxNQUFNO1FBQ3hCLEVBQUUsT0FBT0MsR0FBRztZQUNWQyxRQUFRQyxLQUFLLENBQUMsbUNBQW1DRjtRQUNuRDtJQUNGO29CQVZNaEIsc0JBQStCVSxVQUFrQkM7Ozs7QUFZaEQsTUFBTUM7ZUFBZSw4QkFBT0YsVUFBa0JDO1FBQ25ELE1BQU1RLFdBQVcsTUFBTXpELCtEQUFhQSxHQUFHMEQsS0FBSyxDQUFDO1lBQzNDQyxLQUFLLENBQUMsYUFBYSxFQUFFWCxTQUFTLFNBQVMsQ0FBQztZQUN4Q1ksUUFBUTtZQUNSWDtRQUNGO1FBRUEsT0FBT25ELG1EQUFhQSxDQUFDMkQ7SUFDdkI7b0JBUmFQLGFBQXNCRixVQUFrQkM7OztJQVFuRCIsInNvdXJjZXMiOlsid2VicGFjazovL2d1aWd1LWFtYXAtYXBwLy4vY29tcG9uZW50cy9BcHBDb25maWcvQXBwQ29uZmlnLnRzeD9lNTE3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDaGFuZ2VFdmVudCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsYXN0VmFsdWVGcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IHsgQXBwUGx1Z2luTWV0YSwgR3JhZmFuYVRoZW1lMiwgUGx1Z2luQ29uZmlnUGFnZVByb3BzLCBQbHVnaW5NZXRhIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBnZXRCYWNrZW5kU3J2IH0gZnJvbSAnQGdyYWZhbmEvcnVudGltZSc7XG5pbXBvcnQgeyBCdXR0b24sIEZpZWxkLCBGaWVsZFNldCwgSW5wdXQsIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5pbXBvcnQgeyB0ZXN0SWRzIH0gZnJvbSAnLi4vdGVzdElkcyc7XG5cbmV4cG9ydCB0eXBlIEFwcFBsdWdpblNldHRpbmdzID0ge1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIGpzQ29kZT86IHN0cmluZztcbn07XG5cbnR5cGUgU3RhdGUgPSB7XG4gIC8vIFRoZSBVUkwgdG8gcmVhY2ggb3VyIGN1c3RvbSBBUEkuXG4gIGpzQ29kZTogc3RyaW5nO1xuICAvLyBBIHNlY3JldCBrZXkgZm9yIG91ciBjdXN0b20gQVBJLlxuICBhcGlLZXk6IHN0cmluZztcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ29uZmlnUHJvcHMgZXh0ZW5kcyBQbHVnaW5Db25maWdQYWdlUHJvcHM8QXBwUGx1Z2luTWV0YTxBcHBQbHVnaW5TZXR0aW5ncz4+IHt9XG5cbmV4cG9ydCBjb25zdCBBcHBDb25maWcgPSAoeyBwbHVnaW4gfTogQXBwQ29uZmlnUHJvcHMpID0+IHtcbiAgY29uc3QgcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgY29uc3QgeyBlbmFibGVkLCBwaW5uZWQsIGpzb25EYXRhIH0gPSBwbHVnaW4ubWV0YTtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxTdGF0ZT4oe1xuICAgIGpzQ29kZToganNvbkRhdGE/LmpzQ29kZSB8fCAnJyxcbiAgICBhcGlLZXk6IGpzb25EYXRhPy5hcGlLZXkgfHwgJycsXG4gIH0pO1xuXG4gIGNvbnN0IG9uQ2hhbmdlID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIHNldFN0YXRlKHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgW2V2ZW50LnRhcmdldC5uYW1lXTogZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0aWQ9e3Rlc3RJZHMuYXBwQ29uZmlnLmNvbnRhaW5lcn0+XG4gICAgICA8RmllbGRTZXQgbGFiZWw9XCJBUEkgU2V0dGluZ3NcIj5cbiAgICAgICAgPEZpZWxkIGxhYmVsPVwiQVBJIEtleVwiIGRlc2NyaXB0aW9uPVwiQSBzZWNyZXQga2V5IGZvciBhdXRoZW50aWNhdGluZyB0byBvdXIgY3VzdG9tIEFQSVwiPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgd2lkdGg9ezYwfVxuICAgICAgICAgICAgZGF0YS10ZXN0aWQ9e3Rlc3RJZHMuYXBwQ29uZmlnLmFwaUtleX1cbiAgICAgICAgICAgIG5hbWU9XCJhcGlLZXlcIlxuICAgICAgICAgICAgdmFsdWU9e3N0YXRlLmFwaUtleX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnWW91ciBzZWNyZXQgQVBJIGtleSd9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9GaWVsZD5cblxuICAgICAgICA8RmllbGQgbGFiZWw9XCJBUEkgQ29kZVwiIGRlc2NyaXB0aW9uPVwiXCIgY2xhc3NOYW1lPXtzLm1hcmdpblRvcH0+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICB3aWR0aD17NjB9XG4gICAgICAgICAgICBuYW1lPVwianNDb2RlXCJcbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPXt0ZXN0SWRzLmFwcENvbmZpZy5qc0NvZGV9XG4gICAgICAgICAgICB2YWx1ZT17c3RhdGUuanNDb2RlfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2BZb3VyIHNlY3JldCBBUEkgQ29kZWB9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9GaWVsZD5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5tYXJnaW5Ub3B9PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgZGF0YS10ZXN0aWQ9e3Rlc3RJZHMuYXBwQ29uZmlnLnN1Ym1pdH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgIHVwZGF0ZVBsdWdpbkFuZFJlbG9hZChwbHVnaW4ubWV0YS5pZCwge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQsXG4gICAgICAgICAgICAgICAgcGlubmVkLFxuICAgICAgICAgICAgICAgIGpzb25EYXRhOiB7XG4gICAgICAgICAgICAgICAgICBhcGlLZXk6IHN0YXRlLmFwaUtleSxcbiAgICAgICAgICAgICAgICAgIGpzQ29kZTogc3RhdGUuanNDb2RlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNhYmxlZD17Qm9vbGVhbighc3RhdGUuYXBpS2V5IHx8ICFzdGF0ZS5qc0NvZGUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFNhdmUgQVBJIHNldHRpbmdzXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9GaWVsZFNldD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4gKHtcbiAgY29sb3JXZWFrOiBjc3NgXG4gICAgY29sb3I6ICR7dGhlbWUuY29sb3JzLnRleHQuc2Vjb25kYXJ5fTtcbiAgYCxcbiAgbWFyZ2luVG9wOiBjc3NgXG4gICAgbWFyZ2luLXRvcDogJHt0aGVtZS5zcGFjaW5nKDMpfTtcbiAgYCxcbn0pO1xuXG5jb25zdCB1cGRhdGVQbHVnaW5BbmRSZWxvYWQgPSBhc3luYyAocGx1Z2luSWQ6IHN0cmluZywgZGF0YTogUGFydGlhbDxQbHVnaW5NZXRhPEFwcFBsdWdpblNldHRpbmdzPj4pID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB1cGRhdGVQbHVnaW4ocGx1Z2luSWQsIGRhdGEpO1xuXG4gICAgLy8gUmVsb2FkaW5nIHRoZSBwYWdlIGFzIHRoZSBjaGFuZ2VzIG1hZGUgaGVyZSB3b3VsZG4ndCBiZSBwcm9wYWdhdGVkIHRvIHRoZSBhY3R1YWwgcGx1Z2luIG90aGVyd2lzZS5cbiAgICAvLyBUaGlzIGlzIG5vdCBpZGVhbCwgaG93ZXZlciB1bmZvcnR1bmF0ZWx5IGN1cnJlbnRseSB0aGVyZSBpcyBubyBzdXBwb3J0ZWQgd2F5IGZvciB1cGRhdGluZyB0aGUgcGx1Z2luIHN0YXRlLlxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHVwZGF0aW5nIHRoZSBwbHVnaW4nLCBlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGFzeW5jIChwbHVnaW5JZDogc3RyaW5nLCBkYXRhOiBQYXJ0aWFsPFBsdWdpbk1ldGE+KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0QmFja2VuZFNydigpLmZldGNoKHtcbiAgICB1cmw6IGAvYXBpL3BsdWdpbnMvJHtwbHVnaW5JZH0vc2V0dGluZ3NgLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGEsXG4gIH0pO1xuXG4gIHJldHVybiBsYXN0VmFsdWVGcm9tKHJlc3BvbnNlKTtcbn07XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsImxhc3RWYWx1ZUZyb20iLCJjc3MiLCJnZXRCYWNrZW5kU3J2IiwiQnV0dG9uIiwiRmllbGQiLCJGaWVsZFNldCIsIklucHV0IiwidXNlU3R5bGVzMiIsInRlc3RJZHMiLCJBcHBDb25maWciLCJwbHVnaW4iLCJzIiwiZ2V0U3R5bGVzIiwiZW5hYmxlZCIsInBpbm5lZCIsImpzb25EYXRhIiwibWV0YSIsInN0YXRlIiwic2V0U3RhdGUiLCJqc0NvZGUiLCJhcGlLZXkiLCJvbkNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwidHJpbSIsImRpdiIsImRhdGEtdGVzdGlkIiwiYXBwQ29uZmlnIiwiY29udGFpbmVyIiwibGFiZWwiLCJkZXNjcmlwdGlvbiIsIndpZHRoIiwicGxhY2Vob2xkZXIiLCJjbGFzc05hbWUiLCJtYXJnaW5Ub3AiLCJ0eXBlIiwic3VibWl0Iiwib25DbGljayIsInVwZGF0ZVBsdWdpbkFuZFJlbG9hZCIsImlkIiwiZGlzYWJsZWQiLCJCb29sZWFuIiwidGhlbWUiLCJjb2xvcldlYWsiLCJjb2xvcnMiLCJ0ZXh0Iiwic2Vjb25kYXJ5Iiwic3BhY2luZyIsInBsdWdpbklkIiwiZGF0YSIsInVwZGF0ZVBsdWdpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsInJlc3BvbnNlIiwiZmV0Y2giLCJ1cmwiLCJtZXRob2QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/AppConfig/AppConfig.tsx\n");

/***/ }),

/***/ "./components/AppConfig/index.tsx":
/*!****************************************!*\
  !*** ./components/AppConfig/index.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppConfig: () => (/* reexport safe */ _AppConfig__WEBPACK_IMPORTED_MODULE_0__.AppConfig),\n/* harmony export */   updatePlugin: () => (/* reexport safe */ _AppConfig__WEBPACK_IMPORTED_MODULE_0__.updatePlugin)\n/* harmony export */ });\n/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppConfig */ \"./components/AppConfig/AppConfig.tsx\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0FwcENvbmZpZy9pbmRleC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3VpZ3UtYW1hcC1hcHAvLi9jb21wb25lbnRzL0FwcENvbmZpZy9pbmRleC50c3g/YWQ0MyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICcuL0FwcENvbmZpZyc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/AppConfig/index.tsx\n");

/***/ }),

/***/ "./components/testIds.ts":
/*!*******************************!*\
  !*** ./components/testIds.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   testIds: () => (/* binding */ testIds)\n/* harmony export */ });\nconst testIds = {\n    appConfig: {\n        container: 'data-testid ac-container',\n        apiKey: 'data-testid ac-api-key',\n        jsCode: 'data-testid ac-js-code',\n        submit: 'data-testid ac-submit-form'\n    },\n    pageOne: {\n        container: 'data-testid pg-one-container',\n        navigateToFour: 'data-testid navigate-to-four'\n    },\n    pageTwo: {\n        container: 'data-testid pg-two-container'\n    },\n    pageThree: {\n        container: 'data-testid pg-three-container'\n    },\n    pageFour: {\n        container: 'data-testid pg-four-container',\n        health: 'data-testid pg-four-health',\n        ping: 'data-testid pg-four-ping'\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3Rlc3RJZHMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU1BLFVBQVU7SUFDckJDLFdBQVc7UUFDVEMsV0FBVztRQUNYQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsUUFBUTtJQUNWO0lBQ0FDLFNBQVM7UUFDUEosV0FBVztRQUNYSyxnQkFBZ0I7SUFDbEI7SUFDQUMsU0FBUztRQUNQTixXQUFXO0lBQ2I7SUFDQU8sV0FBVztRQUNUUCxXQUFXO0lBQ2I7SUFDQVEsVUFBVTtRQUNSUixXQUFXO1FBQ1hTLFFBQVE7UUFDUkMsTUFBTTtJQUNSO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2d1aWd1LWFtYXAtYXBwLy4vY29tcG9uZW50cy90ZXN0SWRzLnRzPzAwNTkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHRlc3RJZHMgPSB7XG4gIGFwcENvbmZpZzoge1xuICAgIGNvbnRhaW5lcjogJ2RhdGEtdGVzdGlkIGFjLWNvbnRhaW5lcicsXG4gICAgYXBpS2V5OiAnZGF0YS10ZXN0aWQgYWMtYXBpLWtleScsXG4gICAganNDb2RlOiAnZGF0YS10ZXN0aWQgYWMtanMtY29kZScsXG4gICAgc3VibWl0OiAnZGF0YS10ZXN0aWQgYWMtc3VibWl0LWZvcm0nLFxuICB9LFxuICBwYWdlT25lOiB7XG4gICAgY29udGFpbmVyOiAnZGF0YS10ZXN0aWQgcGctb25lLWNvbnRhaW5lcicsXG4gICAgbmF2aWdhdGVUb0ZvdXI6ICdkYXRhLXRlc3RpZCBuYXZpZ2F0ZS10by1mb3VyJyxcbiAgfSxcbiAgcGFnZVR3bzoge1xuICAgIGNvbnRhaW5lcjogJ2RhdGEtdGVzdGlkIHBnLXR3by1jb250YWluZXInLFxuICB9LFxuICBwYWdlVGhyZWU6IHtcbiAgICBjb250YWluZXI6ICdkYXRhLXRlc3RpZCBwZy10aHJlZS1jb250YWluZXInLFxuICB9LFxuICBwYWdlRm91cjoge1xuICAgIGNvbnRhaW5lcjogJ2RhdGEtdGVzdGlkIHBnLWZvdXItY29udGFpbmVyJyxcbiAgICBoZWFsdGg6ICdkYXRhLXRlc3RpZCBwZy1mb3VyLWhlYWx0aCcsXG4gICAgcGluZzogJ2RhdGEtdGVzdGlkIHBnLWZvdXItcGluZycsXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbInRlc3RJZHMiLCJhcHBDb25maWciLCJjb250YWluZXIiLCJhcGlLZXkiLCJqc0NvZGUiLCJzdWJtaXQiLCJwYWdlT25lIiwibmF2aWdhdGVUb0ZvdXIiLCJwYWdlVHdvIiwicGFnZVRocmVlIiwicGFnZUZvdXIiLCJoZWFsdGgiLCJwaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/testIds.ts\n");

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   plugin: () => (/* binding */ plugin)\n/* harmony export */ });\n/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ \"@grafana/data\");\n/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_AppConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AppConfig */ \"./components/AppConfig/index.tsx\");\n\n\nconst plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__.AppPlugin().addConfigPage({\n    title: 'Configuration',\n    icon: 'cog',\n    body: _components_AppConfig__WEBPACK_IMPORTED_MODULE_1__.AppConfig,\n    id: 'configuration'\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tb2R1bGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNTO0FBRTVDLE1BQU1FLFNBQVMsSUFBSUYsb0RBQVNBLEdBQU9HLGFBQWEsQ0FBQztJQUN0REMsT0FBTztJQUNQQyxNQUFNO0lBQ05DLE1BQU1MLDREQUFTQTtJQUNmTSxJQUFJO0FBQ04sR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2d1aWd1LWFtYXAtYXBwLy4vbW9kdWxlLnRzP2MyMTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUGx1Z2luIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tICcuL2NvbXBvbmVudHMvQXBwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IHBsdWdpbiA9IG5ldyBBcHBQbHVnaW48e30+KCkuYWRkQ29uZmlnUGFnZSh7XG4gIHRpdGxlOiAnQ29uZmlndXJhdGlvbicsXG4gIGljb246ICdjb2cnLFxuICBib2R5OiBBcHBDb25maWcsXG4gIGlkOiAnY29uZmlndXJhdGlvbicsXG59KTtcbiJdLCJuYW1lcyI6WyJBcHBQbHVnaW4iLCJBcHBDb25maWciLCJwbHVnaW4iLCJhZGRDb25maWdQYWdlIiwidGl0bGUiLCJpY29uIiwiYm9keSIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./module.ts\n");

/***/ }),

/***/ "@emotion/css":
/*!*******************************!*\
  !*** external "@emotion/css" ***!
  \*******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__emotion_css__;

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./module.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;