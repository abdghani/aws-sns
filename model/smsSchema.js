var mongoose = require('mongoose');

var smsSchema = new mongoose.Schema({
	sender:{type:String,required:true},
	receiver:{type:String, required:true},
	message:{type:String, required:true},
	status:{type:String, required:true},
	info:{type:String,required:true}
});

module.exports = mongoose.model("sms",smsSchema);