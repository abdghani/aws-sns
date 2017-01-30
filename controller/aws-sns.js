var AWS = require('aws-sdk');
var path = require('path');
var config = require(path.join(__dirname,'..','bin','config'));
var smsCtrl = require(path.join(__dirname,'smsSave'));
var countryCode  = config.defaultCountryCode;

var sns = new AWS.SNS({
	accessKeyId: config.accessKey,
    secretAccessKey: config.accessSecret,
	region:config.region
});

exports.sendSms = function(req,res,next){
    var AttributeParams = {attributes: { DefaultSMSType: config.defaultSMSType }};
    phoneNumber = req.body.phoneNumber;
    message = req.body.message;
    var savePayload = {
                receiver:phoneNumber,
                message:message,
                sender:req.body.username
    };
    if(phoneNumber.toString().length < 10){
        return next({
            status:'failed',
            info:'Invalid Number'
        });
    }
    else if(phoneNumber.toString().length == 10){
        phoneNumber = countryCode+phoneNumber;
    }
    sns.setSMSAttributes(AttributeParams, function(err, data) {
        if (err) {
            savePayload.status = 'failed';
            savePayload.info = err.message;
             smsCtrl.saveSms(savePayload,function(){
                 return next({status:'failed',info:err.message}); 
             });
        }
        else{
            var params = {
                MessageStructure : 'String',
                PhoneNumber : phoneNumber,
                MessageAttributes: {
                    someKey: {
                    DataType: 'String', 
                    StringValue: 'String'
                    }
                },
                Message : message
            };
            
            sns.publish(params, function(err, data) {
                    if (err){
                            savePayload.status = 'failed';
                            savePayload.info = err.message;
                            smsCtrl.saveSms(savePayload,function(){
                                return next({status:'failed',info:err.message}); 
                            }); 
                    }
                    else {
                            savePayload.status = 'success';
                            savePayload.info = data.MessageId;
                            smsCtrl.saveSms(savePayload,function(){
                              res.send({status:'success',info:data.MessageId});
                              return next(); 
                            });
                    } 
            });
        }           
    });
};

