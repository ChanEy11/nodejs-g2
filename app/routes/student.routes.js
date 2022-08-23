const student = (app) => {
    const StudentController = require("../controller/student.controller");
    app.get("/api/student", (StudentController.GetList));
    app.get("api/student\:id", StudentController.GetOne);
}

module.exports = student;