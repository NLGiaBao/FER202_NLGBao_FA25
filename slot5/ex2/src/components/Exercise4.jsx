function Exercise4() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h2>Exercise 4</h2>
      <p>first: {first}</p>
      <p>third: {third}</p>
      <p>restAges: [{restAges.join(', ')}]</p>
    </div>
  );
}
export default Exercise4;