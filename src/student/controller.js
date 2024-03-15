//to store business logic related to each route

const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  //   console.log("getting students...");

  pool.query(queries.getStudents, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  //check if email exists
  pool.query(queries.checkEmailExists, [email], (err, result) => {
    if (result.rows.length) {
      res.send("Email already taken.");
    }

    //else, add student to the database
    pool.query(queries.addStudent, [name, email, age, dob], (err, result) => {
      if (err) throw err;
      res.status(201).send("New student successfully added.");
    });
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (err, result) => {
    const noStudentFound = !result.rows.length;

    if (noStudentFound) {
      res.send("Student does not exist.");
    }

    pool.query(queries.removeStudent, [id], (err, result) => {
      if (err) throw err;

      res.status(200).send("Student removed successfully.");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const { email } = req.body;

  pool.query(queries.getStudentById, [id], (err, result) => {
    const noStudentFound = !result.rows.length;

    if (noStudentFound) {
      res.send("Student does not exist.");
    }

    pool.query(queries.updateStudent, [email, id], (err, result) => {
      if (err) throw err;

      res.status(200).send("Student email updated successfully.");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  removeStudent,
};
