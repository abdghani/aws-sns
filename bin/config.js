
var paramsStaging ={
    accessKey: "###############",
    accessSecret: "############################",
    region: "ap-southeast-1",
    defaultCountryCode: "+91",
    defaultSMSType:"Transactional",
    mongoUrl :"mongodb://abdghani:123456789@ds145208.mlab.com:45208/smsanyapp"
};

var paramsLocal = {
    accessKey: "###############",
    accessSecret: "##########################",
    region: "ap-southeast-1",
    defaultCountryCode: "+91",
    defaultSMSType:"Transactional",
    mongoUrl :"mongodb://localhost/smsanyapp"
};

module.exports = paramsStaging;