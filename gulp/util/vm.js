var handlebars = require("handlebars"),
	fs = require("fs"),
	path = require("path"),
	_ = require("underscore"),
	//TAG = require("./helpers/lib/tag"),
	glob = require("glob");


module.exports = function(options) {
	// console.log(options);
	if(!options.source) {
		throw new Error("need to assign a folder to hbs source");
	}

	options = options || {};

	var globalData = options.globalData || {},
		parseData = function(name) {
			var fp = path.join(options.fixtures, name + ".json"),
				data = {};
			if(fs.existsSync(fp)) {
				data = JSON.parse(fs.readFileSync(fp,"utf8")) || {};
			}
			return _.extend(Object.create(globalData), data);
		},
		parseName = function(pathname) {
			var parts = pathname.split("/"),//pathname is part of url
				lastPart = parts.pop(),
				names = lastPart.split("."),
				name;
			if(lastPart) {
				if(names.length > 1) {
					names.pop();
				}
				name = names.join(".");
			} else {
				name = "index";
			}
			return path.join(parts.join(path.sep), name);
		},
		extname = options.extname || ".hbs";

	//global data
	if(typeof globalData === "string") {//treat it as a url string
		globalData = require(path.resolve(globalData));
	}

	//helpers
	if(options.helpers) {
		glob.sync(options.helpers).forEach(function(file) {
			var basename = path.basename(file, ".js"),
				fp = "./" + file;
			// console.log(basename, fs.existsSync(fp), require(path.resolve(fp)));
			handlebars.registerHelper(basename, require(path.resolve(fp)));
		});
	}

	return function(name, callback) {
		var fp = path.join(options.source, name + extname),
			template, data, layout;
		console.log(fp, fs.existsSync(fp));
		if(fs.existsSync(fp)) {
			//refresh tag cache
			//TAG.refresh();
			//partials should be reloade everytime
			glob.sync(options.source + "/shared/**/*" + extname).forEach(function(file) {
				if(file.indexOf("./") === 0) {
					file = file.substr(2);
				}
				// console.log(file);
				var basename = parseName(file.slice(path.join(options.source, "shared").length + 1));
				// console.log(file, basename, fs.existsSync(file));
				handlebars.registerPartial(basename, fs.readFileSync(file, "utf8"));
			});
			//load main template
			template = handlebars.compile(fs.readFileSync(fp, "utf8"));

			data = parseData(name);

			//try to parse layout
			layout = path.join(options.source, "layouts", data.layout + extname);
			if(data.layout && fs.existsSync(layout)) {//render layout
				data.body = template(data);
				template = handlebars.compile(fs.readFileSync(layout, "utf8"));
			}
			return callback(null, template(data));
		}
		callback(null, false);
	};
};
