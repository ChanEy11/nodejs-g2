const db = require("../config/db.config");
const {isEmpty}  = require("../config/helper");

const GetAll = (req, res) => {
    var sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
        if(err) {
            res.json({
                error : true,
                messege : err
            })
        }else {
            res.json({
                user : result
            })
        }
    })
}

const Create = (req, res) => {
    
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }else if(isEmpty(body.code)) {
            message.code = "param code required!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            name,code,description
        } = req.body;
        var sql = "INSERT INTO user (`name`,`code`,`description`) VALUES (?,?,?)";
        db.query(sql,[name,code, description],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Insert success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
};

const Edit = (req,res) => {
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }else if(isEmpty(body.code)) {
            message.code = "param code required!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            name,code,description
        } = req.body;
        var sql = "UPDATE user SET `name` = ?, `code` = ?, `description` = ?";
        sql += " WHERE code = ?"
        db.query(sql,[name,code, description],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Update success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
};

const Remove = (req,res) => {
    var body = req.body
    var message = {};
    if(body){
        if(isEmpty(body.id)){
            message.id = "param id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("DELETE FROM user WHERE id = ?",[body.id],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Remove success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
};

const AssignRole = (req, res) => {
    var {user_id, role_id} = req.body;
    if(body){
        if(isEmpty(user_id)){
            message.id = "param user id require!"
        }
        if(isEmpty(role_id)){
            message.id = "param role id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("INSERT INTO ueser_role (`user_id`, `role_id`) VALUES (?,?)", [body.user_id, body.role_id], (err, result) => {
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Insert success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
}

module.exports = {
  GetAll,
  Create,
  Edit,
  Remove,
  AssignRole
};