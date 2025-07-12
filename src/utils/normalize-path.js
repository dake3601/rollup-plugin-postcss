/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (p) => p && p.replace(/\\+/g, '/')
