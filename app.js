const express = require("express")
const app = express()

const path = require("path")

const flash = require("connect-flash")

const session = require("express-session")
const SessionStore = require("connect-mongodb-session")(session)

const homeRouter = require("./routes/home.route")
const productRouter = require("./routes/product.route")
const authRouter = require('./routes/auth.route')
const cartRouter = require("./routes/cart.route")
//const adminRouter = require("./routes/admin.route")

app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "images")))
app.use(flash())


const STORE = new SessionStore({
    uri: 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection: "session"
})


app.use(session({
    secret: "this is my secret to hash express session....",
    saveUninitialized: false,
    cookie:{
        maxAge: 1*60*60*100
    },
    store: STORE
}))

app.set("view engine", "ejs")
app.set("views", "views") 

app.use("/", homeRouter)
app.use("/product", productRouter)
app.use("/", authRouter)
app.use("/cart", cartRouter)
//app.use("/admin", adminRouter)

console.log("er")

app.use((req, res, next)=> {
    res.status(404)
    res.render("not-found", {
        isUser: req.session.isUser,
        isAdmin: req.session.isAdmin,
        pageTitle: "page not found"
    })
})

 
const port = process.env.PORT || 3000
app.listen(port, ()=>{
console.log("server listening on port 3000...")
})