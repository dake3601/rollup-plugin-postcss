import pify from 'pify';
import { loadModule } from './utils/load-module.js';
import humanlizePath from './utils/humanlize-path.js';

export default {
  name: 'less',
  test: /\.less$/,

  async process({ code }) {
    const lessModule = await loadModule('less');
    if (!lessModule) {
      throw new Error(
        'You need to install "less" package to process Less files'
      );
    }

    const less = lessModule.default || lessModule;
    const renderAsync = pify(less.render.bind(less));

    try {
      const {
        css,
        map: initialMap,
        imports,
      } = await renderAsync(code, {
        ...this.options,
        sourceMap: this.sourceMap && {},
        filename: this.id,
      });

      for (const dep of imports) {
        this.dependencies.add(dep);
      }

      let map = initialMap;
      if (map) {
        map = JSON.parse(map);
        map.sources = map.sources.map(source => humanlizePath(source));
      }

      return {
        code: css,
        map,
      };
    } catch (error) {
      throw new Error(`Less compilation failed: ${error.message}`);
    }
  },
};
