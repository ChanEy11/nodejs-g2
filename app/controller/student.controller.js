const student = [
    {
        id : 1,
        firstname : "heng",
        lastname : "chaney",
        gender : "female",
        tel : "012934309"
    },
    {
        id : 2,
        firstname : "heng",
        lastname : "chaney",
        gender : "female",
        tel : "012934309"
    },
    {
        id : 3,
        firstname : "heng",
        lastname : "chaney",
        gender : "female",
        tel : "012934309"
    }
]

const GetList = (req, res)=>{
    res.json({
        result : student
    })
}
 
const GetOne = (req, res)=>{
    var params = (req, params);
    // validation to know if requested item the same as data in student
    var list = student.filter((item, index) => (item.id == params.id || item.name == params.name))
    res.json({
        list : list
    })
}

const Create = (req, res)=>{
    var body = req.body;

    var message = "";
    if (body.id == null || body.id == "") {
        message = "id is required"
    }else if (body.firstname == null || body.firstname == "") {
        message = "firstname is required"
    }else if (body.lastname == null || body.lastname == "") {
        message = "lastname is required"
    }else if (body.gender == null || body.gender == "") {
        message = "gender is required"
    }else if (body.tel == null || body.tel == "") {
        message = "telephone is required"
    }

    if (message == "") {
        student.push(body)
        res.json({
            message : "Add successfully"
        })
        var list = student.filter((item, index)=>(item.id == body.id));
        if (list.length != 0) {
            res.json ({
                error : true,
                message : "student id is already exist"
            })
        }else {
            student.push(body)
            res.json({
                message : "Added successfully"
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
    var body = req.body;

    var message = "";
    if (body.id == null || body.id == "") {
        message = "id is required"
    }else if (body.firstname == null || body.firstname == "") {
        message = "firstname is required"
    }else if (body.lastname == null || body.lastname == "") {
        message = "lastname is required"
    }else if (body.gender == null || body.gender == "") {
        message = "gender is required"
    }else if (body.tel == null || body.tel == "") {
        message = "telephone is required"
    }

    if (message == "") {
        var list = student.filter((item, index)=>item.id == body.id)
        if (list.length != 0) { // id exist 
            var listtemp = student.map((item, index)=>{
                item = {
                    id : 1,
                    firstname : "heng",
                    lastname : "chaney",
                    gender : "female",
                    tel : "012934309"
                }
                if (item.id == body.id) {
                    return {
                        ...item,
                        firstname : body.firstname,
                        lastname : body.lastname,
                        gender : body.gender,
                        tel : body.tel
                    }
                }
                return {
                    ...item
                }
            })
            teacher = listtemp
            res.json ({
                message : "Updated successfully"
            })
        }
    }  
}

const Delete = (req, res)=>{
    var body = body.params;
    var message = "";
    if (body.id == null || body.id == "") {
        message = "id is required"
    }
    if (message == "") {
        var listTmp = student.filter((item, index)=>(item.id == body.id))
        teacher = listTmp
        res.json ({
            message : "Deleted successfully"
        })
    }
}

module.exports = {
    GetList,
    GetOne,
    Create,
    Edit,
    Delete
}