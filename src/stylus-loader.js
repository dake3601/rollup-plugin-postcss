import pify from 'pify';
import { loadModule } from './utils/load-module.js';

export default {
  name: 'stylus',
  test: /\.(styl|stylus)$/,

  async process({ code }) {
    const stylusModule = await loadModule('stylus');
    if (!stylusModule) {
      throw new Error(
        'You need to install "stylus" package to process Stylus files'
      );
    }

    const stylus = stylusModule.default || stylusModule;
    const style = stylus(code, {
      ...this.options,
      filename: this.id,
      sourcemap: this.sourceMap && {},
    });

    const renderAsync = pify(style.render.bind(style));

    try {
      const css = await renderAsync();
      const deps = style.deps();

      for (const dep of deps) {
        this.dependencies.add(dep);
      }

      return {
        code: css,
        map: style.sourcemap,
      };
    } catch (error) {
      throw new Error(`Stylus compilation failed: ${error.message}`);
    }
  },
};
