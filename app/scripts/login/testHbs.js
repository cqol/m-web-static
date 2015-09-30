import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../shared/env";
import Handlebars from "hbsfy/runtime";
import compareHelpers from "handlebars-helpers/lib/helpers/helpers-comparisons";
import tpl_status from "../../templates/login/item";

let top = {
	init() {
		this.render();
	},
	render() {
		console.log('hbs init')
		//测试 模板！
		let data = {
			title:'  全国最大跨境 O2O 分销平台',
			url: '/images/shared/logo_01.png'
		};
		$('#logobox').append(tpl_status(data));
	}
}

export default top;
