const user = (app) => {
    const {
        GetAll,
        Create,
        Edit,
        Remove,
        AssignRole
    } = require("../controller/user2.controller")
    const { validatetoken } = require("../controller/user.controller")
    app.post("/api/user/GetAll",validatetoken, GetAll)
    app.post("/api/user/Create",validatetoken, Create)
    app.post("/api/user/Edit",validatetoken, Edit)
    app.post("/api/user/Remove",validatetoken, Remove)
    app.post("/api/user/AssignRole",validatetoken, AssignRole)
}
module.exports = user;