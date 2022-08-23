const course = (app) => {
    const coursecontroller = require("../controller/course.controller")
    app.get("/api/course/:id", coursecontroller.GetOne)
    app.get("/api/course", coursecontroller.GetAll)
    app.post("/api/course", coursecontroller.Create)
    app.put("/api/course", coursecontroller.Edit)
    app.delete("/api/course", coursecontroller.Remove)
}

module.exports = course