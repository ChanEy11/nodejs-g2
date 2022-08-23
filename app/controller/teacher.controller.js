const teacher = [
    {
        id : 100,
        name : "chan",
        email : "chan@gmail.com"
    },
    {
        id : 200,
        name : "cha",
        email : "chan@gmail.com"
    }
]

const GetLists = (req, res)=>{
    res.json({
        list : teacher
    })

    // var record = teacher.length;
    // res.send ({
    //     record : record
    // })
}

const GetOne = (req, res) => {
  // console.log(req.query);
  // console.log(req, body);
    var params = (req, params); // getting parameters that user search 
    var list = teacher.filter((item,index) => (item.name == params.id || item.id == params.id))

    res.json({
        list : list
    })
   
}

const Create = (req, res)=>{
    //res.send("Create Teacher")
    // when users request to api pel del jea body json
    var body = req.body // req.body ber yerng bos jea body json
    // res.json({
    //     body : body
    // })

    // push one more obj to array 
    // teacher.push(body)
    // res.send({
    //     messenge : "Add succesfully"
    // })

    // putting condition before inserting into array 
    var message = ""; 
    if (body.id == null || body.id == "") {
        message = "id is required";
    }else if (body.name == null || body.name == "") {
        message = "name is required";
    }else if (body.email == null || body.email == "") {
        message = "name is required";
    }
    
    // if there is no message means that it goes with the condition 
    if (message == "") {
        teacher.push(body)
        res.json({
            message : "Add Sucessfully"
        })
        // check for existing id
        var list = teacher.filter((item, index)=>item.id == body.id);
        if (list.length != 0) {
            res.json({
                error : true,
                message : "Teacher id is already exist ! please try other id"
            })
        }else {
            teacher.push(body)
            res.json({
                message : "Add sucessfully"
            })
        }
    }else {
        res.json({
            error : true,
            message : message
        })
    }
}

const Edit = (req, res)=>{
    res.send("Edit Teacher")
}

const Delete = (req, res)=>{
    res.send("Delete Teacher")
}

// exxports function for that we can use it when we call function
module.exports = {
    GetLists,
    Create,
    Edit,
    Delete,
    GetOne
}
