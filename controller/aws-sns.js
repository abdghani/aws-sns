var AWS = require('aws-sdk');
var path = require('path');
//var config = require(path.join(__dirname, '..', 'apiConfig'))

var sns = new AWS.SNS({
	accessKeyId: '----------------------------------',
    secretAccessKey: '------------------------------------',
	region:'ap-southeast-1'
});

exports.sendSms = function(phoneNumber,message,cb){
    var AttributeParams = {
        attributes: { 
            DefaultSMSType: 'Transactional'
        }
    };
    sns.setSMSAttributes(AttributeParams, function(err, data) {
    if (err) 
        console.log(err, err.stack); // an error occurred
    else    {
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
            }
            sns.publish(params, function(err, data) {
            if (err)
                 cb({
                     status:'failed',
                     error:err
                 }); // an error occurred
            else {
                cb({
                     status:'success',
                     data:data
                 });
            }           // successful response
            });
    }           // successful response
    });
}

