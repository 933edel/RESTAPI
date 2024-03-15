//to store student routes
const { Router } = require("express");

const controller = require("./controller");

const router = Router();

router.get("/", controller.getStudents); //express knows and automatically calls the function with the (req, res)

router.post("/", controller.addStudent);

router.get("/:id", controller.getStudentById);

router.put("/:id", controller.updateStudent);

router.delete("/:id", controller.removeStudent);

module.exports = router;
