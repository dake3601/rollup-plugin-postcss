// from https://github.com/eemeli/safe-identifier
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords
const reserved = new Set([
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'let',
  'static',
  'yield',
  'await',
]);

// from https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function identifier(key, unique) {
  if (unique) key += ` ${hashCode(key).toString(36)}`;
  const id = key.trim().replace(/\W+/g, '_');
  return reserved.has(id) || /^\d/.test(id) ? `_${id}` : id;
}

export function property(obj, key) {
  if (/^[A-Z_$][0-9A-Z_$]*$/i.test(key) && !reserved.ES3[key]) {
    return obj ? `${obj}.${key}` : key;
  } else {
    const jkey = JSON.stringify(key);
    return obj ? `${obj}[${jkey}]` : jkey;
  }
}
