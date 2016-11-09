var express = require('express');
var path = require('path')
var router = express.Router();
var snsCtrl = require(path.join(__dirname,'..','controller','aws-sns'))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendSms',function(req,res,next){
	snsCtrl.sendSms(req.body.phone,req.body.message,function(data){
		if(data.status=='success'){
			res.render('index', { status: 'Ok' })
		}
		else{
			res.render('index', { status: 'failed' })
		}
		return next();
	})

})
module.exports = router;
