const teacher = (app) => {
    const teacherController = require("../controller/teacher2.controller")
    app.post("/api/teacher2", teacherController.Create)
    app.get("/api/teacher2", teacherController.GetAll)
    app.get("/api/teacher2/:id", teacherController.GetList)
    app.delete("/api/teacher2", teacherController.Delete)
    app.put("/api/teacher2", teacherController.Edit)
}

module.exports = teacher