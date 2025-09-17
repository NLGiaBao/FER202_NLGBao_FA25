const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
    // city is missing
  }
};

// Destructuring with default value for city
const { address: { street, city = "Unknown City" } } = person;

console.log("street:", street); // Lalaland 12
console.log("city:", city);     // Unknown City