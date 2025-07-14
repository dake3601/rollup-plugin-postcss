/**
 * Load a module using modern ESM dynamic imports
 * @param {string} moduleId - The module to load
 * @returns {Promise<any>} The loaded module
 */
export async function loadModule(moduleId) {
  try {
    // Try to import the module directly
    return await import(moduleId);
  } catch {
    // If direct import fails, try resolving from current working directory
    try {
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const resolvedPath = require.resolve(moduleId);
      return await import(resolvedPath);
    } catch {
      // Return null if module cannot be loaded
      return null;
    }
  }
}

/**
 * Load a module silently without throwing errors
 * @param {string} moduleId - The module to load
 * @returns {Promise<any|null>} The loaded module or null if failed
 */
export async function loadModuleSilent(moduleId) {
  try {
    return await loadModule(moduleId);
  } catch {
    return null;
  }
}
