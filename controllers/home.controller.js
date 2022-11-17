const homeModel = require("../models/home.model")

exports.getHome = (req,res,next) => {
   console.log(req.session)
   console.log(req.flash("postCartValidationError"))
    homeModel.getAllProduct().then(products=>{
        res.render("index", {
            products: products,
            isUser: req.session.userId, 
            isAdmin: req.session.isAdmin,
            postCartValidationError: req.flash("postCartValidationError"),
            pageTitle: "Home"
        })
       
     })
/*
    let category = req.query.category
    let validCategory = ['clothes', 'phones', 'computers']
    let productsPromise;
    if(category && validCategory.includes(category)) productsPromise =  productsModel.getProductsByCategory(category)
     else productPromise = ProductModel.getAllProduct()
     productsPromise.then(products=>{
      res.render("index", {
         products: products,
         isUser: req.session.userId, 
         isAdmin: req.session.isAdmin,
         postCartValidationError: req.flash("postCartValidationError"),
         pageTitle: "Home"
      })
     })
  */   
}