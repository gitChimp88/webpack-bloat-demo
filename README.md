# webpack-bloat-demo

A deliberately terrible webpack bundle. This project breaks every Webpack optimization rule to give you a large webpack bundle so you can practice optimization techniques on it to reduce the bundle size.

## Current bundle size

```
bundle.js  ~12 MB uncompressed
```

## How to build

```bash
npm install
npm run build            # regular build
npm run build:analyze    # build + open bundle visualizer
```
