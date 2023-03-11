import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentsByNationality() {
  const [studentsByNationality, setStudentsByNationality] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/students");
      setStudentsByNationality(result.data);
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

  return (
    <div>
      <h1>Students by Nationality</h1>
      {nationalities.map((group) => (
        <div key={group.nationality}>
          <h3>{group.nationality}</h3>
          <ul>
            {group.students.map((student) => (
              <li key={student.id}>
                {student.firstName} {student.lastName} (Age {student.age})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
