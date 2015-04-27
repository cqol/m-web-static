import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import item from "../models/item";
import utils from "../../shared/utils";

import tpl from "../../../templates/list/item";


export default Backbone.View.extend({
	el: "body",
	model: new item(),
	template: tpl,
	initialize() {
		var _this = this;
		_this.isScroll = false;

		console.log('init view app');
		_this.listenTo(_this.model, "sync", _this.render);
		_this.model.fetch();
		_this.scrollLoad();
	},

	render() {
		console.log('init list backbone');
		var _this = this;
		var data = this.model.toJSON().data,
			pageNum = data.page;
		console.log(data);


		if(!data.rows[0]) {
			return;
		}

		_this.renderData(data);

		pageNum += 1;
		console.log(pageNum);
		this.model.set("page", data.page + 1);
		_this.isScroll = false;
	},
	renderData(data) {
		var _this = this;

		for (var i = 0; i < data.rows.length; i++) {
			console.log(data.rows[i]);
			$(".column-wrap").find("ul:eq(" + i % 2 + ")").append(_this.template(data.rows[i]));
		}
		_this.preload();

	},
	scrollLoad: function() {

		var _this = this,
			scrollFlag = null;
		$(window).on("scroll", function() {

			scrollFlag = setTimeout(function() {
				if (utils.isBottom() && !_this.isScroll) {

					clearTimeout(scrollFlag);
					_this.isScroll = true;
					console.log(_this.model.url());
					_this.model.fetch();
				}
			}, 300);
		});
	},
	preload: function() {
		$(".load [data-origin]").each(function() {
			var that = this;
			utils.preload(this, function(w, h) {
				$(that).closest(".load").removeClass("load");
			});
		});
	}
});
