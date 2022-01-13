module.exports = function admin(req,res,next){
    if(req.user.isAdmin===true)
    {
        next();
    }
    else
        return res.status(403).send('You do not have permission to access this url');
};