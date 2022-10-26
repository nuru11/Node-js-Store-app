const mongoose = require("mongoose")

//const DB_URL = 'mongodb://localhost:27017/online-shop'
const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number,
    description: String,
})

const Product = mongoose.model("product", productSchema)
/*
exports.getAllProducts = () => {



       /* product.find({}).then(products => {
            console.log("w")
            mongoose.disconnect()
        })*/


     /*   return new Promise((resolve, reject)=>{
           mongoose.connect(DB_URL).then(()=>{
           return product.find({}).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch((err)=>{
                reject(err)
            })
           })
        })
}*/
/*
return new Promise((resolve, reject) => {

     mongoose.connect(DB_URL).then(() => {

    return Product.find({})
    
    }).then(products => {
    console.log("w")
    mongoose.disconnect()
    
    resolve(products) 
}).catch(err=> {
    mongoose.disconnect()
    reject(err)})
    
    })
    
    }
*/

exports.getProductByIdd = (id) => {
    return new promise((resolve, reject)=> {
        mongoose.connect(DB_URL)
        .then(()=> {
            return Product.findById(id)
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
}
/*
exports.getFirstProduct = () => {
    return new promise((resolve, reject)=> {
        mongoose.connect(DB_URL)
        .then(()=> {
            return Product.findOne({})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
}
*/