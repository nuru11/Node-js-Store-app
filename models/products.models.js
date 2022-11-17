const mongoose = require("mongoose")

const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number,
    description: String,
})

const Product = mongoose.model("product", productSchema)

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
