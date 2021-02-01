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
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var name = globalThis.constructor.name, pathname = globalThis.location.pathname;
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super.call(this, "@wilsjs/phaser") || this;
    }
    Scene.prototype.preload = function () {
    };
    Scene.prototype.create = function () {
    };
    return Scene;
}(Phaser.Scene));
var config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    parent: "main",
    scene: Scene,
};
new Phaser.Game(config);
function log(error) {
    var _a;
    var stack = new Error().stack;
    var a = (stack === null || stack === void 0 ? void 0 : stack.split("\n")) || [];
    var s = a[1];
    var message = {
        globalThis: name,
        location: pathname,
        function: String((_a = /at (.+) /.exec(s)) === null || _a === void 0 ? void 0 : _a.pop()),
    };
    error ? console.error(__assign(__assign({}, message), { error: error })) : console.info(message);
}
function onWindowLoad() {
    log();
}
globalThis.addEventListener("load", onWindowLoad);
//# sourceMappingURL=main.js.map