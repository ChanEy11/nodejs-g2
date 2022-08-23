const db = require("../config/db.config");

const GetList = (req, res) => {
    var sql = "SELECT * , DATE_FORMAT(create_at, '%d-%m-%Y %h:%i %p') AS create_at FROM category";
    db.query(sql, (err, result) => {
        if(err) {
            res.json({
                error : true,
                messege : err
            })
        }else {
            res.json({
                category : result
            })
        }
    })
}

const Create = (req, res) => {
    var {
        Name,
        parent,
        image,
        sort_order,
        Status,
        create_at,
        modify_at
    } = req.body;

    var message = "";
    if(Name == null || Name == "") {
        message = "Name is required"
    }else if(image == null || image == "") {
        message = "Image is required"
    }

    if(message == "") {
        var sql = "INSERT INTO category (Name, parent, image, sort_order) VALUES (?,?,?,?)"
        db.query(sql, [Name, parent, image, sort_order], (err, result) => {
            if(err) {
                res.json({
                    error : true,
                    message : err
                }) 
            }else {
                if(result.affectedRows != 0) {
                    res.json({
                        message : "Created successfully"
                    })
                }
            }
        })
    }else {
        res.json({
            message : message
        })
    }
}

const Edit = (req, res) => {
    var body = {
        category_id,
        Name,
        parent,
        image,
        sort_order,
    } = req.body;

    var message = "";
    if(body.category_id == null || body.category_id == "") {
        message = "category id is required"
    }else if(body.Name == null || body.Name == "") {
        message = "Name is required"
    }else if(body.image == null || body. image == "") {
        message = "Image is required"
    }

    if(message == "") {
        var sql = "UPDATE category SET Name = ?, parent = ?, image = ?, sort_order = ?, modify_at = NOW() WHERE category_id = ?"
        //sql += "WHERE category_id = ?" can also be like this
        db.query(sql, [Name, parent, image, sort_order, category_id], (err, result) => {
            if(err) {
                res.json({
                    error : true,
                    message : err
                })
            }else {
                res.json({
                    message : "Updated Successfully"
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
        category_id
    } = req.body;
    var message = ""

    if(category_id == null || category_id == "") {
        message = "Id is required"
    }

    if (message != "") {
        res.json({
            message : message
        })
    }else {
        var sql = "DELETE FROM category WHERE category_id = ?"
        db.query(sql, [category_id], (err, result) => {
            if(!err) {
                res.json({
                    message : "Deleted successfully"
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
    GetList,
    Create,
    Edit,
    Remove
}