const db = require("../config/db.config");
const {isEmpty, config} = require("../config/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validatetoken = (req, res, next) => {
    var Authtoken = req.headers["authorization"] //take headers
    if(Authtoken) { //if there is authtoken headers
        Authtoken = Authtoken.split(" ")
        var token = Authtoken[1]; //if [0] it will take the word bareer
        jwt.verify(token, config.local_token, (err, obj_info) => { //config.local_token stores token in helper file
            if(!err) { 
                // console.log(obj_info)
                req.user = obj_info.user //sending user info tam creating a req.user that stores obj_info.user
                next(); //using this to process the next task
            }else {
                res.json({
                    error : true,
                    message : "Invalid token"
                })
            }
        })
    }else {
        res.json({
            error : true,
            message : "Please fill in token"
        })
    }
}

const CreateUser = (req, res) => {
    var {
        username,
        password,
        tel,
        email
    } = req.body; // declare var so that we can change the value later
    var message = {};
    if(isEmpty(username)) {
        message.username = "Please fill in username";
    }
    if(isEmpty(password)) {
        message.password = "Please fill in password";
    }else if(password.length < 4 || password.length > 24) {
        message.password = "Password must be between 4-24 characters";
    }

    if(Object.keys(message).length > 0) {
        res.json({
            error : true,
            message : message
        })
    }else {
        password = bcrypt.hashSync(password, 10); //encrypting password
        var sqlCheckUser = "SELECT COUNT (user_id) as Total_Record FROM user WHERE username = ?"
        db.query(sqlCheckUser, [username], (err, result) => {
            if(!err) {
                if(result[0] && result[0].Total_Record != 0) { // user exist
                    res.json({
                        error : true,
                        message : "User already exist"
                    })
                }else {
                    var sqlChecker = "INSERT INTO user (username, password, tel, email) VALUES (?,?,?,?)";
                    db.query(sqlChecker, [username, password, tel, email], (err, result) => {
                        if(!err) {
                            res.json({
                                message : "User is created successfully"
                            })
                        }else {
                            res.json({
                                error : true,
                                message : err
                            })
                        }
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

const Login = (req, res) => {
//     const {
//         username,
//         password
//     } = req.body;
//     var message = {};
//     if(isEmpty(username)) {
//         message.username = "Please fill in username";
//     }
//     if(isEmpty(password)) {
//         message.password = "Please fill in password";
//     }else if(password.length < 4 || password.length > 24) {
//         message.password = "Password must be between 4-24 characters";
//     }

//     if(Object.keys(message).length > 0) {
//         res.json({
//             error : true,
//             message : message
//         })
//     }else {
//         var sql = "SELECT u.user_id, u.username, r.name as role_name, u.password, u.tel, u.email, u.create_at FROM user as u";
//         sql += "INNER JOIN user_role as ur ON u.user_id = ur.user_id";
//         sql += "INNER JOIN role as r ON ur.role_id = r.id";
//         sql += "WHERE u.username = ? AND u.status = 1"
//         db.query(sql, [username], (err, result) => { //checking for username
//             if(!err) {
//                 if(result.length == 0) { //user does not exist
//                     res.json({
//                         error : true,
//                         message : "Username does not exist"
//                     })
//                 }else {
//                     var dataPassword = result[0].password; //password from table
//                     if(bcrypt.compareSync[password, dataPassword]) { //checking for password (123444, sjnfjksnuihuenuweh)
//                         //giving user result without giving password
//                         var data = result[0];
//                         delete data.password;
//                         var sqlpermission = "SELECT" +
//                         "p.code " +
//                         "FROM user as u " +
//                         "INNER JOIN ueser_role as ur ON u.user_id = ur.user_id " +
//                         "INNER JOIN role as r ON ur.role_id = r.id " +
//                         "INNER JOIN role_permission as rp ON r.id = rp.role_id " +
//                         "INNER JOIN permission as p on rp.permission_id = p.id " +
//                         "WHERE u.username = ?";
//                         db.query(sqlpermission, [data.username], (err1, result1) => {
//                             if(!err1) {
//                                 const access_token = generateAccessToken({user:data, Permissions:result}) //can't use data 
//                                 //loop for array
//                                 var permission = result1.map((item, index) => {
//                                     return item.code
//                                 })
//                                 res.json({
//                                     message : "Login successfully",
//                                     access_token : access_token,
//                                     user : data,
//                                     //Permissions : result1
//                                     //to make it more easy to see
//                                     Permission : permission 
//                                 })
//                             }else {
//                                 res.json({
//                                     error : true,
//                                     message : err1
//                                 })
//                             }
//                         })
//                     }else {
//                         res.json({
//                             error : true,
//                             message : "Password is incorrect"
//                         })
//                     }
//                 }
//             }
//         })
//     }
    const {
        username,
        password
    } = req.body;
    var message = {};
    if(isEmpty(username)){
        message.username = "Please fill in username";
    }
    if(isEmpty(password)){
        message.password = "Please fill in password";
    }else if(password.length < 4 || password.length > 24){
        message.password = "Password must be between 4-24 characters";
    }

    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        // - check username is exist
        var sql = "SELECT u.user_id , u.password, u.username, l.name  as role_name, u.tel, u.email,u.create_at FROM user as u ";
        sql += " INNER JOIN ueser_role as ur on u.user_id = ur.user_id"
        sql += " INNER JOIN role as l on ur.role_id = l.id"
        sql += " WHERE u.username = ? AND u.status = 1"
        db.query(sql,[username],(err,result)=>{
            if(!err){
                if(result.length == 0){
                    res.json({
                        error:true,
                        message : "Username does not exist!"
                    })
                }else{
                    // check password
                    var dataPassword = result[0].password; // pass from table
                    if(bcrypt.compareSync(password,dataPassword)){ ///123456 , "djal;djfqoiujpoalsjdf;laj;dlsfjal;dfj"
                        var data = result[0];
                        delete data.password;
                        var sqlPermission = "SELECT "+
                        " p.code " +
                        " FROM user as u  " +
                        " INNER JOIN ueser_role as ur on u.user_id = ur.user_id " +
                        " INNER JOIN role as r on ur.role_id = r.id " +
                        " INNER JOIN role_permission as rp on r.id = rp.role_id " +
                        " INNER JOIN permission as p on rp.permission_id = p.id " +
                        " WHERE u.username = ? ; " 
                        db.query(sqlPermission,[data.username],(err1,result1)=>{
                            if(!err1){
                                var permission = result1.map((item,index)=>{
                                    return item.code
                                })
                                const access_token = generateAccessToken({user:data,permission:permission})
                                res.json({
                                    message : "Login success!",
                                    access_token : access_token,
                                    user:data,
                                    permission : permission
                                })
                            }else{
                                res.json({
                                    error:true,
                                    message : err1
                                })
                            }
                            
                        })
                        
                        
                    }else{
                        res.json({
                            error:true,
                            message : "Password incorrect!"
                        })
                    }
                }
            }else{
                res.json({
                    error:true,
                    message :err
                })
            }
        })
    }
}

const generateAccessToken = (obj_info) => { //obj_info is user:data
    return jwt.sign(obj_info, config.local_token, {expiresIn:"1h"})
}

const ChangeStatusUser = () => {
    var user_id = req.body && req.body.user_id;
    var status = req.body && req.body.status;
    if(isEmpty(user_id)) {
        res.json({
            error : true,
            message : "User id is required"
        })
    }else if (isEmpty(status)) {
        res.json({
            error : true,
            message : "Status is required"
        })
    }else {
        db.query("UPDATE user SET status = ? WHERE user_id = ?", [status, user_id], (err, result) => {
            if(!err) {
                res.json({
                    message : "User is Updated successfully"
                })
            }else {
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
}

module.exports = {
    CreateUser,
    Login,
    ChangeStatusUser,
    validatetoken
}