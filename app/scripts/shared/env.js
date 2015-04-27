import _ from "lodash";

let env = {};
let mockHost = "http://" + window.location.hostname + ":8000";
let ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

env.services = {
  main: "http://m.chaoji99.com"
};

env.apis = {
  zhuanti: {
    getZanComment: "/getzanstuts",
    addFav: "/addFav?type=2",
    deleteFav: "/deleteFav?type=2",
    url_comment: "/comment"
  },
  comment: {
    getComment: "/findCommentByPid.do",
    addComment: "/addcomment.do"
  }
};

if ((["localhost", "127.0.0.1", "localhost.com", "0.0.0.0"].indexOf(window.location.hostname) !== -1 ||
  window.location.hostname.match(ValidIpAddressRegex)) ) {
  // mock data
  if (document.location.search.indexOf("mock") !== -1) {
    _.each(env.services, (value, key) => {
      env.services[key] = mockHost;
    });
    env.mock = true;
  }
  // debug data
  if (document.location.search.indexOf("debug") !== -1) {
    _.extend(env.services, {
      main: "http://172.16.30.31:9999"
    });
  }
}

export default env;
