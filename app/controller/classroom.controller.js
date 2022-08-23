const db = require("../config/db.config")
const {isEmpty}  = require("../config/helper");

const GetAll = (req, res) => {
    var sqlGetAll = "SELECT" +
    "cr.*," +
    "c.name," +
    "CONCAT(t.firstname, ' ', t.lastname) AS teacher_name" +
    "FROM classroom AS cr" +
    "INNER JOIN course AS c ON cr.course_id = c.course_id" +
    "INNER JOIN teacher AS t ON cr.teacher_id = t.teacher_id"
    db.query(sqlGetAll, (err, result) => {
        if(!err) {
            res.json({
                classroom : result
            })
        }else {
            res.json({
                error : true,
                message : err
            })
        }
    }) 
}

const GetOne = (req, res) => {
    var id = req.params.id;
    var sqlGetOne = "SELECT * FROM classroom WHERE classroom_id = ?"
    db.query(sqlGetOne, [id], (err, result) => {
        if(err) {
            res.json({
                error : true,
                message : err
            })
        }else {
            res.json({
                classroom : result
            })
        }
    })
}

const Create = (req, res) => {
    var {
        course_id,
        teacher_id,
        course_price,
        course_generation,
        time_start,
        time_end,
        date_start,
        date_end,
        duration_h,
    } = req.body;
    var message = {}

    if(isEmpty(course_id)) {
        message.course_id = "Please enter course id"
    }

    if(isEmpty(teacher_id)) {
        message.teacher_id = "Please enter teacher id"
    }

    if(isEmpty(course_generation)) {
        message.course_generation = "Please enter course generation"
    }

    if(Object.keys(message).length > 0) {
        res.json({
            error : true,
            message : message
        })
    }else {
        var sqlCreate = "INSERT INTO classroom (course_id, teacher_id, course_price, course_generation, time_start, time_end, date_start, date_end, duration_h) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sqlCreate, [course_id, teacher_id, course_price, course_generation, time_start, time_end, date_start, date_end, duration_h], (err, result) => {
            if(!err) {
                if(result.affectedRows > 0) {
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
    var {
        classroom_id,
        course_id,
        teacher_id,
        course_price,
        course_generation,
        time_start,
        time_end,
        date_start,
        date_end,
        duration_h,
        status
    } = req.body;
    var message = {}

    if(isEmpty(classroom_id)) {
        message.classroom_id = "Please enter classroom id"
    }

    if(isEmpty(course_id)) {
        message.course_id = "Please enter course id"
    }

    if(isEmpty(teacher_id)) {
        message.teacher_id = "Please enter teacher id"
    }

    if(isEmpty(course_generation)) {
        message.course_generation = "Please enter course generation"
    }
    
    if(Object.keys(message) > 0) {
        res.json({
            error : true,
            message : message
        })
    }else {
        var sqlEdit = "UPDATE classroom SET course_id = ?, teacher_id = ?, course_price = ?, course_generation = ?, time_start = ?, time_end = ?, date_start = ?, date_end = ?, duration_h = ?, status = ?";
        db.query(sqlEdit, [course_id, teacher_id, course_price, course_generation, time_start, time_end, date_start, date_end, duration_h, status], (err, result) => {
            if(err) {
                res.json({
                    error : true,
                    message : err
                })
            }else {
                res.json({
                    message : "Updated successfully"
                })
            }
        })
    }
}

const Remove = (req, res) => {
    var body = req.body;
    var message = "";

    if(body.classroom_id == "" || body.classroom_id == null) {
        message = "Plese enter classroom id";
    }

    if(message != "") {
        res.json ({
            error : true,
            message : message
        })
    }else {
        var sqlGetOne = "DELETE FROM classroom WHERE classroom_id = ?"
        db.query(sqlGetOne, [body.classroom_id], (err, result) => {
            if(err) {
                res.json({
                    error : true,
                    message : err
                })
            }else {
                res.json({
                    message : "Deleted successfully"
                })
            }
        })
    }
    
}

module.exports = {
    GetAll,
    GetOne,
    Create,
    Edit,
    Remove
}