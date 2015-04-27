import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";
import Status from "../models/status";
import Handlebars from "hbsfy/runtime";
import compareHelpers from "handlebars-helpers/lib/helpers/helpers-comparisons";
import tpl_status from "../../../templates/home/status";

compareHelpers.register(Handlebars);

export default Backbone.View.extend({
  el: "body",
  template: tpl_status,
  events: {
    "click .t-zan": "clickZan",
    "click .t-comment": "clickComment"
  },
  model: new Status(),
  webviewRoot: window.ttsExtentionObj ? window.ttsExtentionObj : window.visitJSObj,
  render() {
    // mock
    if (env.mock) {
      this.webviewRoot = {
        isLogin() {
          return JSON.stringify({userId: "2222"});
        },
        getUserInfo: (type) => {
          window.setUserInfo({userId: "9999"}, type);
        }
      };
    }

    // render user status only in webview
    if (this.webviewRoot) {
      // api for webview
      window.setUserInfo = this.setUserInfo.bind(this);

      let params = {
        reportId: this.$el.data("reportid")
      };
      let userinfo = this.webviewRoot.isLogin();
      if (userinfo) {
        params.userId = JSON.parse(userinfo).userId;
      }
      this.listenTo(this.model, "sync", this.renderStatus);
      this.listenTo(this.model, "fav:toggle", this.renderStatus);
      this.model.fetchData(params);
    }
  },
  renderStatus() {
    let data = this.model.toJSON();
    this.$(".t-status").empty().append(this.template(data));
  },
  clickZan(e) {
    this.webviewRoot.getUserInfo(1);
    return false;
  },
  clickComment() {
    this.webviewRoot.getUserInfo(2);
    return false;
  },
  setUserInfo(user, type) {
    if (type === 1) {
      this.toggleZan(user);
    } else {
      this.navToComment();
    }
  },
  toggleZan(user) {
    this.model.setParams({
      userId: user.userId
    });
    if (this.$(".t-zan").data("zan") === 1) {
      this.model.addFav();
    } else {
      this.model.deleteFav();
    }
  },
  navToComment() {
    window.location.href = env.services.main + env.apis.zhuanti.url_comment;
  }
});
