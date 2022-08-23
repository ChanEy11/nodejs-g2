const classroom = (app) => {
    const classroomcontroller = require("../controller/classroom.controller")
    app.get("/api/classroom", classroomcontroller.GetAll)
    app.get("/api/classroom/:id", classroomcontroller.GetOne)
    app.post("/api/classroom", classroomcontroller.Create)
    app.put("/api/classroom", classroomcontroller.Edit)
    app.delete("/api/classroom", classroomcontroller.Remove)
}

module.exports = classroom