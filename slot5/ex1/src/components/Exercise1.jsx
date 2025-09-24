function Exercise1() {
    const hamDouble = (x) => x * 2;
    const isEven = (x) => x % 2 === 0;
  return (
    <div>
      <h2>Exercise 1</h2>
      <p>hamDouble(5) = {hamDouble(5)}</p>
      <p>isEven(4) = {isEven(4) ? "Số chẵn" : "Số lẻ"}</p>
    </div>
  );
}
export default Exercise1;