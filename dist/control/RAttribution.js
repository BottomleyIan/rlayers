"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var control_1 = require("ol/control");
var RControlBase_1 = __importDefault(require("./RControlBase"));
var RAtrribution = (function (_super) {
    __extends(RAtrribution, _super);
    function RAtrribution(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.ol = new control_1.Attribution(_this.toOLProps(props));
        return _this;
    }
    RAtrribution.prototype.toOLProps = function (props) {
        var _a;
        return __assign(__assign({}, _super.prototype.toOLProps.call(this, props)), { className: props.className, collapsible: (_a = props.collapsible) !== null && _a !== void 0 ? _a : true, collapsed: props.collapsed });
    };
    return RAtrribution;
}(RControlBase_1.default));
exports.default = RAtrribution;
//# sourceMappingURL=RAttribution.js.map