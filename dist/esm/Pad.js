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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import SignaturePad from "signature_pad";
const SignatureCanvas = forwardRef((_a, ref) => {
    var { canvasProps, clearOnResize = true } = _a, sigPadProps = __rest(_a, ["canvasProps", "clearOnResize"]);
    const canvasRef = useRef(null);
    const sigPadRef = useRef(null);
    useEffect(() => {
        if (canvasRef.current) {
            sigPadRef.current = new SignaturePad(canvasRef.current, sigPadProps);
            resizeCanvas();
            window.addEventListener("resize", handleResize);
        }
        return () => {
            var _a;
            window.removeEventListener("resize", handleResize);
            (_a = sigPadRef.current) === null || _a === void 0 ? void 0 : _a.off();
        };
    }, []);
    useEffect(() => {
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
    // Expose methods
    useImperativeHandle(ref, () => ({
        clear: () => getSignaturePad().clear(),
        isEmpty: () => getSignaturePad().isEmpty(),
        toDataURL: (type = "image/png", encoderOptions) => getSignaturePad().toDataURL(type, encoderOptions),
        toSVG: (options) => getSignaturePad().toSVG(options),
        fromDataURL: (dataUrl, options) => getSignaturePad().fromDataURL(dataUrl, options),
        toData: () => getSignaturePad().toData(),
        fromData: (pointGroups, options) => getSignaturePad().fromData(pointGroups, options),
        getCanvas: () => getCanvas(),
        getSignaturePad: () => getSignaturePad(),
        on: () => getSignaturePad().on(),
        off: () => getSignaturePad().off()
    }));
    return _jsx("canvas", Object.assign({ ref: canvasRef }, canvasProps));
});
export default SignatureCanvas;
//# sourceMappingURL=Pad.js.map