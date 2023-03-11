const { Router } = require("express");
const {createStudent} = require('../controllers/index')
const routes = Router();

// routes.get("/students", getStudents)
routes.post("/init",createStudent)

module.exports = routes;
