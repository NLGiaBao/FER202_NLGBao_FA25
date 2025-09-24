const ages = [33, 12, 20, 16];
const arr =  [1,2,3,4,5,6,7];
// Destructuring: skip second, default for third, rest
const [first, , third = 0, ...restAges] = ages;

const evenArr = arr.filter(n => n % 2 ===0);
evenArr.forEach(n => console.log(n));

console.log("first:", first);      // 33
console.log("third:", third);      // 20
console.log("restAges:", restAges); // [16] 