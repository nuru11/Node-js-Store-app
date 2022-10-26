const cartModel = require("../models/cart.model")
const validationResult = require("express-validator").validationResult

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        console.log(items + "jfdj")
        res.render("cart", {
            items: items,
           isUser: true,
           isAdmin: req.session.isAdmin
        })
    }).catch(err => console.log(err))
  
}

exports.postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name: req.body.name, 
            price: req.body.price,
            userId: req.session.userId,
            productId: req.body.productId,
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect("/")
        }).catch(err=>{
            console.log(err)
            res.redirect("/")
        })
    }else{
        req.flash("validationError", validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}