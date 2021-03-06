#!/usr/bin/env node
let path = require("path");
let { build, ts, tsconfig, dirname, glob, log } = require("estrella");

let baseConfig = {
  entryPoints: ["src/index.ts"],
  outdir: "netlify/functions/server/dist",
  minify: false,
  onEnd(config) {
    generateTypeDefs(config);
  },
};

build({
  ...baseConfig,
  format: "cjs",
  sourcemap: true,
  outExtension: { ".js": ".cjs" },
});

function generateTypeDefs(config) {
  let tsc = tsconfig(config);

  let tscInclude = tsc.include ? tsc.include.map((i) => glob(i)) : [];
  let entryPoints = Array.isArray(config.entry) ? config.entry : [config.entry];

  let filenames = Array.from(new Set(...tscInclude, ...entryPoints));

  log.info("Generating type declaration files for", filenames.join(", "));

  let compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: undefined,
    declaration: true,
    outDir: config.outdir,
  };

  let program = ts.ts.createProgram(filenames, compilerOptions);
  let targetSourceFile = undefined;
  let writeFile = undefined;
  let cancellationToken = undefined;
  let emitOnlyDtsFiles = true;

  program.emit(
    targetSourceFile,
    writeFile,
    cancellationToken,
    emitOnlyDtsFiles
  );

  log.info("Wrote", glob("./netlify/functions/server/dist/*.d.ts").join(", "));
}
