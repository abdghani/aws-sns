var express = require('express');
var path = require('path');
var router = express.Router();
var snsCtrl = require(path.join(__dirname,'..','controller','aws-sns'));
var smsCtrl = require(path.join(__dirname,'..','controller','smsSave'));
var user = require(path.join(__dirname,'..','controller','userValidation'));

router.post('/sendsms',
    user.validateUser,
    snsCtrl.sendSms
);



module.exports = router;
