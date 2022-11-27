import isString from "./isString";

const _capString = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const capitalize = (s) => (isString(s) && _capString(s)) || "";

export default capitalize;