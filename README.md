<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture> 
<br/> <br/>

# @siamf/react-signature-pad
A react wrapper component for signature pad integration into react with typescript and latest version of signature pad. It supports all kind of essentials API and options.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

# Installation

```bash
$ npm i @siamf/react-signature-pad
```

# Usage

```javascript
import { SignaturePad } from "@siamf/react-signature-pad";

//SignaturePad Component
<SignaturePad
  canvasProps={{ width: 600, height: 300 }}
/>
```

### How to use API?

```javascript
import { SignaturePad, SignatureCanvasRef } from "@siamf/react-signature-pad";
import { useRef } from "react";

const MyComponent = () => {
    const ref = useRef<SignatureCanvasRef>(null);

    const getDataUrl = () => {
        if (ref.current) {
            const dataUrl = ref.current.toDataURL();
            console.log('Signature as PNG:', dataUrl);
        }
    };

    //You can use All API by calling ref object;

    return (
        <div>
          <SignaturePad
            canvasProps={{ width: 600, height: 300 }}
            ref={ref}
          />
          <button onClick={getDataUrl}>
            Download Signature
          </button>
        </div>
    )
}

export default MyComponent;
````


# Props

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> dotSize </td>
    <td> number </td>
    <td> Radius of a single dot. Also the width of the start of a mark. </td>
  </tr>
   <tr>
    <td> minWidth </td>
    <td> number </td>
    <td> Minimum width of a line. Defaults to 0.5. </td>
  </tr>
   <tr>
    <td> maxWidth </td>
    <td> number </td>
    <td> Maximum width of a line. Defaults to 2.5. </td>
  </tr>
   <tr>
    <td> throttle </td>
    <td> number </td>
    <td> Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16. </td>
  </tr>
   <tr>
    <td> minDistance </td>
    <td> number </td>
    <td> Add the next point only if the previous one is farther than x pixels. Defaults to 5. </td>
  </tr>
  <tr>
    <td> backgroundColor </td>
    <td> string </td>
    <td> Color used to clear the background. Can be any color format accepted by context.fillStyle. Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images. </td>
  </tr>
  <tr>
    <td> penColor </td>
    <td> string </td>
    <td> Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black". </td>
  </tr>
  <tr>
    <td> velocityFilterWeight </td>
    <td> number </td>
    <td> Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.</td>
  </tr>
  <tr>
    <td> canvasContextOptions </td>
    <td> CanvasRenderingContext2DSettings </td>
    <td> Part of the Canvas API, provides the 2D rendering context for the drawing surface of a canvas element. It is used for drawing shapes, text, images, and other objects</td>
  </tr>
  <tr>
    <td> canvasProps </td>
    <td> HTMLCanvasElement </td>
    <td> Direct canvas html element props </td>
  </tr>
  <tr>
    <td> clearOnResize </td>
    <td> boolean </td>
    <td> Whether or not the canvas should be cleared when the window resizes </td>
  </tr>
</table>

## API Method

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> clear() </td>
    <td> () => void </td>
    <td> Clear canvas element </td>
  </tr>
   <tr>
    <td> isEmpty() </td>
    <td> () => boolean </td>
    <td> Whether canvas empty or not </td>
  </tr>
   <tr>
    <td> toDataURL() </td>
    <td> (type?: string, encoderOptions?: number) </td>
    <td> Writes a base64 image to canvas </td>
  </tr>
   <tr>
    <td> toSVG() </td>
    <td> (options?: ToSVGOptions) </td>
    <td> Get the svg element </td>
  </tr>
   <tr>
    <td> fromDataURL() </td>
    <td> (dataUrl: string, options?: { ratio?: number; width?: number; height?: number; xOffset?: number; yOffset?: number }) => Promise<void> </td>
    <td> Writes a base64 image to canvas </td>
  </tr>
  <tr>
    <td> toData() </td>
    <td> () => PointGroup[] </td>
    <td> Returns signature image as an array of point groups </td>
  </tr>
   <tr>
    <td> fromData() </td>
    <td> (pointGroups: PointGroup[], options?: { clear?: boolean }) => void </td>
    <td> Draws signature image from an array of point groups </td>
  </tr>
  <tr>
    <td> getCanvas() </td>
    <td> () => HTMLCanvasElement </td>
    <td> Get HTML Canvas Element </td>
  </tr>
  <tr>
    <td> getSignaturePad() </td>
    <td> () => SignaturePad </td>
    <td> Get the whole Signature Pas Instance </td>
  </tr>
  <tr>
    <td> on() </td>
    <td> () => void; </td>
    <td> Rebinds all event handlers </td>
  </tr>
   <tr>
    <td> off() </td>
    <td> () => void; </td>
    <td> Unbinds all event handlers </td>
  </tr>
</table>

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)
