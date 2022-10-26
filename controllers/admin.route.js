const productsModel = require("../models/products.models")
const validationResult = require("express-validator").validationResult

exports.admin = (req, res, next) => {
    res.render("add-product", {
        isUser: true,
        isAdmin: true
    })
}

exports.addPost = (req, res, next) => {
    console.log(validationResult(req).array())
}