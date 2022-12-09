const homeModel = require('../models/home.model');

exports.getHome = (req, res, next) => {
  console.log(req.flash('postCartValidationError'));

  let category = req.query.category;
  let validCategory = ['clothes', 'technology'];
  let productsPromise;
  if (category && validCategory.includes(category))
    productsPromise = homeModel.getProductsByCategory(category);
  else productsPromise = homeModel.getAllProduct();
  productsPromise.then((products) => {
    res.render('index', {
      products: products,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      postCartValidationError: req.flash('postCartValidationError')[0],
      pageTitle: 'Home',
    });
  });
};
