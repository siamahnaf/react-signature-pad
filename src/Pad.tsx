import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import SignaturePad, { Options, PointGroup, ToSVGOptions } from "signature_pad";

export interface SignatureCanvasProps extends Options {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
}

export interface SignatureCanvasRef {
    clear: () => void;
    isEmpty: () => boolean;
    toDataURL: (type?: string, encoderOptions?: number) => string;
    toSVG: (options?: ToSVGOptions) => string;
    fromDataURL: (dataUrl: string, options?: { ratio?: number; width?: number; height?: number; xOffset?: number; yOffset?: number }) => Promise<void>;
    toData: () => PointGroup[];
    fromData: (pointGroups: PointGroup[], options?: { clear?: boolean }) => void;
    getCanvas: () => HTMLCanvasElement;
    getSignaturePad: () => SignaturePad;
    on: () => void;
    off: () => void;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, SignatureCanvasProps>(
    ({ canvasProps, clearOnResize = true, ...sigPadProps }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const sigPadRef = useRef<SignaturePad | null>(null);

        useEffect(() => {
            if (canvasRef.current) {
                sigPadRef.current = new SignaturePad(canvasRef.current, sigPadProps);
                resizeCanvas();
                window.addEventListener("resize", handleResize);
            }
            return () => {
                window.removeEventListener("resize", handleResize);
                sigPadRef.current?.off();
            };
        }, []);

        useEffect(() => {
            if (sigPadRef.current) {
                Object.assign(sigPadRef.current, sigPadProps);
            }
        }, [sigPadProps]);

        const getCanvas = (): HTMLCanvasElement => {
            if (!canvasRef.current) {
                throw new Error("Canvas reference is null.");
            }
            return canvasRef.current;
        };

        const getSignaturePad = (): SignaturePad => {
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
            if (!canvasRef.current) return;
            const canvas = getCanvas();
            const ratio = Math.max(window.devicePixelRatio ?? 1, 1);

            if (!canvasProps?.width) {
                canvas.width = canvas.offsetWidth * ratio;
            }
            if (!canvasProps?.height) {
                canvas.height = canvas.offsetHeight * ratio;
            }
            canvas.getContext("2d")!.scale(ratio, ratio);
            getSignaturePad().clear();
        };

        // Expose methods
        useImperativeHandle(ref, () => ({
            clear: () => getSignaturePad().clear(),

            isEmpty: () => getSignaturePad().isEmpty(),

            toDataURL: (type = "image/png", encoderOptions?: number) => getSignaturePad().toDataURL(type, encoderOptions),

            toSVG: (options?: ToSVGOptions) => getSignaturePad().toSVG(options),

            fromDataURL: (dataUrl: string, options?: { ratio?: number; width?: number; height?: number; xOffset?: number; yOffset?: number }) =>
                getSignaturePad().fromDataURL(dataUrl, options),

            toData: () => getSignaturePad().toData(),

            fromData: (pointGroups: PointGroup[], options?: { clear?: boolean }) => getSignaturePad().fromData(pointGroups, options),

            getCanvas: () => getCanvas(),

            getSignaturePad: () => getSignaturePad(),

            on: () => getSignaturePad().on(),
            off: () => getSignaturePad().off()
        }));

        return <canvas ref={canvasRef} {...canvasProps} />;
    }
);

export default SignatureCanvas;
