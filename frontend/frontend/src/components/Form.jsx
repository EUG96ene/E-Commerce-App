import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./form.css";
export default function StudentForm() {
	const [formData, setFormData] = useState({
		id: "",
		firstName: "",
		lastName: "",
		age: "",
		nationality: "",
	});
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Check if all form fields are filled
		if (!formData.id || !formData.firstName || !formData.lastName || !formData.age || !formData.nationality) {
			alert("Please fill out all fields");
			return;
		}
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
	const handleClick = () => {
		navigate("/Home");
	};
	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="ID" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
				<input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
				<input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
				<input type="text" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
				<input type="text" placeholder="Nationality" value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} />
				<button type="submit">Add Student</button>
				<button type="submit" onClick={handleClick}>
					View Students
				</button>
			</form>
		</div>
	);
}
