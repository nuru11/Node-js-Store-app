const mongoose = require("mongoose")

const DB_URL = 'mongodb+srv://nuru11:0966202667@cluster0.f92keez.mongodb.net/online-shop?retryWrites=true&w=majority'

const ordersSchema = mongoose.Schema({
    name: String, 
    price: Number,
    amount: Number,
    productId: String,
    userId: String,
    timestamp: String,
    email: String,
    username: String,
    address: String,
    time: String
})

const Orders = mongoose.model("order", ordersSchema)
/*
exports.addOrders = (data) => {
     return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=>{
            let addItem = new Orders(data)
            return addItem.save() 
        }).then(()=>{ 
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
     })
}
*/

exports.addOrders = (data) => {
    return new Promise((resolve, reject)=> {
       mongoose.connect(DB_URL).then(()=>{
           let addItem = new Orders(data)
           return addItem
       }).then((addItem)=>{ 
           mongoose.disconnect()
           if(data.address){
            resolve()
            return addItem.save()
           }else{
            mongoose.disconnect()
            reject("add your address first")
           }
           
       }).catch(err=>{
           mongoose.disconnect()
           reject(err)
       })
    })
}

exports.getOrdersbyUserId = (email) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=>{
             return Orders.find({email: email}, {}, {sort: {timestamp: 1}})
        }).then(item=>{
            mongoose.disconnect()
            resolve(item)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOrdersForAdmin = () => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=>{
            return Orders.find()
        }).then(item=>{
            mongoose.disconnect()
            resolve(item)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteOrders = (id) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Orders.findByIdAndDelete(id)
        }).then(item=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}