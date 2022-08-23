const express = require("express")
// body-parser uses it for when client searching by body-json ex:ID:1000
const bodyParser = require("body-parser");
const { Router, request } = require("express");
const app = express(); // declaring variable
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const port = 8087

//import routes
require("./app/routes/teacher.routes")(app)
require("./app/routes/student.routes")(app)
require("./app/routes/customer.routes")(app)
require("./app/routes/teacher2.routes")(app)
require("./app/routes/category.routes")(app)
require("./app/routes/course.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/classroom.routes")(app)
require("./app/routes/studentclassroom.routes")(app)
require("./app/routes/permission.routes")(app)
require("./app/routes/role.routes")(app)

// const Port = process.env.PORT || 8080
app.listen(8087,() => {
    console.log(`Server run on port : ${port}`)
})

// app.listen(port, ()=>{
//     console.log("server run on locahost:" + port)
// })
