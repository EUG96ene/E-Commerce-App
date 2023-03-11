const Student = require ('../models/student')

exports.createStudent = async(req, res) => {
    const { id, firstName, lastName,age, nationality } = req.body;

    try {
        const newStudent = new Student({
            id,firstName, lastName,age, nationality
        })
        const savedStudent = await newStudent.save();
			res.status(201).json(savedStudent);
    } catch (error) {
        console.log(error);
			res.status(500).json(error);
    }

   
}
exports.getStudents = async(req,res) => {
    try {
        const allStudents = await Student.find({}).sort("nationality");
        res.status(200).json(allStudents);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}