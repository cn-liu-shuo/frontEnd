export const a = 6;

export function add(x, y) {
  return x + y;
}
function sub(a) {
  return a;
}

function mul(a, b) {
  return a * b;
}

export { sub, mul };

function fn(x, y) {
  return x / y;
}

export default fn;
