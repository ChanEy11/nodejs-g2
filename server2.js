const express = require("express")
const bodyParser = require("body-parser")
const app = express();
// this library makes us can recieve data from client
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const port = 8080

// app.get("/",(req,res)=>{
//     res.end("Hello node server")
// })

// app.post() insert data to database 
// app.put() for update
// app.delete() for delete 
// req, res can be replaced with other variable

app.get("/api/teacher", (req, res)=>{
    var obj = {}
    obj.method = req.method // to see what method that client requests
    obj.url = req.url
    obj.path = req.path // the same as url
    obj.ip = req.ip
    obj.hostname = req.hostname
    obj.original = req.original // the same as url and path
    // if using res.json no need to use console.log and res.end()
    //res.json(obj)
    console.log(obj)
    res.end(); // oy deng tha vea job if not it is not reponse back to client 
})

app.post("/api/teacher", (req, res)=>{
    var obj = {}
    obj.body = req.body
    res.json(obj)
})

app.put("/api/teacher", (req, res)=>[
    res.send("put teacher")
])

app.delete("/api/teacher", (req, res)=>{
    res.send("delete teacher")
})

// app.get("/api/teacher",(req,res)=>{
//     var arr_teacher = [
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         },
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         },
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         },
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         },
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         },
//         {
//             id : 1,
//             name : "Sok",
//             email : "sok@gmail.com"
//         }
//     ]
//     var data  = {
//         teacher : arr_teacher
//     }
//     res.json(data)
// })

// const Port = process.env.PORT || 8080
// app.listen(8080,() => {
//     console.log(`Server run on port : ${port}`)
// })