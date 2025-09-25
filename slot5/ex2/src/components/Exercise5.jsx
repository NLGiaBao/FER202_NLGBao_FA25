function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 22 },
    { name: "Kim", age: 13 }
  ];

  const teens = people
    .filter(p => p.age >= 13 && p.age <= 19)
    .map(p => `${p.name} (${p.age})`);

  return (
    <div>
      <h2>Exercise 5</h2>
      {teens.map((str, idx) => (
        <p key={idx}>{str}</p>
      ))}
    </div>
  );
}
export default Exercise5;