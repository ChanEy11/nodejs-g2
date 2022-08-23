const studentclassroom = (app) => {
    const {
        GetAll,
        Create,
        Edit,
        Remove
    } = require("../controller/studentclassroom.controller")
    const { validatetoken } = require("../controller/user.controller")
    app.post("/api/studentRegister/GetAll",validatetoken, GetAll)
    app.post("/api/studentRegister/Create",validatetoken, Create)
    app.post("/api/studentRegister/Edit",validatetoken, Edit)
    app.post("/api/studentRegister/Remove",validatetoken, Remove)
}

module.exports = studentclassroom