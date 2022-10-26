const mongoose = require("mongoose")

const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'
//const jsonProducts = require("../books.json")

const SchemaProducts = mongoose.Schema({
    name: String, 
    price: Number,
    description: String,
    image: String,
    category: String,

})

const Product = mongoose.model("product", SchemaProducts)

exports.getAllProduct = () =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            Product.find({}).then(products=>{
                mongoose.disconnect()
                resolve(products) 
            }).catch(err=>{
                mongoose.disconnect()
                reject("model/home.model.js getAllProduct  " + err)
                
            })
        })
    })
}

exports.getProductByIdd = id => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL)
        .then(()=> {
            return Product.findById(id)
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
            console.log(err)
        })
    })
}