const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('user', userSchema);

exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject('the email is already exist');
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username: username,
          password: hashedPassword,
          email: email,
        });

        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject();
      });
  });
};

exports.login = (password, email) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) return reject('no user with such email');
        else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject('password is incorrect');
            } else {
              mongoose.disconnect();
              resolve({
                id: user._id,
                isAdmin: user.isAdmin,
                email: user.email,
                name: user.username,
              });
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
