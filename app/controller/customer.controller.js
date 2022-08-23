const { response } = require("express")
const db = require("../config/db.config")

const GetAll = (req, res) => {
    var sql = "SELECT * FROM customer;"
    // execute query sql
    db.query(sql, (err, result, field)=>{
        if (err) {
            res.send(err)
        }else{
            res.json({
                customer : result
            })
        }
    })
}

const GetOne = (req, res) => {
    //params = if there is one params, it will return one and two return two 
    var id = req.params.id;
    var sql = "SELECT * FROM customer WHERE id = ?"
    // can also use (err, res, field) = if we dont need field no need to use 
    db.query(sql, [id], (err, result)=>{
        if (err) {
            res.json ({
                error : true,
                data_error : err
            })   
        }else {  
            res.json({
                customer : result
            })
        }
    })
}

const Create = (req, res) => {
    var body = req.body;
    // in order not to write body. too much 
    // const {
    //     firstname, 
    //     lastname, 
    //     gender,
    //     dob,
    //     tel,
    //     address_id
    // } = body
    var message = ""; // var message = {}

    if (body.firstname == null || body.firstname == "") { // firstname == null || firstname == ""
                                                         // message.key = "firstname is required"
        message = "Firstname is required"
    }else if (body.lastname == null || body.lastname == "") {
        message = "Lastname is required"
    }else if (body.address_id == null || body.address_id == "") {
        message = "Address is required"
    }

    if (message != "") {
        res.json({
            error : true,
            message : message
        })
    }else {
        var sqlInsert = "INSERT INTO `customer`(`firstname`, `lastname`, `gender`, `dob`, `tel`, `address_id`) VALUES (?,?,?,?,?,?)"
        db.query(sqlInsert, [body.firstname, body.lastname, body.gender, body.dob, body.tel, body.address_id], (err, result, field)=>{
            if (err) {
                res.json({
                    error : true,
                    message : err
                })
            }else {
                res.json({
                    message : "Insert successfully",
                    field : field,
                    list : result
                })
            }
        })
    }
}

const Delete = (req, res) => {
    if (req.body.id == null || req.body.id == "") {
        res.json({
            error : true,
            message : "params id is required"
        })
    }else {
        var sqlDelete = "DELETE FROM customer WHERE id = ?"
        db.query(sqlDelete,[req.body.id], (err, result, field)=>{
            if(err) {
                res.json ({
                    error : true,
                    message : err
                })
            }else {
                res.json({
                    message : "Delete successfully !"
                })
            }
        })
    }
}

const Edit = (req, res) => {

}

module.exports = {
    GetAll,
    GetOne,
    Create,
    Delete
}