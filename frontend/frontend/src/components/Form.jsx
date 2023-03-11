import React, { useState } from "react";
import axios from 'axios'
export default function StudentForm() {
  const [formData, setFormData] = useState({
		id: "",
		firstName: "",
		lastName: "",
		age: "",
		nationality: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:3000/init", formData);
		alert("Student added successfully!");
		setFormData({
			id: "",
			firstName: "",
			lastName: "",
			age: "",
			nationality: "",
		});
	};
	return (

		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="ID" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
				<input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
				<input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
				<input type="text" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
				<input type="text" placeholder="Nationality" value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} />
				<button type="submit">Add Student</button>
			</form>
		</div>
	);
}
