var path = require('path');
var smsModel = require(path.join(__dirname,'..','model','smsSchema'));
var Encrypt = require(path.join(__dirname,'..','util','encryption'));
var check = require(path.join(__dirname,'..','util','checkValidObject'));
var userModel = require(path.join(__dirname,'..','model','userSchema'));

exports.validateUser = function(req,res,next){
	if(!check.isUndefinedOrNullOrEmptyOrNoLen(req.body.accessKey)){
        userModel.findOne({'accessKey':req.body.accessKey},{'username':1,_id:1},validateCallback);
        function validateCallback(err,data){
            if(err){
                return next(err);
            }
            if(!check.isNull(data)){
                req.body.username = data.username;
                next();
            }
            else{
                res.status(500);
                err = {
                        status:'failure',
                        reason:'invalid access key',
                        params:req.body,
                };
                res.send(err);
                return next(err);
            }
        }
    }
    else{
        res.status(403);
        res.send({status:"failure",reason:"accessKey key error"});
    }
};

exports.checkUserExistUser = function(req,res,next){
    if(!check.isUndefinedOrNullOrEmptyOrNoLen(req.body.username) && !check.isUndefinedOrNullOrEmptyOrNoLen(req.body.password)){
        userModel.findOne({'username':req.body.username},function(err,data){
            if(check.isNull(data)){
                next();
            }
            else{
                res.status(500);
                 err = {
                        status:'failure',
                        reason:'user exist',
                        params:req.body,
                };
                res.send(err);
                return next(err);
            }
        });   
    }
    else{
        res.status(500);
        var error = {
                status:'failure',
                reason:'invalid Argument',
                params:req.body,
        };
        res.send(error);
        return next(error);
    }
};

exports.createUser= function(req,res,next){
    var randomSalt = Encrypt.createSalt();
    var data = req.body;
    var user = {
        username:data.username,
        salt:randomSalt,
        active:true,
        hashPwd:Encrypt.hashPwd(randomSalt, data.password),
        accessKey:Encrypt.hashPwd(randomSalt, data.username)
    };
    userModel.create(user,createCallback);
    function createCallback(err,userData){
        if(err){
            res.status(500);
            res.send({
                status:'failure',
                reason:'db error',
                params:req.body,
            });
            return next(err);
        }
        else{
            res.status(200);
            res.send({
                status:'success',
                accessKey:userData.accessKey,
                params:req.body,
            });
            return next();
        }
    }
    
};

exports.verifyUser = function(req,res,next){
    if(!check.isUndefinedOrNullOrEmptyOrNoLen(req.body.username)
     && !check.isUndefinedOrNullOrEmptyOrNoLen(req.body.password)){
        userModel.findOne({'username':req.body.username},{_id:0,salt:1,hashPwd:1},userCallback);
        function userCallback(err,userData){
            if(!check.isNull(userData)){
                if(Encrypt.hashPwd(userData.salt,req.body.password) == userData.hashPwd){
                    next();
                }
                else{
                    res.status(500);
                     err= {
                            status:'failure',
                            reason:'invalid username or password',
                            params:req.body,
                        };
                    res.send(err);
                    return next(err);
                }
            }
            else{
                res.status(500);
                 err= {
                        status:'failure',
                        reason:'invalid username or password',
                        params:req.body,
                    };
                res.send(err);
                return next(err);
            }
        }
    }
    else{
        res.status(500);
        var err= {
                status:'failure',
                reason:'invalid username or password',
                params:req.body,
            };
        res.send(err);
        return next(err);
    }
};

exports.getKey = function(req,res,next){
    userModel.findOne({'username':req.body.username},{_id:0,'accessKey':1},function(err,data){
        if(err){
            res.status(500);
            err= {
                    status:'failure',
                    reason:'Invalid username or password',
                    params:req.body,
            };
            res.send(err);
            return next(err);
        }
        else{
            res.status(200);
            data= {
                    status:'success',
                    accessKey:data.accessKey,
                    params:req.body,
            };
            res.send(data);
            return next();
        }
    });
};