var fs = require("fs"),
    path = require("path");

var loadJSON = function (name) {
  var fp = path.join(__dirname, "../fixtures", name + ".json");
  if(fs.existsSync(fp)) {
    return JSON.parse(fs.readFileSync(fp, "utf8"));
  }
  return {};
};

exports.mock = function (app) {
  app.get("/getzanstuts", function (req, res, next) {
    var data = loadJSON("home/getzanstuts");
    res.jsonp(data);
  });
  app.get("/addFav", function (req, res, next) {
    var data = loadJSON("home/addFav");
    res.jsonp(data);
  });
  app.get("/deleteFav", function (req, res, next) {
    var data = loadJSON("home/deleteFav");
    res.jsonp(data);
  });
};
