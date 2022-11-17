const authModel = require("../models/auth.model")

const validationResult = require("express-validator").validationResult;

exports.getSignup = (req,res,next) => {

res.render("signup",{
    authError: req.flash("authError"),
    validationError: req.flash("validationError"),
    isUser: false,
    isAdmin: false,
    pageTitle: "Signup"
})
}

exports.postSignup = (req,res,next) => {
       if(validationResult(req).isEmpty()){
       authModel
       .createNewUser(req.body.username, req.body.email, req.body.password)
       .then(()=> res.redirect("/login"))
       .catch(err=> {
         req.flash("authError", err)
         console.log(err)
         res.redirect("/signup")
     })
    }else{
        req.flash("validationError", validationResult(req).array())
        res.redirect("/signup")
    }
      
}

exports.postLogin = (req,res,next) => {
     if(validationResult(req).isEmpty()) {
    authModel.login(req.body.password, req.body.email)
    .then(result=> {
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin;
        req.session.email = result.email;
        req.session.name = result.name
        res.redirect("/")
       }).catch(err=>{
        req.flash("loginError", err)
        console.log(err)
        
    })
}else{
    req.flash("loginValidationResult", validationResult(req).array())
    res.redirect('/login')
}
}


exports.getLogin = (req,res,next) => {
    res.render("login", {
        loginError: req.flash("loginError"),
        loginValidationResult: req.flash("loginValidationResult"),
        isUser: false,
        isAdmin: false,
        pageTitle: "Login"
    })
   
}


exports.logout = (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect("/")
    })
} 


