const router = require("express").Router()

const cartController = require("../controllers/cart.controller")
const authGuard = require("./guard/auth.guard")
const bodyParser = require("body-parser")
const check = require("express-validator").check

router.get("/", authGuard.isAuth, cartController.getCart)
 
router.post("/", authGuard.isAuth, bodyParser.urlencoded({extended: true}),
check("amount").not().isEmpty().withMessage("set the amount").isInt({min: 1}).withMessage("amount must be greater than zero"),
cartController.postCart
)  

router.post("/delete", bodyParser.urlencoded({extended: true}), cartController.deleteItems)

router.post("/deleteAll", bodyParser.urlencoded({extended: true}),cartController.deleteAll )
module.exports = router