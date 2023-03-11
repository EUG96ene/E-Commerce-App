import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentsByNationality() {
  const [studentsByNationality, setStudentsByNationality] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/students");
      setStudentsByNationality(result.data);
      setSelectedNationality(result.data[0]?.nationality ?? "");
    };
    fetchData();
  }, []);

  const nationalities = Object.values(
    studentsByNationality.reduce((acc, student) => {
      if (!acc[student.nationality]) {
        acc[student.nationality] = {
          nationality: student.nationality,
          students: [student],
        };
      } else {
        acc[student.nationality].students.push(student);
      }
      return acc;
    }, {})
  ).sort((a, b) => a.nationality.localeCompare(b.nationality));

  const handleSelectChange = (event) => {
    setSelectedNationality(event.target.value);
  };

  return (
    <div>
      <h3>Students by Nationality</h3>
      <label htmlFor="nationality">Select nationality:</label>
      <select id="nationality" onChange={handleSelectChange} value={selectedNationality}>
        {nationalities.map((nationality) => (
          <option key={nationality.nationality} value={nationality.nationality}>
            {nationality.nationality}
          </option>
        ))}
      </select>
      {studentsByNationality
        .filter(
          (student) =>
            selectedNationality === "" ||
            student.nationality === selectedNationality
        )
        .map((student) => (
          <div key={student.id}>
            <h3>{student.nationality}</h3>
            <ul>
              <li>
                {student.firstName} {student.lastName} (Age {student.age})
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
