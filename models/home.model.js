const mongoose = require("mongoose")

const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'

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
            Product.find({}).limit(8).then(products=>{
                mongoose.disconnect()
                resolve(products) 
            }).catch(err=>{
                mongoose.disconnect()
                reject(err)
                
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

exports.getProductsByCategory = (category) => {
   return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL).then(() => {
        return Product.find({category: category})
    }).then((item)=>{
       mongoose.disconnect()
       resolve(item)
       
    }).catch(err=>{
        mongoose.disconnect()
        reject(err)
    })
   })
}


exports.addProduct = (data) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=> {
           let item = new Product(data)
           return item.save()
        }).then(()=> {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        }) 
    })
}