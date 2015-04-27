import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";
import Shop from "../models/shop";
import WaitingView from "./waiting";

export default Backbone.Marionette.LayoutView.extend({
  el: "body",
  template: false,
  ui: {
    form: "form",
    search: "form input",
    add: ".t-shop:not(.t-active) .t-shop-add a",
    overlay: ".t-overlay",
    go: ".t-tips a"
  },
  regions: {
    waiting: ".t-waiting-wrap"
  },
  events: {
    "submit @ui.form": "addNewShop",
    "click @ui.add": "addRecShop",
    "click @ui.go": "hideWaiting"
  },
  model: new Shop(),
  addNewShop(e) {
    if (this.ui.search.val().match(/^http/) !== null) {
      this.addShop(this.ui.form.serialize());
    }
    return false;
  },
  addRecShop(e) {
    this.addShop("url=" + $(e.target).find(".t-shop-name a").attr("href"));
    return false;
  },
  addShop(data) {
    this.showWaiting();
    this.model.addShop(data)
      .done(rs => {
        if (rs.errorCode) {
          this.showError(rs.errorString);
          setTimeout(() => this.hideDialog(), 1000);
        } else {
          if (rs.isNew) {
            this.waitingView.ui.analyzing.hide();
            this.waitingView.ui.tips.show()
              .find("a").attr("href", rs.url);
          } else {
            window.location.href = rs.url;
          }
        }
      });
  },
  showWaiting() {
    this.waitingView = new WaitingView();
    this.ui.overlay.fadeIn("fast");
    this.getRegion("waiting").show(this.waitingView);
  },
  showError(msg) {
    this.waitingView.ui.analyzing.hide();
    this.waitingView.ui.error.show()
      .find(".t-msg").text(msg);
  },
  hideDialog() {
    this.ui.overlay.hide();
    this.getRegion("waiting").empty();
  }
});
