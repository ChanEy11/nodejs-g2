const category = (app) => {
    const {validatetoken} = require("../controller/user.controller")
    const categoryController = require("../controller/category.controller");
    app.get("/api/category/", validatetoken, categoryController.GetList)
    app.post("/api/category", validatetoken, categoryController.Create)
    app.put("/api/category", validatetoken, categoryController.Edit)
    app.delete("/api/category", validatetoken, categoryController.Remove)
} 

module.exports = category