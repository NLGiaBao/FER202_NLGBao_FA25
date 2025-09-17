const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 22 },
    { name: "Kim", age: 13 }
];

// Filter teens (13-19), then map to "Name (Age)"
const teens = people
    .filter(p => p.age >= 13 && p.age <= 19)
    .map(p => `${p.name} (${p.age})`);

teens.forEach(str => console.log(str));
// Output:
// Ann (19)
// Tom (15)
// Kim (13)