const homeModel = require("../models/home.model")

const jsonProducts = require("../books.json")


exports.getHome = (req,res,next) => {
   homeModel.getAllProduct().then(products=>{
        res.render("index", {
            products: products,
            isUser: req.session.userId, 
            isAdmin: req.session.isAdmin
        })
       
     })

    /* res.render("index", {
        products: jsonProducts,
     })*/

   /*  let category = req.query.category
    let validCategory = ['clothes', 'phones', 'computers']
    let productsPromise;
    if(category && validCategory.includes(category)) productsPromise =  productsModel.getProductsByCategory(category)
     else productPromise = ProductModel.getAllProduct()
     productsPromise.then(products=>{
      res.render("index", {
         products: products
      })
     })*/
     
}