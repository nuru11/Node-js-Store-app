const homeModels = require("../models/home.model")

exports.getProductById = (req,res,next) => {    

    const id = req.params.id

    homeModels.getProductByIdd(id).then(product => {
        res.render("product", {
            product: product,
            isUser: req.session.userId, 
            isAdmin: req.session.isAdmin,
            pageTitle: "Cart"
        })

    })
}