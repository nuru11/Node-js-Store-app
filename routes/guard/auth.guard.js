exports.isAuth = (req, res, next) => {
    if(req.session.userId) next()
    else res.redirect('/signup')
}

exports.notAuth = (req,res, next) => {
    if(!req.session.userId) next()
    else res.redirect("/")
}
