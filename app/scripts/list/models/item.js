import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";

export default Backbone.Model.extend({
	initialize: function(){
		console.log('init item model');
		this.bind("change:page",function(){
			var name = this.get("page");
			console.log("next page is:" + name);
		});
	},
	defaults: {
		pageSize: 4,//默认一页显示4个
		page: 1
	},
	url() {
		return "http://cmsproxy.taotaosou.com/getGrouponProductList.do?callback=?" +
		"&cType=2&pageSize=" + this.get("pageSize") +
		"&categoryId=-1&page=" + this.get("page");
	}
});