# Netlify Require Cache Bug

## steps to reproduce

1. start `netlify dev` and `./build.js --watch`
2. make a change to `./src/index.js`
3. notice that the dist file (`netlify/functions/server/dist/index.cjs`) is updated and whats shown in the browser is not
