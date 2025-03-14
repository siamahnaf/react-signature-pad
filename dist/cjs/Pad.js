"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const signature_pad_1 = __importDefault(require("signature_pad"));
const SignatureCanvas = (0, react_1.forwardRef)((_a, ref) => {
    var { canvasProps, clearOnResize = true } = _a, sigPadProps = __rest(_a, ["canvasProps", "clearOnResize"]);
    const canvasRef = (0, react_1.useRef)(null);
    const sigPadRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (canvasRef.current) {
            sigPadRef.current = new signature_pad_1.default(canvasRef.current, sigPadProps);
            resizeCanvas();
            window.addEventListener("resize", handleResize);
        }
        return () => {
            var _a;
            window.removeEventListener("resize", handleResize);
            (_a = sigPadRef.current) === null || _a === void 0 ? void 0 : _a.off();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (sigPadRef.current) {
            Object.assign(sigPadRef.current, sigPadProps);
        }
    }, [sigPadProps]);
    const getCanvas = () => {
        if (!canvasRef.current) {
            throw new Error("Canvas reference is null.");
        }
        return canvasRef.current;
    };
    const getSignaturePad = () => {
        if (!sigPadRef.current) {
            throw new Error("SignaturePad reference is null.");
        }
        return sigPadRef.current;
    };
    const handleResize = () => {
        if (clearOnResize) {
            resizeCanvas();
        }
    };
    const resizeCanvas = () => {
        var _a;
        if (!canvasRef.current)
            return;
        const canvas = getCanvas();
        const ratio = Math.max((_a = window.devicePixelRatio) !== null && _a !== void 0 ? _a : 1, 1);
        if (!(canvasProps === null || canvasProps === void 0 ? void 0 : canvasProps.width)) {
            canvas.width = canvas.offsetWidth * ratio;
        }
        if (!(canvasProps === null || canvasProps === void 0 ? void 0 : canvasProps.height)) {
            canvas.height = canvas.offsetHeight * ratio;
        }
        canvas.getContext("2d").scale(ratio, ratio);
        getSignaturePad().clear();
    };
    const dataURLToBlob = (dataURL) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    // Expose methods
    (0, react_1.useImperativeHandle)(ref, () => ({
        clear: () => getSignaturePad().clear(),
        isEmpty: () => getSignaturePad().isEmpty(),
        toDataURL: (type = "image/png", encoderOptions) => getSignaturePad().toDataURL(type, encoderOptions),
        toFile: (type = "image/png", encoderOptions) => {
            const dataURL = getSignaturePad().toDataURL(type, encoderOptions);
            const blob = dataURLToBlob(dataURL);
            const ext = type === "image/png" ? ".png" : type === "image/jpeg" ? ".jpg" : ".svg";
            const file = new File([blob], `signature${ext}`, { type: type });
            return file;
        },
        toSVG: (options) => getSignaturePad().toSVG(options),
        fromDataURL: (dataUrl, options) => getSignaturePad().fromDataURL(dataUrl, options),
        toData: () => getSignaturePad().toData(),
        fromData: (pointGroups, options) => getSignaturePad().fromData(pointGroups, options),
        getCanvas: () => getCanvas(),
        getSignaturePad: () => getSignaturePad(),
        on: () => getSignaturePad().on(),
        off: () => getSignaturePad().off()
    }));
    return (0, jsx_runtime_1.jsx)("canvas", Object.assign({ ref: canvasRef }, canvasProps));
});
exports.default = SignatureCanvas;
//# sourceMappingURL=Pad.js.map