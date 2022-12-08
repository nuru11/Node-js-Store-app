const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const mOrdersSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  productId: String,
  userId: String,
  timestamp: Number,
});
