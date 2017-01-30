var express = require('express');
var path = require('path')
var router = express.Router();
var snsCtrl = require(path.join(__dirname,'..','controller','aws-sns'));
var smsCtrl = require(path.join(__dirname,'..','controller','smsSave'));
router.get('/', function(req, res, next) {
  	res.render('main/index.html');
});

router.post('/sendSms',function(req,res,next){
	var phone = req.body.phone;
	var message = req.body.message;
	snsCtrl.sendSms(phone,message,function(data){
		var payload = {
			receiver:phone,
			message:message,
			status:data.status,
			info:data.info
		};
		
		smsCtrl.saveSms(payload,function(){
			if(data.status=='success'){
				res.render('index', { status: 'success' ,info:data.info, phone:phone})
			}
			else{
				res.render('index', { status: 'failure' ,info:data.info, phone:phone})
			}
			return next();
		});
	});
});



module.exports = router;
