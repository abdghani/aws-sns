var path = require('path');
var smsModel = require(path.join(__dirname,'..','model','smsSchema'));

exports.saveSms = function(obj,cb){
	smsModel.create(obj,function(err,data){
		cb();
	});
};