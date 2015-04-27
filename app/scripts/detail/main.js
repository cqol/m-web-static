import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import utils from "../shared/utils";
import Swipe from "../shared/swipe";


export default Backbone.View.extend({
	el: "body",
	initialize() {
		console.log('init detail');
		this.switchs();
		this.btnFix = $(".btn-fix");
		this.preload($(".summary-con"));
	},
	preload: function(obj) {
		if (!obj || !obj.find(".load")[0]) {
			return;
		}
		obj.find(".load [data-origin]").each(function() {
			var that = this;
			utils.preload(this, function(w, h) {
				$(that).closest(".load").removeClass("load");
			});
		});
	},

	switchs() {
		var tabs = $("#s-header a");
		var _this = this;

		// pure JS
		var elem = document.getElementById('mySwipe');
		var mySwipe = Swipe(elem, {
			continuous: false,
			disableScroll: false,
			stopPropagation: false,
			callback: function (index, element) {
				_this.preload($(element));
				if (index == 0) {
					_this.btnFix.hide();
				} else {
					_this.btnFix.show();
				}
			},
			transitionEnd: function (index, element) {
				window.scrollTo(0, 0);
				tabs.removeClass("current");
				tabs.eq(index).addClass("current");
			}
		});

		tabs.on("click", function () {
			window.scrollTo(0, 0);

			mySwipe.slide($(this).index())
			tabs.removeClass("current");
			$(this).addClass("current");

			if ($(this).index() == 0) {
				_this.btnFix.hide();
			} else {
				_this.btnFix.show();
			}
		});
	}
});

