exports.render=function(req,res){
   

    res.render('index',{
        title: 'Welcome',
        user: JSON.stringify(req.user)
    });
};