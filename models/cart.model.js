const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestapm: Number,
});

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = (name, price, productId, userId, amount, timestapm) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.findOne({ productId: productId });
      })
      .then((item) => {
        mongoose.disconnect();
        if (item && item.userId == userId) {
          item.amount = item.amount + +amount;
          return CartItem.updateOne(
            { name: name },
            { $set: { amount: item.amount } }
          );
        } else {
          let item = new CartItem({
            name: name,
            price: price,
            amount: amount,
            userId: userId,
            productId: productId,
          });
          item.save();
        }
        resolve();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItemsByUser = (userIId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.find(
          { userId: userIId },
          {},
          { sort: { timestapm: 1 } }
        );
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteItems = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.findByIdAndDelete(id);
      })
      .then((user) => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.delteAll = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.deleteMany({ userId: userId });
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
