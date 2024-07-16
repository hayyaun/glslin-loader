# glslin-loader

glslin-loader is a loader that injects another glsl file content into the current file.

## Install

```sh
npm i -D glslin-loader
```

## Configuration

The `root` is the path to your shared glsl files.

```js
// webpack modules
rules: [
  ...,
  {
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: [
      "raw-loader",
      // use loader
      {
        loader: "glslin-loader",
        options: {
          root: path.resolve(__dirname, "src/shaders/lib"),
        },
      },
      // NOTE: use it before glslify, or injected part won't be processed
      "glslify-loader",
    ],
  },
];
```

## Usage

Later in the glsl file, use `#pragma include "filename.glsl"`. This will automatically replace the content of that file in-place. You can use relative path too but the root directory is gonna be the `root` option defined in webpack.

```glsl
uniform float u_alpha;
uniform vec2 u_transform;

varying vec2 v_uv;
varying vec2 v_aspect;

#pragma include "math.glsl"   <--- definition
#include "math.glsl"          <--- or short

void main() {
  ...
  float a1 = PI * 2.0;
  gl_FragColor = vec4(color, alpha);
}
```

> Short form won't be applied on any import with `<>`.  
> For example, `#import  <stdlib>` won't be affected!
