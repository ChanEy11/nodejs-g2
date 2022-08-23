const teacher = (app) => {
    //.Router() = for when we using router it will suggest the all the functions
    const router = require("express").Router();
    const teacherController = require("../controller/teacher.controller");

    // another way to us methods
    // const {
    //     GetLists,
    //     GetOne,
    //     Delete,
    //     Create,
    //     Edit
    // } = require("../controller/teacher.controller");
    // app.get("/api/teacher", GetLists);

    // router.get("/api/teacher", (req, res)=>{
    //      res.send("hii")
    // })
    
    router.get("/api/teacher", teacherController.GetLists)
    // have one more slash, this one has parameter because has :id
    router.get("/api/teacher/:id", teacherController.GetOne) // add route type params 
    router.post("/api/teacher", teacherController.Create)
    router.put("/api/teacher", teacherController.Edit)
    router.delete("/api/teacher", teacherController.Delete)

    // can also use this method too, no need to use app.use(router).
    // app.get("/api/teacher", (req, res)=>{
    //     console.log("hello")
    // })

    app.use(router); // router (configure route)
}

module.exports = teacher;