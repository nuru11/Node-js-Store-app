const validationResult = require("express-validator").validationResult
const homeModel = require("../models/home.model")
const ordersModel = require("../models/orders.model")
const cartModel = require("../models/cart.model")


const publishableKey = process.env.PUBLISHABLE_KEY
const secretKey = process.env.SECRET_KEY
const stripe = require("stripe")(secretKey)

exports.payment = (req, res, next)=> {
     console.log(secretKey)
     stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: req.session.name,
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '111111',
            city: 'addis ababa',
            state: 'addis',
            country: 'Ethiopia',
        }
    })
    .then((customer) => {
       console.log(customer)
        return stripe.charges.create({
            amount: 2500,     // Charging Rs 25
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  
        console.log("success")
        
    })
    .catch((err) => {
        res.send("err")     
        console.log(err)
    });
}


exports.admin = (req, res, next) => {
    res.render("add-product", {
        isUser: true,
        isAdmin: true,
        pageTitle: "Add-product"
    })
}


exports.addPost = (req, res, next) => {
   console.log("/******************/")
   console.log(req.file.filename)
   homeModel.addProduct({name: req.body.name, 
    price: req.body.price,
     category:req.body.category, 
    description: req.body.description,
     image: req.file.filename
    }).then(()=>{
   console.log("done")
   res.redirect("/")
   })
}


exports.getOrdersbyUserId = (req, res, next) => {
    ordersModel.getOrdersbyUserId(req.session.email).then((item)=>{
        res.render("orders", {
            item: item,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: "Orders",
            key: publishableKey
        })
    })
    
}

exports.postOrders = (req, res, next) => {
    console.log(req.body)

    function x(){
        let today = new Date()
        let d = String(today.getDate()).padStart(2, '0')
        let m = String(today.getMonth() + 1).padStart(2, '0')
        let y = today.getFullYear()
        return `${d}/${m}/${y}`
    }

    ordersModel.addOrders({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        userId: req.body.userId,
        productId: req.body.productId, 
        username: req.session.name,
        email: req.session.email,
        address: req.body.address,
        timestamp: Date.now(),
        time: x() 
    }).then(()=>{
        cartModel.deleteItems(req.body.cartId).then(()=>{
            res.redirect("/admin/orders")
        })
    }).catch(err=>{
        res.redirect("/cart")
        req.flash("addressError", err)
        console.log(err)
    })
}

exports.manageOrders = (req, res, next) => {
   ordersModel.getOrdersForAdmin().then((item)=>{
    res.render("manage-orders", {
        item: item,
        isAdmin: true,
        isUser: true,
        pageTitle: "Manage-orders"
    })
   })
}

exports.deleteOrder = (req,res,next)=>{
  
    ordersModel.deleteOrders(req.body.id).then(()=>{
        res.redirect(req.body.deleteOrder)
    }).catch(err=>{
        console.log(err)
    })
}