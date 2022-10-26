const mongoose = require("mongoose")

const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestapm: Number,
})

const CartItem = mongoose.model("cart", cartSchema)

exports.addNewItem = data => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            let item = new CartItem(data)
            return item.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getItemsByUser = userIId => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
         return CartItem.find({userId: userIId}, {}, {sort: {timestapm: 1}})
        }).then(items=>{
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
/*
exports.editItem = (id, newData) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL)
        .then(()=> {
            cartItem.updateOne({_id: id}, newData)
        }).then(items=>{
            mongoose.disconnect()
            resolve(items)
        }).catch(err=> {
            mongoose.disconnect()
            reject(err)
        })
    })
}
/*
exports.deleteItem = id => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=>{
          cartItem.findByIdAndDelete(id)
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}*/