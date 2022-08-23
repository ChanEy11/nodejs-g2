const customer = (app) => {
    //const {GetAll, GetOne} = require("../controller/customer.controller")
    const customer_controller = require("../controller/customer.controller")
    app.get("/api/customer", customer_controller.GetAll)
    app.get("/api/customer/:id", customer_controller.GetOne)
    app.post("/api/customer", customer_controller.Create)
    app.delete("/api/customer", customer_controller.Delete)
}

module.exports = customer

