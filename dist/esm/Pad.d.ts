import React from "react";
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
    fromDataURL: (dataUrl: string, options?: {
        ratio?: number;
        width?: number;
        height?: number;
        xOffset?: number;
        yOffset?: number;
    }) => Promise<void>;
    toData: () => PointGroup[];
    fromData: (pointGroups: PointGroup[], options?: {
        clear?: boolean;
    }) => void;
    getCanvas: () => HTMLCanvasElement;
    getSignaturePad: () => SignaturePad;
    on: () => void;
    off: () => void;
}
declare const SignatureCanvas: React.ForwardRefExoticComponent<SignatureCanvasProps & React.RefAttributes<SignatureCanvasRef>>;
export default SignatureCanvas;
