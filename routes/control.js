var User = require("../schemas/user");
var Sports = require("../schemas/sports");
var moment = require("moment");

var login = function(req, res) {
    var userName = req.body.user;
    var psw = req.body.psw;

    var findUser = {
        name: userName,
        password: psw
    }

    User.findOne(findUser, function(err, _user) {
        if (_user == null) {
            res.json({ result: 0 });
        } else {
            // 
            req.session.user = _user;
            res.json({ result: 1, user: _user });
        }
    });
}

var addUser = function(req, res) {
    var userName = req.body.user;
    var psw = req.body.psw;
    var regUser = {
        name: userName,
        password: psw
    }

    User.findOne({ name: userName }, function(err, user) {
        if (user == null) {
            var newUser = new User(regUser);
            newUser.save(function(err, user) {
                res.json({ result: 1 });
            });
        } else {
            res.json({ result: 0 });
        }
    });

}

var addSports = function(req, res) {
    var weight = req.body.weight;
    var userId = req.body.userId;
    var date = new Date();
    var newSport = {
        weight: weight,
        userId: userId
    }
    var beforeToday = moment(date).format("YYYY-MM-DD 00:00:00").toString();
    // console.log(beforeToday);
    var afterToday = moment(date).format("YYYY-MM-DD 23:59:59").toString();
    // console.log(afterToday);

    Sports.find({"userId":userId},{
            "$and": [{
                "createTime": {
                    "$gte": beforeToday
                }
            }, {
                "createTime": {
                    "$lt": afterToday
                }
            }]
        },function(err,user){
        	if (user.length == 0) {
        		var _newSport = new Sports(newSport);
        		_newSport.save(function(err,user){
        			res.json({result:1});
        		});
        	}else{
        		res.json({result:0});
        	}
        });
}

var getData = function(userId){
    return new Promise(function(resolve,reject){
        var data = {};
        Sports.find({"userId":userId}).sort({"createTime":1}).exec(function (err,weights){
            resolve(weights);
        });
    });
}

var loadWeight = function(req,res){
    var userId = req.body.userId;
    Sports.find({"userId":userId}).sort({"createTime":1}).exec(function(err,weights){
        if(weights){
            res.json({result:1,data:weights});
        }else{
            res.json({result:0});
        }
    });
}




module.exports = {
    login,
    addUser,
    addSports,
    getData,
    loadWeight
}