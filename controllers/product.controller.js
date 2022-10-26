const homeModels = require("../models/home.model")
/*
exports.getProduct = (req,res,next) => {
    productsModels.getFirstProduct().then(product=>{
        res.render("product", {
            product: product
        })
    })
}*/

exports.getProductById = (req,res,next) => {    

    const id = req.params.id

    homeModels.getProductByIdd(id).then(product => {
        res.render("product", {
            product: product,
            isUser: req.session.userId, 
            isAdmin: req.session.isAdmin
        })
        console.log(product) 
    })
}