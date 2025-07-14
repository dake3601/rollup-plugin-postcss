/**
 * Normalize path separators to forward slashes
 * @param {string} p - Path to normalize
 * @returns {string} Normalized path
 */
export default function normalizePath(p) {
  return p?.replace(/\\+/g, '/') || '';
}
