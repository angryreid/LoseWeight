var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Sports = new Schema({
	weight:String,
	// 创建时间
	createTime:{
		type:Date,
		default:Date.now
	},
	// 引入数据
	userId:{
		type:String,
		ref:'User'
	}
});

module.exports = mongoose.model("Sports",Sports);