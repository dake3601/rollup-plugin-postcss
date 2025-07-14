import path from 'path';
import normalizePath from './normalize-path.js';

/**
 * Convert absolute path to relative path from current working directory
 * @param {string} filepath - Absolute file path
 * @returns {string} Relative path
 */
export default function humanlizePath(filepath) {
  return normalizePath(path.relative(process.cwd(), filepath));
}
