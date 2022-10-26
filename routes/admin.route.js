const router = require("express").Router()

const adminController = require("../controllers/admin.route")
const adminGuard = require("./guard/admin.guard")

const multer = require("multer")
const check = require("express-validator").check

router.get('/add', adminGuard.isAdmin, adminController.admin)

router.post("/add", adminGuard.isAdmin,multer({
   storage: multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "images")
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '-' + file.originalname)
    }
   })
}).single("image"),check("image").custom((value, {req}) => {
    if(req.file) return true
    else throw "image is required"
}) ,adminController.postAdd)

module.exports = router