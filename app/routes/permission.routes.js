const permission = (app) => {
    const {
        GetAll,
        Create,
        Edit,
        Remove
    } = require("../controller/permission.controller")
    const { validatetoken } = require("../controller/user.controller")
    app.post("/api/permission/GetALl", validatetoken, GetAll)
    app.post("/api/permission/Create", validatetoken, Create)
    app.post("/api/permission/Edit", validatetoken, Edit)
    app.post("/api/permission/Remove", validatetoken, Remove)
}

module.exports = permission