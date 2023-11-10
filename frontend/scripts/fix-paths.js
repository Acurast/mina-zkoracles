const fs = require("fs");

const replaceInFile = (filePath, searchString, replaceString) => {
  // Read file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Replace string
    const result = data.replace(new RegExp(searchString, "g"), replaceString);

    // Save file
    fs.writeFile(filePath, result, "utf8", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File successfully updated");
      }
    });
  });
};

replaceInFile(
  "node_modules/o1js/dist/node/bindings/crypto/bindings/curve.d.ts",
  "import { MlPair } from 'src/lib/ml/base.js';",
  "import { MlPair } from '../../lib/ml/base.js';"
);
replaceInFile(
  "node_modules/o1js/dist/node/bindings/crypto/bindings/kimchi-types.d.ts",
  "import type { WasmFpSrs, WasmFqSrs } from '../../compiled/node_bindings/plonk_wasm.cjs';",
  "import type { WasmFpSrs, WasmFqSrs } from '../../compiled/_node_bindings/plonk_wasm.cjs';"
);
replaceInFile(
  "node_modules/o1js/dist/node/bindings/js/node/node-backend.d.ts",
  'export const wasm: typeof import("../../compiled/node_bindings/plonk_wasm.cjs");',
  'export const wasm: typeof import("../../compiled/_node_bindings/plonk_wasm.cjs");'
);
replaceInFile(
  "node_modules/o1js/dist/node/bindings/js/wrapper.d.ts",
  'export function getWasm(): typeof import("../compiled/node_bindings/plonk_wasm.cjs");',
  'export function getWasm(): typeof import("../compiled/_node_bindings/plonk_wasm.cjs");'
);
replaceInFile(
  "node_modules/o1js/dist/node/lib/proof-system/prover-keys.d.ts",
  "import { WasmPastaFpPlonkIndex, WasmPastaFqPlonkIndex } from '../../bindings/compiled/node_bindings/plonk_wasm.cjs';",
  "import { WasmPastaFpPlonkIndex, WasmPastaFqPlonkIndex } from '../../bindings/compiled/_node_bindings/plonk_wasm.cjs';"
);
replaceInFile(
  "node_modules/o1js/dist/node/snarky.d.ts",
  "} from './bindings/compiled/node_bindings/plonk_wasm.cjs';",
  "} from './bindings/compiled/_node_bindings/plonk_wasm.cjs';"
);
