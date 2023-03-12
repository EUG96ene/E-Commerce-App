import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function StudentsByNationality() {
	const [studentsByNationality, setStudentsByNationality] = useState([]);
	const [selectedNationality, setSelectedNationality] = useState("");
	const [sortedStudents, setSortedStudents] = useState([]);

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

	const handleSelectChange = (event) => {
		setSelectedNationality(event.target.value);
		setSortedStudents(studentsByNationality.filter((student) => student.nationality === event.target.value).sort((a, b) => a.firstName.localeCompare(b.firstName)));
	};

	const handleSort = () => {
		setSortedStudents([...sortedStudents].reverse());
	};

	return (
		<div className="container">
			<div className="form-container">
				<select id="nationality" className="nationality-select" onChange={handleSelectChange} value={selectedNationality}>
					{nationalities.map((nationality) => (
						<option key={nationality.nationality} value={nationality.nationality}>
							{nationality.nationality}
						</option>
					))}
				</select>
			</div>
			<div className={`student-selected-container ${selectedNationality ? "filtered" : ""}`}>
				{sortedStudents.map((student) => (
					<div className="student-container" key={student.id}>
						<h3>{student.nationality}</h3>
						<ul>
							<li>
								{student.firstName} {student.lastName} (Age {student.age})
							</li>
						</ul>
					</div>
				))}
			</div>
			<button onClick={handleSort} className="sort-button">
				Sort
			</button>
		</div>
	);
}
