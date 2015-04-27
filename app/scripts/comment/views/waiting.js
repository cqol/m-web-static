import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";
import tpl_waiting from "../../../templates/home/waiting";

export default Backbone.Marionette.ItemView.extend({
  className: "t-waiting",
  template: tpl_waiting,
  ui: {
    analyzing: ".t-analyzing",
    tips: ".t-tips",
    error: ".t-error"
  },
  onRender() {
    setTimeout( ()=> {
      $(window).on("resize scroll", this.layout.bind(this)).trigger("resize");
    }, 0);
  },
  layout() {
    var width = this.$el.width(),
        height = this.$el.height();

    this.$el.css({
      position: "absolute",
      top: $(window).scrollTop() + ($(window).height() - height) / 4 + "px",
      left: $(window).scrollLeft() + ($(window).width() - width) / 2 + "px",
      "z-index": 100001
    });
  },
});
