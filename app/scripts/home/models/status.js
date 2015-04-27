import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";

export default Backbone.Model.extend({
  params: {},
  setParams(options) {
    _.extend(this.params, options);
  },
  fetchData(options) {
    this.setParams(options);
    this.fetch();
  },
  url() {
    return env.services.main + env.apis.zhuanti.getZanComment + "?callback=?&" + $.param(this.params);
  },
  parse(resp) {
    return resp.data;
  },
  addFav() {
    return $.ajax({
      url: env.services.main + env.apis.zhuanti.addFav + "&" + $.param({
        id: this.params.reportId,
        userId: this.params.userId
      }),
      dataType: "jsonp",
      jsonp: "callback"
    }).done(rs => {
      if (rs.data.isSuccess === 1) {
        this.set("hasFav", 2);
        this.set("favCount", this.get("favCount") + 1);
        this.trigger("fav:toggle");
      }
    });
  },
  deleteFav() {
    return $.ajax({
      url: env.services.main + env.apis.zhuanti.deleteFav + "&" + $.param({
        id: this.params.reportId,
        userId: this.params.userId
      }),
      dataType: "jsonp",
      jsonp: "callback"
    }).done(rs => {
      if (rs.data.isSuccess === 1) {
        this.set("hasFav", 1);
        this.set("favCount", this.get("favCount") - 1);
        this.trigger("fav:toggle");
      }
    });
  }
});
