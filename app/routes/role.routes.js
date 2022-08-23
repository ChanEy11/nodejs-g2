const role = (app) => {
    const {
        GetAll,
        Create,
        Edit,
        Remove,
        AssignRolePermission
    } = require("../controller/role.controller")
    const { validatetoken } = require("../controller/user.controller")
    app.post("/api/role/GetAll",validatetoken, GetAll)
    app.post("/api/role/Create",validatetoken, Create)
    app.post("/api/role/Edit",validatetoken, Edit)
    app.post("/api/role/Remove",validatetoken, Remove)
    app.post("/api/role/AssignRolePermission",validatetoken, AssignRolePermission)
}

module.exports = role