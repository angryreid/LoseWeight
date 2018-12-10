var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
	name:String,//姓名
	password:String,//密码
	createTime:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model('User',User);