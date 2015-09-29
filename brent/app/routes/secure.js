/**
 * Created by vietpn on 24/09/2015.
 */
module.exports = function(router, passport){

    router.use(function(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }

        res.redirect('/auth/login');
    });

    router.get('/profile',
        function(req, res){
            res.render('profile', {
                user: req.user
            })
        })

    router.get('/*', function(req, res){
        res.redirect('/profile')
    })
}
