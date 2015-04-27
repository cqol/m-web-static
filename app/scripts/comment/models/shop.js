import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import env from "../../shared/env";

export default Backbone.Model.extend({
  addShop(data) {
    return $.ajax({
      url: env.services.main + env.apis.addShop,
      type: "POST",
      data: data
    });
  }
});