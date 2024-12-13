function camelCasing(str) {
  return str
    .toLowerCase()
    .split(/[\s_]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice()
    )
    .join("");
}

console.log(camelCasing("Hello World"));
console.log(camelCasing("snake_case"));
console.log(camelCasing("low high_HIGH"));

function camelCasing(str) {
  return str
    .toLowerCase()
    .replace(/[_\s]+(.)/g, (_, camel) => camel.toUpperCase());
}
console.log(camelCasing("Hello World"));
console.log(camelCasing("snake_case"));
console.log(camelCasing("low high_HIGH"));
