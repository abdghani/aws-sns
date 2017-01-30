var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username:{type:String, required:true},
	salt:{type:String, required:true},
    active: { type: Boolean, required: true },
	hashPwd:{type:String, required:true},
	accessKey:{type:String,required:true}
});

module.exports = mongoose.model("user",userSchema);