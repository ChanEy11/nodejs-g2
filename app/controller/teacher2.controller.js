const db = require("../config/db.config");

const Create = (req, res) => {
    var body = {
        firstname,
        lastname,
        gender,
        tel, 
        email,
        description
    } = req.body

    var message = "";
    if (body.firstname == "" || body.firstname == null) {
        message = "firstname is required"
    }else if (body.lastname == "" || body.lastname == null) {
        message = "lastname is required"
    }else if (body.gender == "" || body.gender == null) {
        message = "gender is required"
    }

    if (message == "") {
        var sql = "INSERT INTO `teacher` (`firstname`, `lastname`, `gender`, `tel`, `email`, `description`) VALUES (?,?,?,?,?,?)"
        db.query(sql, [firstname, lastname, gender, tel, email, description], (error, result) => {
            if(error) {
                res.json({
                    message : error
                })
            }else {
                res.json({
                    message : "Inserted Successfully",
                    list : result
                })
            }
        })
    }else {
        res.json({
            teacher : message
        })
    }
}

const GetAll = (req, res) => {
    var sql = "SELECT * FROM `teacher`"
    db.query(sql, (error, result) => {
        if(error) {
            res.json({
                err : error
            })
        }else {
            res.json({
                teacher : result
            })
        }
    })
}

const GetList = (req, res) => {
    var id = req.params.id
    var sql = "SELECT * FROM `teacher` WHERE teacher_id = ?"
    db.query(sql, [id], (error, result) => {
        if(error) {
            res.json({
                err : error
            })
        }else {
            res.json({
                teacher : result
            })
        }
    })
}

const Delete = (req, res) => {
    var body = req.body;
    var message = "";

    if (body.teacher_id == "" || body.teacher_id == null) {
        message = "Id is required"
    }

    if (message == "") {
        var sql = "DELETE FROM `teacher` WHERE teacher_id = ?"
        db.query(sql, [body.teacher_id], (error, result) => {
            if(error) {
                res.json({
                    err : error
                })
            }else {
                res.json({
                    message : "Deleted Successfully"
                })
            }
        })
    }else {
        res.json({
            teacher : message
        })
    }
}

const Edit = (req, res) => {
    var body = req.body;
    var message = "";

    if (body.teacher_id == "" || body.teacher_id == null) {
        message = "Id is required"
    }else if (body.firstname == "" || body.firstname == null) {
        message = "firstname is required"
    }else if (body.lastname == "" || body.lastname == null) {
        message = "lastname is required"
    }else if (body.gender == "" || body.gender == null) {
        message = "gender is required"
    }

    if (message == "") {
        var sql = "UPDATE `teacher` SET `firstname`='?',`lastname`='?',`gender`='?',`tel`='?',`email`='?',`description`='?' WHERE teacher_id = ?;"
        db.query(sql, [body.firstname, body.lastname, body.gender, body.tel, body.email, body.description, body.teacher_id], (error, result) => {
            if(error) {
                res.json({
                    err : error
                })
            }else {
                res.json({
                    message : "Updated Successfully"
                })
            }
        })
    }else {
        res.json({
            teacher : message
        })
    }

}


module.exports = {
    Create,
    GetAll,
    GetList,
    Delete,
    Edit
}