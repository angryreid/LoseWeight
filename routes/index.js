// 调用
var moment = require("moment");
var control = require("./control");

module.exports = function(app) {
    // 在ejs页面使用时间
    app.locals.dateFormat = function(date) {
        return moment(date).format("YYYY年MM月DD日 HH:mm:ss");
    }

    // get请求
    app.get("/cool/start", function(req, res) {
        res.render("start", {
            title: "登陆"
        });
    });

    app.get("/cool/reg", function(req, res) {
        res.render("reg", {
            title: "Login UP"
        });
    });

    app.get("/cool/index", function(req, res) {
        if (req.session.user) {
            var userId = req.session.user._id;
            control.getData(userId).then(function(data) {
                res.render("index", {
                    title: "Input Data",
                    user: req.session.user,
                    data
                });
            });
        } else {
            res.redirect("/cool/start");
        }
    });

    app.get("/cool/data", function(req, res) {
        if (req.session.user) {
            res.render("data", {
                title: "Show Data",
                user: req.session.user
            });

        } else {
            res.redirect("/cool/start");
        }
    });

    app.get("*", function(rea, res) {
        res.render("404", {
            title: "404"
        });
    });

    app.post("/login", control.login);
    app.post("/reg", control.addUser);
    app.post("/addSports", control.addSports);
    app.post("/loadWeight",control.loadWeight);
}