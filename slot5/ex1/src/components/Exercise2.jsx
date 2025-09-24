export function Exercise2() {
    const numbers = [13, -2, 30, 4, 25, 63, 7, -8, 0, 10];

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    const avg = (sum / numbers.length).toFixed(2);

    const names = ["Bình", "An", "Em", "Sang", "Cường", "Vinh", "Quân", "Dũng", "Tuấn", "Phúc", "Bảo"];
    names.sort();
    
    const students = [
        { id: 1, name: "An", age: 20, grade: 8.5 },
        { id: 2, name: "Bình", age: 22, grade: 7.0 },
        { id: 3, name: "Cường", age: 21, grade: 9.0 },
        { id: 4, name: "Dũng", age: 23, grade: 6.5 },
        { id: 5, name: "Em", age: 19, grade: 8.0 },
        { id: 6, name: "Phúc", age: 24, grade: 7.5 },
        { id: 7, name: "Quân", age: 20, grade: 8.2 },
        { id: 8, name: "Sang", age: 22, grade: 9.1 },
        { id: 9, name: "Tuấn", age: 21, grade: 8.0 },
        { id: 10, name: "Vinh", age: 23, grade: 7.5 },
        { id: 11, name: "Bảo", age: 20, grade: 9.9 },
    ];
    //In ra danh sach students co diem > 7.5, sap xep theo grade giam dan
    const goodStudents = students
    .filter(student => student.grade > 7.5)
    .sort((a, b) => b.grade - a.grade);
    

  return (
    <div>
      <h2>Exercise 2</h2>

      <p>In mảng số nguyên:</p>
      <ul>
        {numbers.map((num, i) => (
          <li key={i}>Phần tử thứ {i}: {num}</li>
        ))}
      </ul>

      <p>Tổng các phần tử của mảng: {sum}</p>

      <p>Giá trị trung bình các phần tử trong mảng: {avg}</p>

      <p>Mảng tên theo thứ tự tăng dần alphabet:</p> 
      <ul>
        {names.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>

      <p>Hiển thị danh sách goodStudents dưới dạng bảng:</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Tuổi</th>
              <th>Điểm</th>
            </tr>
          </thead>
          <tbody>
            {goodStudents.map(student=> (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                </tr>
            ))}
            <tr>
              <td colSpan="3">Điểm trung bình:</td>
              <td>{(goodStudents.reduce((acc, student) => acc + student.grade, 0) / goodStudents.length).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
    </div>

  );
}
