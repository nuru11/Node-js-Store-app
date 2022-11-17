const router = require("express").Router()

const adminController = require("../controllers/admin.controller")
const adminGuard = require("./guard/admin.guard")
const userGuard = require("./guard/auth.guard")

const bodyParser = require("body-parser")
 
const multer = require("multer")
const check = require("express-validator").check

router.get("/add-product",adminGuard.isAdmin ,adminController.admin)

router.post("/add-product",adminGuard.isAdmin,multer({
    storage: multer.diskStorage({
     destination: (req, file, cb) => { 
         cb(null, "images")
     }, 
     filename: (req, file, cb) => {
         
         cb(null, Date.now() + '-' + file.originalname)
       
     }
    })
 }).single("image"),check("image").custom((value, {req}) => {
     if(req.file) return true
     else throw "image is required"
 }) ,adminController.addPost)
 
router.get("/orders", userGuard.isAuth, adminController.getOrdersbyUserId)

router.post("/orders", bodyParser.urlencoded({extended: true}), adminController.postOrders)

router.get("/manage-orders", adminGuard.isAdmin,adminController.manageOrders)

router.post("/payment", bodyParser.urlencoded({extended: true}), adminController.payment)

router.post("/deleteOrder", bodyParser.urlencoded({extended: true}), adminController.deleteOrder)

//router.post("deleteOrder", bodyParser.urlencoded({extended: true}), adminController.deleteManageOrder)

module.exports = router