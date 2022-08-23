const  {    
    CreateUser,
    Login,
    ChangeStatusUser
} = require("../controller/user.controller")

const user = (app) => {
    app.post("/api/user/CreateUser", CreateUser)
    app.post("/api/user/Login", Login)
    app.post("/api/user/ChangeStatusUser", ChangeStatusUser)

}

module.exports = user