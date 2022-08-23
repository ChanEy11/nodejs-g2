const db = require("../config/db.config");

const GetOne = (req, res) => {
    var id = req.params.id;
    var sql = "SELECT * FROM course WHERE course_id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.json ({
                error : true,
                message : err
            })   
        }else {  
            res.json({
                course : result
            })
        }
    })
}

const GetAll = (req, res) => {
    var sql = "SELECT *, DATE_FORMAT(create_at, '%d-%m-%Y %h:%i %p') AS create_at FROM course"
    db.query(sql, (err, result) => {
        if(err) {
            res.json({
                error : true,
                message : err
            })
        }else {
            res.json({
                Course : result
            })
        }
    })
}

const Create = (req, res) => {
    var {
        category_id,
        Name,
        full_price,
        description
    } = req.body
    var message = ""

    if(category_id == null || category_id == "") {
        message = "Id is required"
    }else if(Name == null || Name == "") {
        message = "Name is required"
    }else if(full_price == null || full_price == "") {
        message = "Full price is required"
    }

    if (message != "") {
        res.json({
            message : message
        })
    }else{
        var sql = "INSERT INTO `course`(`category_id`, `Name`, `full_price`, `description`) VALUES (?,?,?,?)"
        db.query(sql, [category_id, Name, full_price, description], (err, result) => {
            if(!err) {
                if(result.affectedRows != 0) {
                    res.json({
                        message : "Created successfully"
                    })
                }
            }else {
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
}

const Edit = (req, res) => {
    var body = {
        course_id,
        category_id,
        Name,
        full_price,
        description
    } = req.body
    var message = ""

    if(course_id == null || course_id == "") {
        message = "Course id is required"
    }else if(category_id == null || category_id == "") {
        message = "Category id is required"
    }else if(Name == null || Name == "") {
        message = "Name is required"
    }else if(full_price == null || full_price == "") {
        message = "Full price is required"
    }
   
    if(message == "") {
        var sql = "UPDATE course SET category_id = ?, Name = ?, full_price = ?, description = ?, update_at = NOW() WHERE course_id = ?"
        db.query(sql, [category_id, Name, full_price, description, course_id], (err) => {
            if(err) {
                res.json({
                    message : err
                })
            }else {
                res.json({
                    message : "Updated successfully"
                })
            }
        })
    }else {
        res.json({
            message : message
        })
    }
}

const Remove = (req, res) => {
    var body = {
        course_id,
        category_id,
        Name,
        full_price,
        description
    } = req.body
    var message = ""

    if(course_id == null || course_id == "") {
        message = "Id is required"
    }

    if(message == "") {
        var sql = "DELETE FROM course WHERE course_id = ?"
        db.query(sql, [course_id], (err, result) => {
            if(err) {
                res.json({
                    message : err
                })
            }else {
                res.json({
                    message : "Deleted successfully"
                })
            }
        })
    }else {
        res.json({
            message : message
        })
    }
}

module.exports = {
    GetOne,
    GetAll,
    Edit,
    Create,
    Remove
}