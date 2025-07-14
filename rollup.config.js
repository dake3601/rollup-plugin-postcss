import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
    banner: `// rollup-plugin-postcss v${packageJson.version}`,
  },
};

export default config;
