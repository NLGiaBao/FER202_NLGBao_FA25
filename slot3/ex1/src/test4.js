const ages = [33, 12, 20, 16];

// Destructuring: skip second, default for third, rest
const [first, , third = 0, ...restAges] = ages;

console.log("first:", first);      // 33
console.log("third:", third);      // 20
console.log("restAges:", restAges); // [16] 