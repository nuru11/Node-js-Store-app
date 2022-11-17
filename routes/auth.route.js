const router = require("express").Router()
const bodyParser = require("body-parser")

const authGuard = require("./guard/auth.guard")

const check = require("express-validator").check
 
const authController = require("../controllers/auth.controller")


router.get("/signup",authGuard.notAuth ,authController.getSignup)

router.post("/signup",authGuard.notAuth, bodyParser.urlencoded({extended: true}),
check("username").not().isEmpty().withMessage("username is required"),
check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("enter valid email"),
check("password").isLength({min: 6}).withMessage("password must be greater than 6 character"),
check("confirmPassword").custom((value, {req})=>{
    if(value === req.body.password) return true
    else throw "password not match"
})
,authController.postSignup)


router.get("/login",authGuard.notAuth, authController.getLogin)

router.post("/login",authGuard.notAuth, bodyParser.urlencoded({extended: true}), 
check("email").not().isEmpty().withMessage('email is required').isEmail().withMessage("invalid email")
,authController.postLogin)

router.all('/logout',authGuard.isAuth ,authController.logout)

module.exports = router