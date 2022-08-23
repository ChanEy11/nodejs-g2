const db = require("../config/db.config")
const {isEmpty} = require("../config/helper")

const GetAll = (req, res) => {
    var sqlGetAll = "SELECT * FROM studentclassroom";
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

const Create = (req, res) => {
    var {
        classroom_id,
        student_id,
        course_price,
        discount,
        discount_type,
        price,
        payment_price,
        payment_method,
        description
    } = req.body;
    var message = {}
    if(isEmpty(classroom_id)) {
        message = "Classroom id is required"
    }else if(isEmpty(student_id)) {
        message = "Student id is required"
    }else if(isEmpty(course_price)) {
        message = "Course price is required"
    }
    if(discount > 0) {
        if(discount_type == "DISCOUNT_PERCENT") {
            price = price - (course_price * discount/100)
        }else if(discount_type == "DISCOUNT_PRICE") {
            price = price - discount
        }
    }
    var sqlCreate = "INSERT INTO studentclassroom (classroom_id, student_id, course_price, discount, discount_type, price, payment_price, payment_method, description VALUES (?,?,?,?,?,?,?,?,?)"
    db.query(sqlCreate, [classroom_id, student_id, course_price, discount, discount_type, price, payment_price, payment_method, description], (err, result) => {
        
    })
}

const Edit = (req, res) => {
    
}

const Remove = (req, res) => {
    
}

module.exports = {
    GetAll,
    Create,
    Edit,
    Remove
}