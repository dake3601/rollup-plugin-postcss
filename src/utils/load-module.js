import importCwd from 'import-cwd'

export async function loadModule(moduleId) {
  // Trying to load module normally (relative to plugin directory)
  try {
    return await import(moduleId)
  } catch {
    // Ignore error
  }

  // Then, trying to load it relative to CWD
  return importCwd.silent(moduleId)
}
