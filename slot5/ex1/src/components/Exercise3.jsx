function Exercise3() {
  const person = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      // city: "Hanoi" // thử bỏ dòng này để kiểm tra giá trị mặc định
    }
  };

  // Destructuring lồng nhau + giá trị mặc định cho city
  const {
    address: {
      street,
      city = "Unknown City"
    }
  } = person;

  return (
    <div>
      <h2>Exercise 3</h2>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}
export default Exercise3;
