const cartModel = require("../models/cart.model")
const validationResult = require("express-validator").validationResult 

exports.getCart = (req, res, next) => {
    console.log(req.flash("postCartValidationError"))
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render("cart", {
            items: items,
           isUser: true,
           isAdmin: req.session.isAdmin,
           postCartValidationError: req.flash("postCartValidationError")[0],
           addressError: req.flash("addressError"),
           pageTitle: "Cart",
        })
    }).catch(err => console.log(err))
  
}

exports.postCart = (req, res, next) => {
   
    
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem(req.body.name, req.body.price, req.body.productId, req.session.userId, req.body.amount, Date.now()).then(()=>{
            res.redirect("/")
        }).catch(err=>{
            console.log(err)
           res.redirect("/")
        })
    }else{
        req.flash("postCartValidationError", validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.deleteItems = (req, res, next) => {
    cartModel.deleteItems(req.body.cartId).then(()=>{
        res.redirect("/cart")
    })
}

exports.deleteAll = (req, res, next) => {
  
    cartModel.delteAll(req.session.userId).then(()=>{
        res.redirect("/")
    }).catch(err=>{
        res.redirect("/cart")
        console.log(err)
    })
}