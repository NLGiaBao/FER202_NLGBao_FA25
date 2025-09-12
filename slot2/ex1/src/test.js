const result = (a,b) => a + b;
console.log(result(2,3));

let square = num => num * num;
console.log(square(5)); // output: 25

let sayHello = () => console.log("Hello Huydz!");
sayHello();

let person = {
  name: "John",
  age: 30,
  greet: function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
};
person.greet();

let greet = (name, timeofDay) => {
  console.log(`Good ${timeofDay}, ${name}!`);
}
greet("Alice", "morning"); // output: Good morning, Alice!
greet("Bob", "evening"); // output: Good evening, Bob!